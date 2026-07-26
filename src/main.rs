use std::{net::SocketAddr, path::PathBuf};

use axum::{
    handler::HandlerWithoutStateExt,
    http::{header, HeaderValue, StatusCode},
    response::Html,
    Router,
};
use tower_http::{services::ServeDir, set_header::SetResponseHeaderLayer};

fn dist_dir() -> PathBuf {
    if let Some(dir) = std::env::var_os("PORTFOLIO_DIST") {
        return PathBuf::from(dir);
    }

    let candidates = [
        PathBuf::from("./frontend/dist"),
        PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("frontend/dist"),
    ];

    candidates
        .iter()
        .find(|path| path.is_dir())
        .cloned()
        .unwrap_or_else(|| candidates[0].clone())
}

#[tokio::main]
async fn main() {
    let dist = dist_dir();
    let index_path = dist.join("index.html");

    let not_found = move || {
        let index_path = index_path.clone();
        async move {
            let html = tokio::fs::read_to_string(&index_path)
                .await
                .unwrap_or_else(|_| "Not Found".to_string());
            (StatusCode::NOT_FOUND, Html(html))
        }
    };

    let assets = Router::new()
        .fallback_service(
            ServeDir::new(dist.join("assets"))
                .precompressed_br()
                .precompressed_gzip(),
        )
        .layer(SetResponseHeaderLayer::overriding(
            header::CACHE_CONTROL,
            HeaderValue::from_static("public, max-age=31536000, immutable"),
        ));

    let root = Router::new()
        .fallback_service(
            ServeDir::new(&dist)
                .precompressed_br()
                .precompressed_gzip()
                .not_found_service(not_found.into_service()),
        )
        .layer(SetResponseHeaderLayer::overriding(
            header::CACHE_CONTROL,
            HeaderValue::from_static("no-cache"),
        ));

    let app = Router::new()
        .nest("/assets", assets)
        .fallback_service(root);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Listening on http://{}", addr);
    println!("Serving {}", dist.display());

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind TCP listener");
    axum::serve(listener, app)
        .await
        .expect("server exited with error");
}

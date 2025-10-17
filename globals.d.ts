declare module "bun" {
    interface Env {
        PORT: number;
        NIGHTSCOUT_URL: string;
    }
}

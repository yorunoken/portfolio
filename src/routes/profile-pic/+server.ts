export async function GET() {
	const res = await fetch('https://api.lanyard.rest/v1/users/372343076578131968');
	const { data } = await res.json();

	const userId = data.discord_user.id;
	const avatarHash = data.discord_user.avatar;

	const isAnimated = avatarHash.startsWith('a_');
	const extension = isAnimated ? 'gif' : 'png';
	const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=1024`;

	const imageRes = await fetch(avatarUrl);
	const imageBlob = await imageRes.blob();

	return new Response(imageBlob, {
		headers: {
			'Content-Type': imageRes.headers.get('Content-Type') || `image/${extension}`,
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

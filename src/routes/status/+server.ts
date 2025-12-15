import { json } from '@sveltejs/kit';

export async function GET() {
	const res = await fetch('https://api.lanyard.rest/v1/users/372343076578131968');
	const data = await res.json();

	const indicator = data.data.discord_status;
	const status = data.data.activities?.find(
		(x: { name: string }) => x.name === 'Custom Status'
	)?.state;

	return json({
		status,
		indicator
	});
}

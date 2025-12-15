<script lang="ts">
	let canvas: HTMLCanvasElement;

	$effect(() => {
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = window.innerWidth;
		let height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		};

		window.addEventListener("resize", handleResize);

		const drawRaindrop = (x: number, y: number, length: number, opacity: number) => {
			ctx.save();
			ctx.globalAlpha = opacity;
			ctx.strokeStyle = "#a0c4ff";
			ctx.lineWidth = 1.5;
			ctx.lineCap = "round";

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x, y + length);
			ctx.stroke();

			ctx.restore();
		};

		const raindrops = Array.from({ length: 150 }).map(() => ({
			x: Math.random() * width,
			y: Math.random() * height,
			length: Math.random() * 15 + 10,
			speed: Math.random() * 8 + 6,
			opacity: Math.random() * 0.3 + 0.5,
			wind: Math.random() * 1 - 0.5
		}));

		let animationFrameId: number;

		const animate = () => {
			ctx.clearRect(0, 0, width, height);

			for (const drop of raindrops) {
				drop.x += drop.wind;
				drop.y += drop.speed;

				if (drop.y > height) {
					drop.y = -drop.length;
					drop.x = Math.random() * width;
				}

				if (drop.x > width) {
					drop.x = 0;
				} else if (drop.x < 0) {
					drop.x = width;
				}

				drawRaindrop(drop.x, drop.y, drop.length, drop.opacity);
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed top-0 left-0 z-0 h-full w-full blur-[1px]"
></canvas>

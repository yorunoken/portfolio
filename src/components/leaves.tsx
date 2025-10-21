import { useEffect, useRef } from "react";

export default function Leaves() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
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

        const drawLeaf = (x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.quadraticCurveTo(size * 0.6, -size * 0.3, size * 0.4, size * 0.2);
            ctx.quadraticCurveTo(size * 0.2, size * 0.5, 0, size);
            ctx.quadraticCurveTo(-size * 0.2, size * 0.5, -size * 0.4, size * 0.2);
            ctx.quadraticCurveTo(-size * 0.6, -size * 0.3, 0, -size);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, -size * 0.8);
            ctx.lineTo(0, size * 0.8);
            ctx.strokeStyle = `rgba(139, 69, 19, ${opacity * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        };

        const autumnColors = ["#8B4513", "#D2691E", "#CD853F", "#DEB887", "#B8860B", "#DAA520", "#FF8C00", "#FF7F50", "#DC143C", "#8B0000"];

        const leaves = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 8 + 6,
            speed: Math.random() * 1.5 + 0.5,
            sway: Math.random() * 1.5 + 0.5,
            swayOffset: Math.random() * 1000,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.04,
            opacity: Math.random() * 0.4 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            color: autumnColors[Math.floor(Math.random() * autumnColors.length)]!,
        }));

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 16;
            ctx.clearRect(0, 0, width, height);

            for (const leaf of leaves) {
                leaf.x += Math.sin(time / 1000 + leaf.swayOffset) * leaf.sway + leaf.wind;
                leaf.y += leaf.speed;
                leaf.rotation += leaf.rotationSpeed;

                if (leaf.y > height + leaf.size * 2) {
                    leaf.y = -leaf.size * 2;
                    leaf.x = Math.random() * width;
                }

                if (leaf.x > width + leaf.size * 2) {
                    leaf.x = -leaf.size * 2;
                } else if (leaf.x < -leaf.size * 2) {
                    leaf.x = width + leaf.size * 2;
                }

                drawLeaf(leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.opacity, leaf.color);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 blur-[2px]" />;
}

import { useCanva } from "@/contexts/canva";

export function Preview() {
	const { canvasRef } = useCanva();

	return (
		<div className="relative w-full min-h-24 border-2 border-white bg-white">
			<canvas id="canvas" ref={canvasRef}></canvas>
		</div>
	);
}
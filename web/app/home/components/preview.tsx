import { useCanva } from "@/contexts/canva";

interface PreviewProps {
	predictionName: string
}

export function Preview({ predictionName }: PreviewProps) {
	const { canvasRef } = useCanva();

	return (
		<div className="relative w-full min-h-24 bg-white rounded-lg overflow-hidden flex flex-col items-center">
			<canvas id="canvas" ref={canvasRef}></canvas>
			<div className='w-full h-8 bg-[#2A2A2A] text-white text-lg font-semibold'>{predictionName}</div>
		</div>
	);
}
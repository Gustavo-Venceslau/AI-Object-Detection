import { useCanva } from "@/contexts/canva";

export function Preview() {
	const { canvasRef } = useCanva();

	// const addImage = () => {
	// 	if(canvas) {
	// 		const image = document.createElement('img') as HTMLImageElement;
	// 		Object.assign(image, {
	// 			src: 'profile.JPG',
	// 			alt: 'profile',
	// 			width: 200,
	// 			height: 200,
	// 		})
	// 		const fabricImage = new FabricImage(image, {
	// 			top: 0,
	// 			left: 0,
	// 		});
	// 		canvas.add(fabricImage);
	// 	}
	// }

	return (
		<div className="relative w-full min-h-24 border-2 border-white">
			<canvas id="canvas" ref={canvasRef}></canvas>
		</div>
	);
}
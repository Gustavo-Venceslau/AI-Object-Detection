import { useEffect, useRef, useState } from "react";
import { Canvas } from 'fabric';

export function Preview() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
  	const [canvas, setCanvas] = useState<Canvas | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const initCanvas = new Canvas(canvasRef.current, {
				width: 800,
				height: 200
			});

			initCanvas.backgroundColor = "#fff"
			initCanvas.renderAll();

			setCanvas(initCanvas);

			return () => {
				initCanvas.dispose();
			};
		}
	}, []);

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
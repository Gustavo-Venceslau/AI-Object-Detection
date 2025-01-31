"use client"

import { Canvas } from "fabric";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface CanvaContextType {
	canvas: Canvas | null;
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvaContext = createContext<CanvaContextType>({} as CanvaContextType);

export const CanvaProvider = ({ children }: { children: React.ReactNode }) => {
	const [canvas, setCanvas] = useState<Canvas | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const initCanvas = new Canvas(canvasRef.current, {
				width: 800,
				height: 200
			});

			initCanvas.renderAll();

			setCanvas(initCanvas);

			return () => {
				initCanvas.dispose();
			};
		}
	}, []);

	return (
		<CanvaContext.Provider value={{
			canvas,
			canvasRef
		}}>
			<>
				{children}
			</>
		</CanvaContext.Provider>
	)
}

export const useCanva = () => {
	const context = useContext(CanvaContext);

	return context;
};
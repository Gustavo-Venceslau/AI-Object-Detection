"use client"

import { SettingsBar } from './home/components/settingsBar';
import { ResultsTable } from './home/components/table';
import { Preview } from './home/components/preview';
import { useRef, useState } from 'react';
import { useCanva } from '@/contexts/canva'
import axios from 'axios';
import { Video } from './home/components/video';

type Box = {
	height: number, 
	left: number, 
	top: number, 
	width: number
}

export type Prediction = {
	box: Box,
	class_name: string,
	confidence: number
}

export default function Home() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const { canvas, canvasRef } = useCanva();
	const [name, setName] = useState("Predictions:");

	const extractFrames = (confidence: number, iou: number) => {
		if(videoRef.current && canvas) {
			const video = videoRef.current;

			video.onseeked = async () => {
				const offscreenCanvas = document.createElement('canvas');
				offscreenCanvas.width = 800;
    			offscreenCanvas.height = 450;

				if(canvasRef.current) {
					const ctx = offscreenCanvas.getContext('2d');

					if(ctx) {
						ctx.drawImage(video, 0, 0, video.width, video.height);

						const imageDataUrl = offscreenCanvas.toDataURL('image/jpeg')

						const response = await axios.post("http://localhost:5001/detect", {
							image_data_url: imageDataUrl,
							confidence,
							iou
						})

						if(response.status !== 200) { throw new Error("Erro ao gerar predições"); }

						const predictions: Prediction[] = response.data

						const contexto = canvasRef.current!.getContext('2d');

						predictions.map(prediction => {
							const { top, left, width, height } = prediction.box

							contexto!.clearRect(0, 0, canvas.width, canvas.height);

							const x = (canvas.width - width) / 2
							const y = (canvas.height - height) / 2

							setName(`class_name:${prediction.class_name} top:${top} left:${left} width:${width} height:${height} confidence:${prediction.confidence}`)

							contexto!.drawImage(
								video, 
								left, top, // pega a parte da imagem a ser mostrada
								video.width, video.height, // tamanho do recorte da imagem
								x, y, // posição da imagem no canvas
								400 , 400// tamanho final da imagem
							)
						})
					}

					if (video.currentTime < video.duration) {
						video.currentTime += 0.1;
					}
				}
			}

			video.play().then(() => {
				video.pause();
				video.currentTime = 0;
			});
		}
	}

	return (
		<div className="w-full h-screen text-center flex flex-col items-center">
			<div className='w-full h-10 bg-[#2A2A2A] mb-10 flex items-center justify-center'>
				<h1 className='text-white text-xl font-bold'>AI Object Detection</h1>
			</div>
			<div className='flex flex-col gap-4 shadow-lg'>
				<Preview predictionName={name}/>
				<div className='flex flex-flex gap-4'>
					<section className='w-full'>
						<Video 
							width={800}
							height={450}
							src="video.mp4"
							ref={videoRef}
							className='rounded-t-lg rounded-tr-lg overflow-hidden'
						/>
						<SettingsBar detectFunction={extractFrames}/>
					</section>
					<ResultsTable />
				</div>
			</div>
		</div>
	);
}

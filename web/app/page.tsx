"use client"

import Video from 'next-video';
import busVideo from '/videos/video.mp4';
import { SettingsBar } from './home/components/settingsBar';
import { ResultsTable } from './home/components/table';
import { Preview } from './home/components/preview';
import { useRef, useState } from 'react';
import { useCanva } from '@/contexts/canva'
import axios from 'axios';

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

				console.log(`w:${video.width}, h:${video.height}`)

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

							const x = (800 - width) / 2
							const y = (450 - height) / 2

							setName(`predições: ${prediction.class_name},${top},${left},${width},${height} /n confidence${prediction.confidence}`)

							contexto!.drawImage(
								video, 
								left, top, // pega a parte da imagem a ser mostrada
								video.width, video.height, // tamanho do recorte da imagem
								x, y, // posição da imagem no canvas
								width, height // tamanho final da imagem
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
			<h1 className='text-white text-4xl font-bold my-10'>
				Welcome to AI Object Detection
			</h1>
			<div className='flex flex-col gap-4 shadow-lg'>
				<Preview predictionName={name}/>
				<div className='flex flex-flex gap-4'>
					<section className='w-full'>
						<Video 
							src={busVideo} 
							width={800} 
							height={450} 
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

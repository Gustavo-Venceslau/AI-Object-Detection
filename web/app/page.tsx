"use client"

import { SettingsBar } from './home/components/settingsBar';
import { ResultsTable } from './home/components/table';
import { Preview } from './home/components/preview';
import { useRef, useState } from 'react';
import { useCanva } from '@/contexts/canva'
import axios from 'axios';
import { Video } from './home/components/video';
import { FabricImage } from 'fabric';

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

						predictions.map(prediction => {
							const { top, left, width, height } = prediction.box
							const cutCanvas = document.createElement('canvas');

							cutCanvas.width = width;
							cutCanvas.height = height;

							const cutCtx = cutCanvas.getContext('2d');

							if(cutCtx) {
								canvas.clear()
								cutCtx.clearRect(0, 0, width, height)

								console.log(cutCanvas.width, cutCanvas.height)

								const scaleX = video.videoWidth / canvas.width;
								const scaleY = video.videoHeight / canvas.height;

								const scaledLeft = left * scaleX;
								const scaledTop = top * scaleY;
								const scaledWidth = width * scaleX;
								const scaledHeight = height * scaleY;

								cutCtx.drawImage(
									video,
									scaledLeft, scaledTop,
									scaledWidth, scaledHeight,
									0, 0,
									width, height 
								)
	
								const cutImageURL = cutCanvas.toDataURL('image/jpeg')
	
								const image = document.createElement('img')

								Object.assign(image, {
									src: cutImageURL,
									alt: prediction.class_name,
									width,
									height
								})

								const x = (canvas.width - width) / 2
								const y = (canvas.height - height) / 2
	
								const fabricImage = new FabricImage(image, {
									top: y,
									left: x,
									width,
									height
								})
	
								setName(
									`class_name:${prediction.class_name} top:${top} left:${left} width:${width} height:${height} confidence:${prediction.confidence}`
								)
	
								canvas.add(fabricImage)
								canvas.requestRenderAll()
							}
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
		<div className="w-full h-screen text-center flex flex-col items-center" id="home">
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

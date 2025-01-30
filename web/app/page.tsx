"use client"

import Video from 'next-video';
import busVideo from '/videos/video.mp4';
import { SettingsBar } from './home/components/settingsBar';
import { ResultsTable } from './home/components/table';
import { Preview } from './home/components/preview';
import { useRef } from 'react';
import { useCanva } from '@/contexts/canva'
import axios from 'axios';

const style = {
	borderRadius: '12px',
	overflow: 'hidden'
}

export default function Home() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const { canvas, canvasRef } = useCanva();

	const extractFrames = () => {
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
							confidence: 0,
							iou: 0,
						})

						if(response.status !== 200) { throw new Error("Erro ao gerar predições"); }

						console.log(response.data);
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
	<div className="w-full h-screen text-center flex flex-col items-center gap-16 py-16">
		<h1 className='text-white text-4xl font-bold'>
			Welcome to AI Object Detection
		</h1>
		<div className='w-[800px] flex flex-col gap-4 shadow-lg'>
			<button type='button' className='text-white' onClick={extractFrames}>click</button>
			<Preview />
			<Video src={busVideo} width={800} height={450} style={style} ref={videoRef} />
			<h2 className='text-white text-2xl font-semibold'>Settings</h2>
			<SettingsBar />
			<ResultsTable />
		</div>
	</div>
	);
}

"use client"

import Video from 'next-video';
import busVideo from '/videos/video.mp4';

export default function Home() {
  return (
    <div className="bg-background w-full h-screen text-center flex flex-col items-center gap-16 pt-12">
		<h1 className='text-white text-4xl font-semibold'>
			Welcome to AI Object Detection
		</h1>
		<div className='w-[500px] h-[280px]'>
			<Video src={busVideo} width={500} height={280} />
		</div>
    </div>
  );
}

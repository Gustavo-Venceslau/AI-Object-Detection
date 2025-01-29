"use client"

import Video from 'next-video';
import busVideo from '/videos/video.mp4';
import { SettingsBar } from './home/components/settingsBar';
import { ResultsTable } from './home/components/table';
import { Preview } from './home/components/preview';

const style = {
	borderRadius: '12px',
	overflow: 'hidden'
}

export default function Home() {
  return (
    <div className="w-full h-screen text-center flex flex-col items-center gap-16 py-16">
		<h1 className='text-white text-4xl font-bold'>
			Welcome to AI Object Detection
		</h1>
		<div className='w-[800px] flex flex-col gap-4 shadow-lg'>
			<Preview />
			<Video src={busVideo} width={800} height={450} style={style}/>
			<h2 className='text-white text-2xl font-semibold'>Settings</h2>
			<SettingsBar />
			<ResultsTable />
		</div>
    </div>
  );
}

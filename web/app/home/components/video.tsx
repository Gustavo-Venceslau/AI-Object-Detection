import { RefObject } from "react"

export interface VideoProps {
	width: number
	height: number
	src: string,
	ref: RefObject<HTMLVideoElement | null>
	className: string
}

export function Video({ width, height, src, ref, className }: VideoProps) {
	return (
		<video 
			width={width}
			height={height}
			controls 
			preload="auto"
			ref={ref}
			className={className}
		>
			<source src="video.mp4" type="video/mp4" />
			<track
				src={src}
				kind="subtitles"
				srcLang="en"
				label="English"
			/>
			Your browser does not support the video tag.
		</video>
	)
}
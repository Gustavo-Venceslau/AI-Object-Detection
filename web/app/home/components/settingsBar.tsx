"use client"

import { useState } from "react";
import { TextBox } from "../../utils/textBox";

interface SettingsBarProps {
	detectFunction: (confidence: number, iou: number) => void
}

export function SettingsBar({ detectFunction }: SettingsBarProps) {
	const [confidence, setConfidence] = useState(0.1);
	const [iou, setIoU] = useState(0.1);

	const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const confidence = parseFloat(e.target.value);

		setConfidence(confidence);
	}

	const handleIoUChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const iou = parseFloat(e.target.value);

		setIoU(iou);
	}

	return (
		<div className="bg-[#2A2A2A] w-full px-6 py-4 flex justify-between rounded-b-lg rounded-br-lg">
			<div className="flex gap-4 items-center">
				<TextBox name="Confidence" placeholder="Confidence" onChange={handleConfidenceChange}/>
				<TextBox name="IoU" placeholder="IoU" onChange={handleIoUChange}/>
			</div>
			<button 
				className="bg-foreground text-white px-8 py-4 rounded-xl shadow-lg font-semibold" 
				type="button"
				onClick={() => detectFunction(confidence, iou)}
			>
				Detect
			</button>
		</div>
	);
}
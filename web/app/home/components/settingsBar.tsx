"use client"

import { useState } from "react";
import { TextBox } from "../../utils/textBox";
import { CheckBox } from "@/app/utils/checkBox";

interface SettingsBarProps {
	detectFunction: (confidence: number, iou: number, model_name: string) => void
}

export function SettingsBar({ detectFunction }: SettingsBarProps) {
	const [confidence, setConfidence] = useState(0.1);
	const [iou, setIoU] = useState(0.1);
	const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

	const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const confidence = parseFloat(e.target.value);

		setConfidence(confidence);
	}

	const handleIoUChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const iou = parseFloat(e.target.value);

		setIoU(iou);
	}

	const handleCheckboxChange = (checkboxName: string) => {
		setSelectedCheckbox((prev) => (prev === checkboxName ? null : checkboxName));

	  };

	return (
		<div className="bg-[#2A2A2A] w-full px-6 py-4 flex justify-between rounded-b-lg rounded-br-lg">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4 items-center">
					<TextBox name="Confidence" placeholder="Confidence" onChange={handleConfidenceChange}/>
					<TextBox name="IoU" placeholder="IoU" onChange={handleIoUChange}/>
				</div>
				<div className="flex gap-4 items-center">
					<CheckBox 
						label="Performance"
						checked={selectedCheckbox === "yolov8s"}
						onChange={() => handleCheckboxChange("yolov8s")}
					/>
					<CheckBox 
						label="Speed"
						checked={selectedCheckbox === "yolov8n"}
						onChange={() => handleCheckboxChange("yolov8n")}
					/>
				</div>
			</div>
			<button 
				className="bg-foreground text-white px-8 py-4 rounded-xl shadow-lg font-semibold" 
				type="button"
				onClick={() => detectFunction(confidence, iou, selectedCheckbox || "yolov8s")}
			>
				Detect
			</button>
		</div>
	);
}
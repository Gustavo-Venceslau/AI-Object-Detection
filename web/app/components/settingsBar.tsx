"use client"

import { TextBox } from "../utils/textBox";

export function SettingsBar() {
	return (
		<div className="bg-white w-full p-6 rounded-full flex justify-between">
			<div className="flex gap-4 items-center">
				<TextBox name="Confidence" placeholder="Confidence"/>
				<TextBox name="IoU" placeholder="IoU"/>
			</div>
			<button 
				className="bg-foreground text-white px-8 py-4 rounded-full shadow-lg font-semibold" 
				type="button"
			>
				Detect
			</button>
		</div>
	);
}
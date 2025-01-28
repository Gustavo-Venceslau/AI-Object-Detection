export interface TextBoxProps {
	name: string;
	placeholder: string;
}

export function TextBox({ name, placeholder }: TextBoxProps) {
	return <input 
		type="text" 
		name={name} 
		placeholder={placeholder}
		className="border-2 border-foreground p-4 rounded-full w-32 h-12"
	/>
}
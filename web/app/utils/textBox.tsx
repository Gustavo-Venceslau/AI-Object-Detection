export interface TextBoxProps {
	name: string;
	placeholder: string;
}

export function TextBox({ name, placeholder }: TextBoxProps) {
	return <input 
		type="text" 
		name={name} 
		placeholder={placeholder}
		className="border-[1px] border-[#2A2A2A] shadow-lg p-4 rounded-full w-32 h-12"
	/>
}
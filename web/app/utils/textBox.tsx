export interface TextBoxProps {
	name: string;
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextBox({ name, placeholder, onChange }: TextBoxProps) {
	return <input 
		type="text" 
		name={name} 
		placeholder={placeholder}
		className="bg-[#2A2A2A] border-[1px] border-white shadow-lg p-4 rounded-xl w-32 h-12 text-white"
		onChange={onChange}
	/>
}
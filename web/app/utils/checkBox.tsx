interface CheckBoxProps {
	label: string;
	checked: boolean;
	onChange: () => void;
  };

export function CheckBox({ label, checked, onChange }: CheckBoxProps) {
	return (
		<label className="flex gap-2">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<h1 className="text-white font-semibold">{label}</h1>
		</label>
	)
}
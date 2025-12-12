type InputProps = {
	value: string | number;
	onChange: (value: string) => void;
	placeholder: string;


}
/**
 * Szöveg alapú input mező
 *
 * @param value - Input value
 * @param onChange - Input value hook
 * @param placeholder -placeholder
 * @returns string típusu input
 */

export function TextInput({ value, onChange, placeholder }: InputProps) {
	return <div class="TextInput">
		<input type='text' value={value} onInput={e => onChange(e.currentTarget.value)} placeholder={placeholder} required></input>
	</div>
}


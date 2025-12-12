type InputProps = {
	value: string | number;
	onChange: (value: string) => void;
	placeholder: string;
	minimum?: number;

}
/**
 * Szám alapú input mező
 *
 * @param value - Input value
 * @param onChange - Input value hook
 * @param minimum - minimum érték az inputnak
 * @param placeholder -placeholder
 * @returns Number típusu input
 */

export function NumberInput({ value, onChange, minimum, placeholder }: InputProps) {
	return <div class="TextInput">
		<input type='number' min={minimum} value={value} onInput={e => onChange(e.currentTarget.value)} placeholder={placeholder} required></input>
	</div>
}

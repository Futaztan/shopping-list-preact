type InputProps = {
	value: string | number;
	onChange: ( value: string  ) => void;
	placeholder: string;
    minimum?: number;
   
}
export function TextInput( { value, onChange, minimum, placeholder }: InputProps )
{
	return <div class="TextInput">
		<input type='text' value={ value } onInput={ e => onChange( e.currentTarget.value ) } placeholder={ placeholder } required></input>
	</div>
}

export function NumberInput( { value, onChange, minimum, placeholder }: InputProps )
{
    return <div class="TextInput">
		<input  type='number' min={minimum} value={ value } onInput={ e => onChange( e.currentTarget.value ) } placeholder={ placeholder } required></input>
	</div>
}

import Block from '../../utils/Block';

import * as styles from '../../../src/main.css';

type InputType = 'text' | 'password' | 'email';
export interface InputProps {
	onChange?: (e: any) => void;
	type?: InputType;
	placeholder?: string;
	name: string;
	value?: string;
	error?: string;
	onBlur?: () => void;
	onFocus?: () => void;
}

export default class Input extends Block {
	static componentName = 'Input';

	constructor({
		onChange = () => {},
		type = 'text',
		error,
		name,
		placeholder,
		value,
		onFocus,
		onBlur,
	}: InputProps) {
		super({
			type,
			placeholder,
			value,
			name,
			error,
			events: { input: onChange, blur: onBlur, focus: onFocus },
		});
	}

	protected render(): string {
		// language=hbs
		return `
        <input 
		class="input_reg"
		name={{name}}
		type="{{type}}" 
		placeholder="{{placeholder}}" 
		value="{{value}}"
		>
    `;
	}
}
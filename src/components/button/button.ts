import Block from '../../utils/Block';

import * as styles from '../../../src/main.css';


interface ButtonProps {
	text: string;
	className: string;
	onClick: () => void;
}

export default class Button extends Block {
	static componentName = 'Button';

	constructor({ text, className, onClick }: ButtonProps) {
		super({ text, className, events: { click: onClick } });
	}

	protected render(): string {
		// language=hbs
		return `

        <button class="{{className}}" type="button">{{text}}</button>

    `;
	}
}
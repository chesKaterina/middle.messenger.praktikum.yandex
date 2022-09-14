import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
  events?: {
    click?: ()=> void;
    focusin?: (e: { target: HTMLInputElement; }) => void;
    focusout?: (e: { target: HTMLInputElement; }) => void;
  };
  className?: string;
  type?: string;
  placeholder?: string;
  name: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
  events?: {
    click?: ()=> void;
    blur?: (e: { target: HTMLInputElement; }) => void;
    focus?: (e: { target: HTMLInputElement; }) => void;
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

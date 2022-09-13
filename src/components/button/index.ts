import Block from '../../utils/Block';
import template from './button.hbs';
import * as style from '../../main.css';

interface ButtonProps {
  label: string;
  events: {
    click: () => void;
  };
  className?: string;
  type?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

import Block from '../../utils/Block';
import template from './link.hbs';

interface LinkProps {
  events: {
    click: () => void;
  };
  className?: string;
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

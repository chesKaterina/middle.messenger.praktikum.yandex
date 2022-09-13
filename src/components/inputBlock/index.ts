import Block from '../../utils/Block';
import template from './inputBlock.hbs';
import { Input } from '../input';

type InputBlockProps = {
    name: string;
    text: string;
    type: string;
    className: string;
    events?: {
      blur?: (e: { target: HTMLInputElement; }) => void;
      focus?: (e: { target: HTMLInputElement; }) => void;
    }
}

export class InputBlock extends Block<InputBlockProps> {
  public constructor(props: InputBlockProps) {
    super('div', props);
  }

  init() {
    this.children.input = new Input({
        name: this.props.name,
        type: this.props.type,
        className: this.props.className,
        events: this.props.events,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

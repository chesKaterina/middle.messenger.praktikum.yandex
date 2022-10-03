import Block from '../../../utils/Block';
import template from './msg_block.hbs';

interface Props {
  content: string;
  time: string;
  className: string;
}

export class Message extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props});
  }
}

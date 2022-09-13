import Block from '../../utils/Block';
import template from './chat_contacts.hbs';

interface ChatContactProps {
  events: {
    click: () => void;
  };
  className?: string;
  chatName: string,
  userAvatar: string,
  textMsg: string,
  lastMsgTime: string,
  msgCount: number,

}

export class ChatContact extends Block {
  constructor(props: ChatContactProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

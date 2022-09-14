import Block from '../../utils/Block';
import template from './chat.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { ChatContact } from '../../components/chat';

interface ChatProps {

}

export class ChatPage extends Block {
  constructor(props: ChatProps) {
    super('div', props);
  }

  init() {
    this.children.inputSearch = new Input({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'input_search',
      type: 'text',
      placeholder: 'Поиск',
      name: 'search'
    })

    this.children.chatItem = new ChatContact({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'chat_item flex',
      chatName: 'Alex',
      userAvatar: '../../../static/img/jo.jpg',
      textMsg: 'Hi! Whatsapp?',
      lastMsgTime: '17:10',
      msgCount: 1

    })
    this.children.linkToProfile = new Link({
      events: {
        click: () => console.log('go to profile')
      },
      text: 'Профиль',
      to: '/profile'
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}


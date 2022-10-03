import Block from '../../utils/Block';
import template from './error_404.hbs';
import { Link } from '../../components/link';

export class Error404Page extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.link_back = new Link({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'link_back fonts',
      to: '/chat',
      text: 'Назад к чатам',
    });

  }

  render() {
    return this.compile(template, {...this.props});
  }
}


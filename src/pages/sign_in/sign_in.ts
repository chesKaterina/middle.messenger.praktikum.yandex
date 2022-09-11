import Block from '../../utils/Block';
import template from './sign_in.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import * as styles from '../../../src/main.css';

interface SignInProps {

}

export class SignInPage extends Block {
  constructor(props: SignInProps) {
    super('div', props);
  }

  init() {
    this.children.button = new Button({
      label: 'Авторизоваться',
      events: {
        click: () => console.log('clicked'),
      },
      className: 'btn',
      type: 'submit',
    });

    this.children.input_login = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'text',
    })

    this.children.input_password = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'password',
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default SignInPage;

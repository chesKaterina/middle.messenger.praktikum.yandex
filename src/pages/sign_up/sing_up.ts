import Block from '../../utils/Block';
import template from './sign_up.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import * as styles from '../../../src/main.css';

interface SignUpProps {

}

export class SignUpPage extends Block {
  constructor(props: SignUpProps) {
    super('div', props);
  }

  init() {
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: () => console.log('clicked'),
      },
      className: 'btn',
      type: 'submit',
    });

    this.children.input_email = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'email',
    })

    this.children.input_login = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'text',
    })

    this.children.input_name = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'text',
    })

    this.children.input_surname = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'text',
    })

    this.children.input_phone = new Input({
      events: {
        click: () => console.log('clicked'),
        change: () => console.log('....'),
      },
      className: 'input_reg',
      type: 'tel',
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
export default SignUpPage;

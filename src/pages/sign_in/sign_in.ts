import Block from '../../utils/Block';
import template from './sign_in.hbs';
import { Button } from '../../components/button';
import { Link} from '../../components/link';
import { validate, validForm } from '../../utils/validator';
import { InputBlock } from '../../components/inputBlock';

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
        click: () => {if (validForm('form')){window.location.href='/chat'}}
      },
      className: 'btn',
    });

    this.children.input_login = new InputBlock({
      events: {
        focus: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        blur: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'input_reg',
      type: 'text',
      name: 'login',
      text: 'Логин'
    })

    this.children.input_password = new InputBlock({
      className: 'input_reg',
      type: 'password',
      events: {
        focus: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        blur: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      name: 'password',
      text: 'Пароль'
    })

    this.children.registration_link = new Link({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'enter_link',
      to: '/signUp',
      text: 'Нет аккаунта?',
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}


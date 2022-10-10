import Block from '../../utils/Block';
import template from './sign_in.hbs';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { validate, validForm, isValidForm } from '../../utils/validator';
import { InputBlock } from '../../components/inputBlock';
import { SigninData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

export class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new Button({
      label: 'Авторизоваться',
      events: {
        click: () => { if (isValidForm('.form')) { this.onSubmit()} }
      },
      className: 'btn',
      type: 'button'
    });

    this.children.input_login = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
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
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
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

  onSubmit() {
    const data = validForm('.form');
    AuthController.signin(data as SigninData);
}

  render() {
    return this.compile(template, {...this.props});
  }
}


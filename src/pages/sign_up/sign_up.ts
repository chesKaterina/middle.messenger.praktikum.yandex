import Block from '../../utils/Block';
import template from './sign_up.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { removeError, setErrorMes, validate, validForm, isValidForm } from '../../utils/validator';
import { InputBlock } from '../../components/inputBlock';
import { SignupData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';


export class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: () => {
          if (isValidForm('.form')) { this.onSubmit() }
        },
      },
      className: 'btn',
      type: 'button',
    });

    //Email
    this.children.input_email = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'input_reg',
      type: 'email',
      text: 'Почта',
      name: 'email'
    })
    //Login
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
    //First name
    this.children.input_name = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'input_reg',
      type: 'text',
      name: 'first_name',
      text: 'Имя'
    })

    //Second name
    this.children.input_surname = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'input_reg',
      type: 'text',
      name: 'second_name',
      text: 'Фамилия'
    })

    //Phone
    this.children.input_phone = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'input_reg',
      type: 'tel',
      name: 'phone',
      text: 'Телефон'
    })

    //Password section
    this.children.input_password = new InputBlock({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => {
          validate(e.target.name, e.target.value)
          const passInput = document.querySelector('input[name=password2]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes("password2", 'Пароли должны совпадать')
          } else {
            removeError("password2")
          }
        },
        focusin: (e: { target: HTMLInputElement; }) => {
          validate(e.target.name, e.target.value)
          const passInput = document.querySelector('input[name=password2]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes("password2", 'Пароли должны совпадать')
          } else {
            removeError("password2")
          }
        }
      },
      className: 'input_reg',
      type: 'password',
      name: 'password',
      text: 'Пароль'

    })

    this.children.input_second_password = new InputBlock({
      name: "password2",
      type: "password",
      text: "Пароль (ещё раз)",
      className: 'input_reg',
      events: {
        focusout: (e: { target: HTMLInputElement; }) => {
          const passInput = document.querySelector('input[name=password]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes(e.target.name, 'Пароли должны совпадать')
          } else {
            removeError(e.target.name)
          }
        },
        focusin: (e: { target: HTMLInputElement; }) => {
          const passInput = document.querySelector('input[name=password]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes(e.target.name, 'Пароли должны совпадать')
          } else {
            removeError(e.target.name)
          }
        }

      }
    })

    this.children.enter_link = new Link({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'enter_link',
      to: '/signIn',
      text: 'Войти',
    })
  }

onSubmit() {
    const data = validForm('.form');
    AuthController.signup(data as SignupData);
}

  render() {
    return this.compile(template, {...this.props});
  }
}

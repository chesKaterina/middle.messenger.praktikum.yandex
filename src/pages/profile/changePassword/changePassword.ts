import Block from '../../../utils/Block';
import template from './changePassword.hbs';
import AuthController from '../../../controllers/AuthController';
import UserController from '../../../controllers/UserController';
import { withStore } from '../../../utils/Store';
import { Input } from '../../../components/input';
import { removeError, setErrorMes, validate, validForm, isValidForm} from '../../../utils/validator';
import { Button } from '../../../components/button';
import { Link } from '../../../components/link';
import { InputBlock } from '../../../components/inputBlock';
import { Avatar } from '../../../components/avatar';

export type EditPass = {
  oldPassword: string;
  newPassword: string;

}

class PasswordPage extends Block {

  init() {

    if(this.props?.avatar){
      this.children.avatar = new Avatar({
        link: `https://ya-praktikum.tech/api/v2/resources${this.props?.avatar}`
      })
    }

    this.children.password = new Input({
        className: 'right_box input_pass disabled_text',
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Введите старый пароль',

      })

    this.children.newPassword = new Input({
      className: 'right_box input_pass disabled_text',
      name: 'newPassword',
      type: 'password',
      placeholder: 'Введите новый пароль',
      events: {
        focusout: (e: { target: HTMLInputElement; }) => {
          validate(e.target.name, e.target.value)
          const passInput = document.querySelector('input[name=newPassword2]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes("newPassword2", 'Пароли должны совпадать')
          } else {
            removeError("newPassword2")
          }
        },
        focusin: (e: { target: HTMLInputElement; }) => {
          validate(e.target.name, e.target.value)
          const passInput = document.querySelector('input[name=newPassword2]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes("newPassword2", 'Пароли должны совпадать')
          } else {
            removeError("newPassword2")
          }
        }
      }
    })

    this.children.newPassword2 = new Input({
      className: 'right_box input_pass disabled_text',
      name: 'newPassword2',
      type: 'password',
      placeholder: 'Подтвердите пароль',
      events: {
        focusout: (e: { target: HTMLInputElement; }) => {
          const passInput = document.querySelector('input[name=newPassword]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes(e.target.name, 'Пароли должны совпадать')
          } else {
            removeError(e.target.name)
          }
        },
        focusin: (e: { target: HTMLInputElement; }) => {
          const passInput = document.querySelector('input[name=newPassword]') as HTMLInputElement;
          if (passInput.value !== (e.target as HTMLInputElement).value) {
            setErrorMes(e.target.name, 'Пароли должны совпадать')
          } else {
            removeError(e.target.name)
          }
        }
      }
    })



    this.children.save = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
          if (isValidForm('.form_pass')) { this.onSubmit()}
        }
      },
      className: 'btn btn_pass',
      type: 'button'
    });

    this.children.back = new Link({
      className: 'return_img btn_pass',
      events: {
        click: () => {AuthController.back()},
      },

      to: '/chat',
      text: '<',
    })



  }
  onSubmit() {
    const data = validForm('.form_pass');
    UserController.editPass(data as EditPass);


  }

  render() {
    return this.compile(template, { ...this.props });
  }

}

const withUser = withStore((state) => ({ ...state.user }))
export const EditPasswordPage = withUser(PasswordPage);

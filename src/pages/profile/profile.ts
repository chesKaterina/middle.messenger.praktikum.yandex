import Block from '../../utils/Block';
import template from './profile.hbs';
import { Link } from '../../components/link';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { withStore } from '../../utils/Store';
import { Input } from '../../components/input';
import Router from '../../utils/Router';
import { Button } from '../../components/button';
import { validate, validForm, isValidForm} from '../../utils/validator';

export type User = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

class ProfilePage extends Block {

  init() {
    this.children.change_data = new Link({
      events: {
        click: () => {
          const allInputs = document.querySelectorAll('input')
          allInputs.forEach((inp) => inp.classList.remove('disabled_input')
          )
        }
      },
      to: '',
      text: 'Изменить данные',
      className: 'color_link',
    });

    this.children.change_password = new Link({
      events: {
        click: () => {Router.go('/profile/change-pass')},
      },
      to: '',
      text: 'Изменить пароль',
      className: 'color_link',
    });

    this.children.out = new Link({
      className: 'out',
      events: {
        click: () => {AuthController.logout()},
      },

      to: '/',
      text: 'Выйти',
    })

    this.children.back = new Link({
      className: 'return_img',
      events: {
        click: () => {AuthController.back()},
      },

      to: '/chat',
      text: '<',
    })

    this.children.userName = new Input({
        className: 'disabled_input right_box disabled_text',
        name: 'display_name',
        value: this.props?.display_name

      })

    this.children.userEmail = new Input({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'disabled_input right_box disabled_text',
      name: 'email',
      value: this.props?.email
    })

    this.children.userLogin = new Input({
      className: 'disabled_input right_box disabled_text',
      name: 'login',
      value: this.props?.login
    })

    this.children.userFirstName = new Input({
      className: 'disabled_input right_box disabled_text',
      name: 'first_name',
      value: this.props?.first_name
    })

    this.children.userSecondName = new Input({
      className: 'disabled_input right_box disabled_text',
      name: 'second_name',
      value: this.props?.second_name
    })

    this.children.userPhone = new Input({
      events: {
        focusout: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value),
        focusin: (e: { target: HTMLInputElement; }) => validate(e.target.name, e.target.value)
      },
      className: 'disabled_input right_box disabled_text',
      name: 'phone',
      value: this.props?.phone
    })

    this.children.saveChange = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
          if (isValidForm('.form_pass')) { this.onSubmit()}
        }
      },
      className: 'btn',
      type: 'button'
    });

  }


  onSubmit() {
    const data = validForm('.form');
    UserController.editUser(data as User);

  }


  render() {
    return this.compile(template, { ...this.props });
  }

}


const withUser = withStore((state) => ({ ...state.user }))
export const UserProfilePage = withUser(ProfilePage);
import Block from '../../utils/Block';
import template from './profile.hbs';
import { Link } from '../../components/link';
// import { User} from "../../components/user";
import AuthController from '../../controllers/AuthController';
import { UserController } from '../../controllers/UserController';
import { withStore } from '../../utils/Store';
import { Input } from '../../components/input';

export type User = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

class ProfilePage extends Block {
  // constructor() {
  //   super({});
  // }

  init() {
    this.children.change_data = new Link({
      events: {
        click: () => console.log('clicked'),
      },
      to: '',
      text: 'Изменить данные',
    });

    this.children.change_password = new Link({
      events: {
        click: () => console.log('clicked'),
      },
      to: '',
      text: 'Изменить пароль',
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
      text: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left"
      viewBox="0 0 28 28">
      <path fill-rule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
    </svg>`,
    })

    this.children.userName = new Input({
        className: 'disabled_input right_box disabled_text',
        name: 'display_name',
        value: this.props?.display_name

      })

    this.children.userEmail = new Input({
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
      className: 'disabled_input right_box disabled_text',
      name: 'phone',
      value: this.props?.phone
    })

  }

  render() {
    return this.compile(template, { ...this.props });
  }

}

const withUser = withStore((state) => ({ ...state.user }))
export const UserProfilePage = withUser(ProfilePage);

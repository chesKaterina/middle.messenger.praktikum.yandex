import Block from '../../utils/Block';
import template from './profile.hbs';
import { Link } from '../../components/link';
// import { User} from "../../components/user";

interface ProfileProps {

}

export class ProfilePage extends Block {
  constructor(props: ProfileProps) {
    super('div', props);
  }

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
      events: {
        click: () => console.log('clicked'),
      },
      to: '/signIn',
      text: 'Выйти',
    })

    // this.children.name = new User({
    //   className: 'right_box disabled_text',
    //   name: 'avas',
    // })

    // this.children.email = new User({
    //   className: 'right_box disabled_text',
    //   name: 'avas@yoo.com',
    // })

    // this.children.login = new User({
    //   className: 'right_box disabled_text',
    //   name: 'spark_avas',
    // })

    // this.children.first_name = new User({
    //   className: 'right_box disabled_text',
    //   name: 'Альберт',
    // })

    // this.children.second_name = new User({
    //   className: 'right_box disabled_text',
    //   name: 'Васельков',
    // })

    // this.children.phone = new User({
    //   className: 'right_box disabled_text',
    //   name: '+79931234567',
    // })
  }

  render() {
    return this.compile(template, this.props);
  }
}

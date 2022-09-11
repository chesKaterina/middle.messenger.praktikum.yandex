import Block from '../../utils/Block';
import template from './main.hbs';
import * as styles from '../../../src/main.css';

interface MainPageProps {

}

export class MainPage extends Block {
  constructor(props: MainPageProps) {
    super('div', props);
  }

  init() {

  }

  render() {
    return this.compile(template, this.props);
  }
}
export default MainPage;

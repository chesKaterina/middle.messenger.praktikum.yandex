import Block from '../../utils/Block';
import * as styles from '../../../src/main.css';

export default class Search extends Block {
	static componentName = 'Search';

	protected render(): string {
		return `
      <div class="search">
        <form class="form" action="" method="post">
          <input class="input_search" type="text" placeholder="Поиск">
        </form>
      </div>
      `;
	}
}

import Block from '../../utils/Block';
import * as styles from '../../../src/main.css';

type ChatButtonProps = {
	user_name: string;
	user_avatar: string;
	text_msg: string;
	last_msg_time: string;
	msg_count: number;
};

export default class ChatContact extends Block {
	static componentName = 'ChatContact';

	protected render(): string {
		return `
    <li class="chat_item flex">
    <div class="left_part_chats flex">
      <div class="avatar_pic"><img class="user_avatar" src="{{user_avatar}}" alt="Аватар"> </div>
      <div>
        <h3 class="name descrip"> название чата</h3>
        <p class="text_descr descrip">{{text_msg}}</p>
      </div>
    </div>
    <div class="right_part_chats flex">
      <div class="timer descrip">{{last_msg_time}}</div>
      <div class="counter descrip">{{msg_count}}</div>
    </div>
  </li>
  `;
	}
}

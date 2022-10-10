import Block from "../../../utils/Block";
import template from "./chatTitle.hbs";
import ChatController from "../../../controllers/ChatController";

type ChatOptionsProps = {
  chatId: number;
  chatName: string;
  userAvatar: string;

};

export class ChatTitle extends Block<ChatOptionsProps> {
  constructor(props: ChatOptionsProps) {
    super(props);
  }

  protected initChildren() {

  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props});
  }
}

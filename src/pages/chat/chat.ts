import Block from '../../utils/Block';
import template from './chat.hbs';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { ChatContact } from '../../components/chat';
import { Message } from '../../components/chat/msg/index';
import ChatController from '../../controllers/ChatController';
import { withStore } from '../../utils/Store';
import { ChatTitle } from '../../components/chat/chatTitle';

export type ChatInfo = {
  last_message: {
    content: string
  };
  title: string;
  id: number;
  unread_count: number;
}

type MessageData = {
  time: Date;
  user_id: number;
  content: string;
}

class ChatPage extends Block {

  protected initChildren() {
    this.children.chatList = [];
    if (this.props?.allChats !== undefined) {
      Object.values(this.props.allChats).map((chats: any) => {
        const text = chats.last_message?.content.length > 30 ? `${chats.last_message?.content.slice(0, 30)}...` : chats.last_message?.content;

        this.children.chatList.push(
          new ChatContact({
            chatName: chats.title,
            textMsg: text,
            msgCount: chats.unread_count!,
            className: 'chat_item flex',
            userAvatar: chats.avatar!,
            lastMsgTime: chats.last_message?.time,
            events: {
              click: () => {
                ChatController.getChat(chats.id, this.props.user.id, chats.title);
                console.log(this.props?.chat)
              },
            }
          }),
        );
      });
    }

    if (this.props?.token !== undefined) {
      this.children.header = new ChatTitle({
        chatId: this.props.chatId,
        chatName: this.props.nameChat,
        userAvatar: this.props.user.avatar
      });
    }

    this.children.messages = [];

    if (this.props?.chat !== undefined) {
      this.props.chat.forEach((message: MessageData) => {
        const date = new Date(message.time);
        const isMyMessage = message.user_id === this.props.user.id;
        this.children.messages.unshift(
          new Message({
            content: message.content,
            time: `${date.getHours()}:${date.getMinutes()}`,
            className: isMyMessage ? 'message-outgoing' : 'message-incoming',
          }),
        );
      });
    }

    this.children.inputSearch = new Input({
      events: {
        click: () => console.log('clicked'),
      },
      className: 'input_search',
      type: 'text',
      placeholder: 'Поиск',
      name: 'search'
    })

    this.children.linkToProfile = new Link({
      events: {
        click: () => {ChatController.profile();
        }
      },
      text: 'Профиль',
      to: '/profile'
    })
    this.children.inputMess = new Input({
      events: {
        click: () => console.log('clicked'),
      },
      name: "message",
      type: "text",
      className: "chat_mess",
      placeholder: "Сообщение",

    })
    this.children.sendBtn = new Button({
      label: '>',
      events: {
        click: (evt) => {
          evt.preventDefault();
          const elm = document.querySelector('[name="message"]') as HTMLInputElement
          const data = elm.value
          ChatController.sendMessage(data);
        },
      },
      className: 'send_mess',
      type: 'button'
    });
    this.children.addChatBtn = new Button({
      label: '+ Add new chat',
      events: {
        click: () => {
          let data = "Новый чат"
          const chatName = prompt("Пожалуйста, введите имя чата:", data);
          if (chatName != null || chatName != "") {
            data = chatName!
          }
          if (data) {
            const chatTitleObj = {'title': data}
            ChatController.createChat(chatTitleObj);
          }
        }
      },
      className: 'add_chat btn',
      type: 'button'
    });
  }

  onSubmit(){
    const elm = document.querySelector('[name="message"]') as HTMLInputElement
    const msg = elm.value

    console.log(msg)
    elm.value = ''
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  allChats: state.allChats,
  chatId: state.chatId,
  nameChat: state.nameChat,
  token: state.token,
  user: state.user,
  chat: state.chat
}))

export const ChatsPage = withChats(ChatPage);


import API, { ChatsAPI, TypesUsersChat, TypesChat } from '../api/ChatAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class ChatController {
  private readonly api: ChatsAPI;

  socket: WebSocket | null;

  data: any;

  constructor() {
    this.api = API;
    this.socket = null;
  }

  async createChat(data: TypesChat) {
    try {
      await this.api.createChat(data);

      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async getChats() {
    const chats = await this.api.read();
    store.set('allChats', chats);
  }

  async getChat(id: number, userId: number, name: string) {
    const resp: any = await this.api.getChat(id);
    const { token } = resp;
    store.set('chatId', id);
    store.set('token', token);
    store.set('nameChat', name);

    if (this.socket) {
      this.socket.close();
      store.set('chat', { chatId: id });
    }
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
    this.socket.addEventListener('open', () => {
      console.log('connection open');
      (this.socket as WebSocket).send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    this.socket.addEventListener('message', (evt) => {
      this.data = {
        ...JSON.parse(evt.data),
        chatId: id,
      };
      store.set('chat', JSON.parse(evt.data));
    });

    this.socket.addEventListener('error', (evt: any) => {
      console.log('Ошибка', evt.message);
    });

    this.getChats();
  }

  async sendMessage(newMessage: string) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: newMessage,
          type: 'message',
        }),
      );
      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    }

    this.getChats();
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id)
      store.set('token', undefined);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async addUser(data: TypesUsersChat) {
    try {
      await this.api.addUserToChat(data);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async deleteUser(data: TypesUsersChat) {
    try {
      await this.api.deleteUserFromChat(data);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }
  async profile() {
    try {
      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new ChatController();

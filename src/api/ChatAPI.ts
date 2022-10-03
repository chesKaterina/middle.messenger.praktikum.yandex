import BaseAPI from './BaseAPI';

export interface TypesChat {
  title: string;
}

export interface TypesUsersChat {
  users: number[]
  chatId: number
}
export interface User {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
export interface Chat {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: User,
    time: string
    content: string
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super();
  }

  read(): Promise<Chat> {
    return this.http.get('/chats');
  }

  createChat(data: TypesChat) {
    return this.http.post('/chats', data);
  }

  getChat(id: number) {
    return this.http.post(`/chats/token/${id}`);
  }

  deleteChat(id: number) {
    return this.http.delete('/chats', {chatId: id});
  }

  SearchUserChat(data: string) {
    return this.http.post('/user/search', {login: data});
  }

  addUserToChat(data: TypesUsersChat) {
    return this.http.put('/chats/users', data );
  }

  deleteUserFromChat(data: TypesUsersChat) {
    return this.http.delete('/chats/users', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatsAPI();

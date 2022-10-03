import BaseAPI from './BaseAPI';

export interface EditUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface EditPass {
  oldPassword: string;
  newPassword: string;

}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super();
  }

  editUser(data: EditUser) {
    return this.http.put('/user/profile', data);
  }


  editPass(data: EditPass) {
    return this.http.put('/user/password', data);
  }

  editAvatar(data: any) {
    return this.http.put('/user/profile/avatar', data);
  }

  read(): Promise<User> {
    return this.http.get('/auth/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();

import API, { UserAPI, EditUser, EditPass } from '../api/UserAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async editAvatar(data: any) {
    try {
      this.api.editAvatar(data);
      router.go('/profile');
      setTimeout(() => location.reload(), 500);
    } catch (e: any) {
      console.error(e);
    }
  }

  async editUser(data: EditUser) {
    try {
      const changedData = await this.api.editUser(data);
      if (changedData) {
          await this.fetchUser();
          router.go('/profile');
      }
    } catch (e: any) {
      console.error(e);
    }
  }
  async editPass(data: EditPass) {
    this.api.editPass(data)
      .then(() => {
        router.go('/profile');
      })
      .catch((e) => {
        alert(e.reason)
      })
  }


  async avatarEdit() {
    try {
      router.go('/profile/change-avatar');
    } catch (e: any) {
      console.error(e);
    }
  }

  async passEdit() {
    try {
      router.go('/profile/change-pass');
    } catch (e: any) {
      console.error(e);
    }
  }

  async userEdit() {
    try {
      router.go('/profile/change-profile');
    } catch (e: any) {
      console.error(e);
    }
  }
  async messenger() {
    try {
      router.go('/messenger');
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

}

export default new UserController();

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
      router.go('/settings');
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
          router.go('/settings');
      }
    } catch (e: any) {
      console.error(e);
    }
  }
  async editPass(data: EditPass) {
    this.api.editPass(data)
      .then(() => {
        router.go('/settings');
      })
      .catch((e) => {
        alert(e.reason)
      })
  }


  async avatarEdit() {
    try {
      router.go('/settings/change-avatar');
    } catch (e: any) {
      console.error(e);
    }
  }

  async passEdit() {
    try {
      router.go('/settings/change-pass');
    } catch (e: any) {
      console.error(e);
    }
  }

  async userEdit() {
    try {
      router.go('/settings/change-profile');
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

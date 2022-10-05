import { SignInPage } from './src/pages/sign_in/sign_in';
import { SignUpPage } from './src/pages/sign_up/sign_up';
import { Error404Page } from './src/pages/error/error_404';
import { Error500Page } from './src/pages/error/error_500';
import { UserProfilePage } from './src/pages/profile/profile';
import { ChatsPage } from './src/pages/chat/chat';
import { EditPasswordPage } from './src/pages/profile/changePassword/changePassword';
import Router from './src/utils/Router';
import store from './src/utils/Store';
import AuthController from './src/controllers/AuthController';
import ChatController from './src/controllers/ChatController';

enum Routes {
  Index = '/',
  Register = '/signUp',
  Profile = '/profile',
  Error404 = '/404',
  Error500 = '/500',
  Chats ='/chat',
  ChangePassword = '/profile/change-pass',
  // Logout ='/logout',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, SignInPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, UserProfilePage)
    .use(Routes.Error404, Error404Page)
    .use(Routes.Error500, Error500Page)
    .use(Routes.Chats, ChatsPage)
    .use(Routes.ChangePassword, EditPasswordPage)

    let isProtectedRoute = true;

    switch (window.location.pathname) {
      case Routes.Index:
      case Routes.Register:
        isProtectedRoute = false;
        break;
    }
    try {
      await AuthController.fetchUser();
      await ChatController.getChats();

      Router.start();

      if (!isProtectedRoute) {
        Router.go(Routes.Profile)
      }
    } catch (e) {
      Router.start();

      if (isProtectedRoute) {
        Router.go(Routes.Index);
      }
    }

});


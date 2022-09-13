import {SignInPage} from "./src/pages/sign_in/sign_in";
import {SignUpPage} from "./src/pages/sign_up/sign_up";
import {Error404Page} from "./src/pages/error/error_404";
import {Error500Page} from "./src/pages/error/error_500";
import {ProfilePage} from "./src/pages/profile/profile";
import { ChatPage } from "./src/pages/chat/chat";

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  if (window.location.pathname === '/signUp'){
    const signUpPage = new SignUpPage({});
    root!.append(signUpPage.getContent());
  } else if (window.location.pathname === '/500'){
    const error500Page = new Error500Page({});
    root!.append(error500Page.getContent());
  } else if (window.location.pathname === '/profile'){
    const profilePage = new ProfilePage({});
    root!.append(profilePage.getContent());
  } else if (window.location.pathname === '/404'){
    const error404Page = new Error404Page({});
    root!.append(error404Page.getContent());
  } else if (window.location.pathname === '/chat'){
    const chatPage = new ChatPage({});
    root!.append(chatPage.getContent());
  } else {
    const signInPage = new SignInPage({});
    root!.append(signInPage.getContent());
  }
})

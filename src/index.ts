import SignInPage from "./pages/sign_in/sign_in";
import SignUpPage from './pages/sign_up/sing_up';

import { ROUTE_PAGES } from './appRouts';
import ChatPage from './pages/chat/chat';
import ChatContact from './components/chat/chat-contact';
import Input from './components/input/input';
import Link from './components/link/link';
import Search from './components/search/search';
import { registerComponent, renderPage } from "./utils";

registerComponent(ChatContact);
registerComponent(Input);
registerComponent(Link);
registerComponent(Search);


document.addEventListener('DOMContentLoaded', () => {
  // const root = document.querySelector('#app');
  // const signInPage = new SignInPage({});

  // root!.append(signInPage.getContent()!);

  // signInPage.dispatchComponentDidMount();

  // const signUpPage = new SignUpPage({});

  // root!.append(signUpPage.getContent()!);

  // signUpPage.dispatchComponentDidMount();
  switch (document.location.pathname) {
		// case ROUTE_PAGES.SIGN_IN:
    //   const signInPage = new SignInPage({});
    //   root!.append(signInPage.getContent()!);
    //   signInPage.dispatchComponentDidMount();
		// 	break;
		// case ROUTE_PAGES.SIGN_UP:
    //   const signUpPage = new SignUpPage({});
    //   root!.append(signUpPage.getContent()!);
    //   signUpPage.dispatchComponentDidMount();
		// 	break;
    default:
    renderPage(ChatPage);
  }
})



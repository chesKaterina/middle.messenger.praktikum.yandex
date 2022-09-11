import Block from "../../utils/Block";

export default class ChatPage extends Block {
  static componentName = 'ChatPage';

  protected render (): string {
    return `
    <html lang="en">

    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Chat messenger</title>
      <link rel="stylesheet" href="./chat.scss">
    </head>

    <body>
      <div class="chat flex">
        <div class="left_box flex">
          <div class="profile_settings">
          {{{ Link
            text="Профиль"
            to=""
            className="profile"
          }}}
          </div>

          {{{ Search }}}

          <div class="chat_list">
            <ul class="chat_block">
              {{{ ChatContact
              	user_name="Андрей"
                user_avatar="../../../static/img/ivan.jpg"
                text_msg="lorem"
                last_msg_time="11:50"
                msg_count=1
              }}}
            </ul>

          </div>
        </div>



        <div class="right_box">
          <p>Выберите чат чтобы отправить сообщение</p>

        </div>
      </div>
    </body>

    </html>

    `;
  }
}

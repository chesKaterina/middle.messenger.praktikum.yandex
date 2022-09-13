const validationRules: Record<string, {reg: RegExp, error: string}> = {
  first_name: {
      reg: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
      error: "Имя некорректное"
  },
  second_name: {
      reg: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
      error: "Фамилия некорректная"
  },
  login: {
      reg: /^[A-Za-z-_0-9]{3,20}/,
      error: "Логин неверен"
  },
  email: {
      reg: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      error: "Почта неверная"
  },
  password: {
      reg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
      error: "Пароль неверный"
  },
  phone: {
      reg: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
      error: "Телефон неверный"
  },
  messages: {
      reg: /^\s*$/,
      error: "не должно быть пустым"
  }
};

export function validate(nameInput: string, valueInput: string ) {
  const pattern = validationRules[nameInput].reg
  const regExp = new RegExp(pattern);
  const isValid = regExp.test(String(valueInput))
  if (!isValid) {
      isErrorMes(nameInput, validationRules[nameInput].error);
} else {
      isDelError(nameInput);
}
}

export function isErrorMes(name: string, error: string) {
  let span = document.getElementById('error_'+ name);
  if (span) {
      //todo: need to add class to span like span.classList.add("error")
      span.innerHTML = error;
  }
}
export function isDelError(name: string) {
  let span = document.getElementById('error_'+ name);
  if (span) {
      //todo: there is we need del error class like span.classList.remove("error")
      span.innerHTML = '';
  }
}
export function validForm(selectorForm: string) {
  const form = document.querySelector("." + selectorForm) as HTMLDivElement;
  const spans = form.querySelectorAll('span');
  const inputs = form.querySelectorAll('input');
  let error = 0;
  let arrForm: any = {};
  spans.forEach((span) => {
      // todo: need to add error counter by class container
      // if (span.classList.contains("error")) {
      //     error = error + 1;
      // }
  });
  inputs.forEach((input) => {
      if (!input.value) {
          error = error + 1;
      }
  });

  if (error === 0) {
      isDelError(selectorForm)
      inputs.forEach((input) => {
          arrForm[input.name] = input.value
      });
      console.log(arrForm);
      return true;
  } else {
      isErrorMes(selectorForm, "Все поля должны быть заполнены")
      return false;
  }
}

const validationRules: Record<string, { reg: RegExp, error: string }> = {
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

export function validate(nameInput: string, valueInput: string) {
  const pattern = validationRules[nameInput].reg
  const regExp = new RegExp(pattern);
  const isValid = regExp.test(String(valueInput))
  if (!isValid) {
    setErrorMes(nameInput, validationRules[nameInput].error);
  } else {
    removeError(nameInput);
  }
}

export function setErrorMes(name: string, error: string) {
  let span = document.getElementById('error_' + name);
  if (span) {
    span.classList.add("error")
    span.innerHTML = error;
  }
}
export function removeError(name: string) {
  let span = document.getElementById('error_' + name);
  if (span) {
    span.classList.remove("error")
    span.innerHTML = '';
  }
}
export function validForm(selectorForm: string) {
  const form = document.querySelector<HTMLFormElement>(selectorForm);
  const spans = form.querySelectorAll('span');
  const inputs = form.querySelectorAll('input');
  let errorsCounter = 0;
  let arrForm: any = {};
  spans.forEach((span) => {

    if (span.classList.contains("error")) {
        errorsCounter += 1;
    }
  });
  inputs.forEach((input) => {
    if (!input.value) {
      errorsCounter = errorsCounter + 1;
    }
  });

  if (errorsCounter === 0) {
    removeError(selectorForm)
    inputs.forEach((input) => {
      arrForm[input.name] = input.value
    });
    return true;
  } else {
    let formClass = selectorForm.substring(1, selectorForm.length)
    setErrorMes(formClass, "Все поля должны быть заполнены")
    return false;
  }
}

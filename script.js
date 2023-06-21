const $form = document.getElementById('form');
const $input = document.getElementById('input');

const $errorHidden = document.getElementById('error-hidden');
const $alertHidden = document.getElementById('alert-hidden');
// validar email con una expresión regular,devuelve true
const isEmailValid = (emailValue) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailValue);
};
// comprobar si el email es incorrecto para mostrar un mensaje
const checkEmail = () => {
  let valid = false;
  const emailValue = $input.value.trim();
  if (!isEmailValid(emailValue)) {
    $errorHidden.classList.remove('hidden');
    $alertHidden.classList.remove('hidden');
  } else {
    $errorHidden.classList.add('hidden');
    $alertHidden.classList.add('hidden');
    valid = true;
  }
  return valid;
};
// funcion debounce
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
      // fn(...args)
    }, delay);
  };
};
const valid = debounce(checkEmail);

const register = () => {
  $form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (checkEmail()) {
      console.log('correcto');
    } else {
      console.log('incorrecto');
    }
  });
  $form.addEventListener('input', (event) => {
    valid(event.target.value);
  });
};
export { register };

// todo : volver a revisar los clusure y el debounce

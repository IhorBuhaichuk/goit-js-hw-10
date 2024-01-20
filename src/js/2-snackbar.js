import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/2-snackbar.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(formEl);

  const promiseOptions = {};
  formData.forEach((value, key) => {
    promiseOptions[key] = value;
  });

  createPromise(promiseOptions)
    .then(value => createMessage(value))
    .catch(error => createMessage(error, true));

  formEl.reset();
});

function createPromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function createMessage(value, isError = false) {
  iziToast.show({
    title: isError ? 'Error' : 'OK',
    titleColor: '#FFF',
    titleSize: '16px',
    message: value,
    messageColor: '#FFF',
    messageSize: '16px',
    position: 'topCenter',
    backgroundColor: isError ? '#EF4040' : '#59A10D',
    iconUrl: isError ? './octagon.svg' : './check.svg',
    progressBarColor: isError ? '#FFBEBE' : '#B5EA7C',
    timeout: 10000,
    targetFirst: false,
    close: false,
    buttons: [
      [
        `<button type="button" id="izi-close-button">
                 <img src="./x.svg" alt="" width="16px" height="16px" />
              </button>`,
        function (instance, toast) {
          instance.hide({}, toast, 'buttonName');
        },
      ],
    ],
  });
}

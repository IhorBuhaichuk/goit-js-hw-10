// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import '../css/2-snackbar.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(formEl);
    const promiseOptions = Object.fromEntries(formData);

    const result = await createPromise(promiseOptions);
    createMessage(result);
  } catch (error) {
    createMessage(error, true);
  } finally {
    formEl.reset();
  }
});

function createPromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = state === 'fulfilled' ? `✅ Fulfilled promise in ${delay}ms` : `❌ Rejected promise in ${delay}ms`;
      state === 'fulfilled' ? resolve(message) : reject(message);
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

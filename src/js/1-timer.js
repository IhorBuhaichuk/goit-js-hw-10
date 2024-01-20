import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let targetDate;

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const timerEls = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const inputOptions = {
  enableTime: true,
  time_24hr: true,
  //   defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];

    const isDateValid = Date.now() < targetDate.getTime();
    if (!isDateValid) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FFF',
        titleSize: '16px',
        message: 'Please choose a date in the future',
        messageColor: '#FFF',
        messageSize: '16px',
        position: 'topCenter',
        backgroundColor: '#EF4040',
        iconUrl: './octagon.svg',
        timeout: 500000,
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

    setAccessElement(buttonEl, isDateValid);
    // console.log(selectedDates[0]);
  },
};

setAccessElement(buttonEl);

inputEl.addEventListener('focus', () => {
  inputOptions.defaultDate = new Date();
  flatpickr(inputEl, inputOptions);
});

buttonEl.addEventListener('click', () => {
  let timeLeft = 0;
  let timeObject = {};
  const intervalId = setInterval(() => {
    timeLeft = targetDate.getTime() - Date.now();

    if (timeLeft > 0) {
      timeObject = convertMs(timeLeft);

      for (const [key, elem] of Object.entries(timerEls)) {
        elem.textContent =
          key === 'days' && timeObject[key] > 99
            ? timeObject[key]
            : (elem.textContent = String(timeObject[key]).padStart(2, '0'));
      }
    } else {
      clearInterval(intervalId);
      setAccessElement(inputEl, true);
    }
  }, 1000);

  setAccessElement(buttonEl);
  setAccessElement(inputEl);
});

function setAccessElement(domElement, enable = false) {
  let isDisabled = domElement.classList.contains('disabled-element');
  if (isDisabled === enable) {
    domElement.classList.toggle('disabled-element');
  }
  if (domElement.classList.contains('disabled-element')) domElement.blur();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

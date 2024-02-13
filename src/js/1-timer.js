import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

// Змінна для зберігання обраної дати
let userSelectedDate;

// Функція для форматування часу
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Функція для обчислення різниці часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    // Валідація дати
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Оберіть дату в майбутньому',
      });
      disableStartButton();
      return;
    }

    enableStartButton();
  },
};

flatpickr('#datetime-picker', options);

// Елементи інтерфейсу таймера
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Кнопка "Start"
const startButton = document.querySelector('[data-start]');

// Функція для оновлення таймера
function updateTimer() {
  const now = new Date();
  const msLeft = userSelectedDate - now;

  if (msLeft <= 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(msLeft);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Запуск таймера
let intervalId;

function startTimer() {
  intervalId = setInterval(updateTimer, 1000);
}

// Функція для активації кнопки "Start"
function enableStartButton() {
  startButton.removeAttribute('disabled');
}

// Функція для деактивації кнопки "Start"
function disableStartButton() {
  startButton.setAttribute('disabled', 'disabled');
}

// Слухач події натискання на кнопку "Start"
startButton.addEventListener('click', () => {
  startTimer();
  disableStartButton();
});

// Деактивація кнопки "Start" за замовчуванням
disableStartButton();

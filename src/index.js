import './main.scss';

const form = document.getElementById('searchForm');
const measureSwitchBtn = document.querySelector('.btn');

const getTime = () => {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return time;
};

const getCurrentDay = () => {
  const date = new Date();
  const dayNumber = date.getDay();
  let day;

  if (dayNumber === 1) {
    day = 'Mon';
  } else if (dayNumber === 2) {
    day = 'Tue';
  } else if (dayNumber === 3) {
    day = 'Wed';
  } else if (dayNumber === 4) {
    day = 'Thur';
  } else if (dayNumber === 5) {
    day = 'Fri';
  } else if (dayNumber === 6) {
    day = 'Sat';
  } else if (dayNumber === 7) {
    day = 'Sun';
  }
  return day;
};

const getCurrentMonth = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const d = new Date();
  const monthName = months[d.getMonth()];
  return monthName;
};
const getCurrentDayNumber = () => {
  const date = new Date();
  const dateNumber = date.getDate();
  return dateNumber;
};

const fullTimeStanp = () => {
  const day = getCurrentDay();
  const dayNum = getCurrentDayNumber();
  const month = getCurrentMonth();
  const time = getTime();
  const full = `${day}, ${dayNum} ${month} ${time}`;
  return full;
};

const weatherUpdate = async (updates) => {
  const dataContainer = document.querySelector('.data');
  dataContainer.innerHTML = '';
  const name = document.createElement('h2');
  const cond = document.createElement('h2');
  const celSymbol = document.createElement('span');
  const iconArea = document.createElement('div');
  const humidArea = document.createElement('div');
  const currentCondition = document.createElement('h3');
  const conditionDesc = document.createElement('p');
  const humidity = document.createElement('p');
  const date = document.createElement('p');
  const weatherImg = document.createElement('img');

  cond.classList.add('class', 'temp');
  humidArea.setAttribute('class', 'humidArea');
  name.setAttribute('class', 'name');

  name.innerHTML = updates.name;
  cond.innerHTML = updates.main.temp;
  celSymbol.textContent = '°C';
  date.innerHTML = fullTimeStanp();
  weatherImg.src = `http://openweathermap.org/img/wn/${updates.weather[0].icon}.png`;
  currentCondition.innerHTML = updates.weather[0].main;
  conditionDesc.innerHTML = updates.weather[0].description;
  humidity.innerHTML = `${updates.main.humidity}%`;

  iconArea.setAttribute('class', 'iconArea');
  iconArea.appendChild(cond);
  iconArea.appendChild(celSymbol);
  iconArea.appendChild(weatherImg);

  humidArea.appendChild(conditionDesc);
  humidArea.appendChild(humidity);

  dataContainer.appendChild(name);
  dataContainer.appendChild(date);
  dataContainer.appendChild(iconArea);
  dataContainer.appendChild(currentCondition);
  dataContainer.appendChild(humidArea);
};

const condition = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0679cd364149a5af42457cf2053eb25f`, { mode: 'cors' },
    );
    const data = await response.json();
    document.querySelector('.switchContainer').classList.remove('hide');
    document.querySelector('.text-line').classList.remove('hide');
    document.querySelector('.data-section').classList.add('animationClass');
    document.querySelector('.loader').classList.add('hide');
    weatherUpdate(data);
  } catch (err) {
    console.log(err);
  }
};

const formEvent = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('search').value;
    document.getElementById('search').value = '';
    document.querySelector('.loader').classList.remove('hide');
    condition(input);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  formEvent();
});

const measureSwitch = () => {
  measureSwitchBtn.addEventListener('click', () => {
    measureSwitchBtn.classList.toggle('alignRight');
    if (measureSwitchBtn.classList.contains('alignRight')) {
      let temp = document.querySelector('.temp').innerText;
      temp = parseFloat(temp);
      temp = Math.round((temp = temp * 1.8 + 32));
      document.querySelector('.temp').innerHTML = temp;
    } else {
      let temp = document.querySelector('.temp').textContent;
      temp = parseFloat(temp);
      temp = Math.round((temp = (temp - 32) * (5 / 9)));
      document.querySelector('.temp').innerHTML = temp;
    }
  });
};

measureSwitch();

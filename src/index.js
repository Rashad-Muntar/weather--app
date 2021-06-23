import './main.scss';

let form = document.getElementById('searchForm')
let measureSwitchBtn = document.querySelector('.btn')

const formEvent = () => {
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let input = document.getElementById("search").value 
    document.getElementById("search").value = ""
    condition(input)
  })
  
}

const condition = async (city) => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=0679cd364149a5af42457cf2053eb25f", { mode: 'cors' }
      )
  const data = await response.json()
  document.querySelector('.switchContainer').classList.remove('hide')
    document.querySelector('.text-line').classList.remove('hide')
  weatherUpdate(data)

  }catch(err){
    console.log(err)
  }
}

const weatherUpdate = async (updates) => {

  let dataContainer = document.querySelector(".data")
  dataContainer.innerHTML = ''
  let name = document.createElement('h2')
  let cond = document.createElement('h2')
  let celSymbol = document.createElement('span')
  let iconArea = document.createElement('div')
  let humidArea = document.createElement('div')
  let currentCondition = document.createElement('h3')
  let conditionDesc = document.createElement('p')
  let humidity = document.createElement('p')
  let date = document.createElement('p')
  let weatherImg = document.createElement('img')
  
  cond.classList.add("class", "temp")
  humidArea.setAttribute("class", "humidArea")
  name.setAttribute("class", "name")

  name.innerHTML = updates.name 
  cond.innerHTML = updates.main.temp
  celSymbol.textContent = "°C"
  date.innerHTML = fullTimeStanp()
  weatherImg.src = `http://openweathermap.org/img/wn/${updates.weather[0].icon}.png`
  currentCondition.innerHTML =  updates.weather[0].main
  conditionDesc.innerHTML = updates.weather[0].description
  humidity.innerHTML = `${updates.main.humidity}%`


  iconArea.setAttribute('class', "iconArea")
  iconArea.appendChild(cond)
  iconArea.appendChild(celSymbol)
  iconArea.appendChild(weatherImg)

  humidArea.appendChild(conditionDesc)
  humidArea.appendChild(humidity)

  dataContainer.appendChild(name)
  dataContainer.appendChild(date)
  dataContainer.appendChild(iconArea)
  dataContainer.appendChild(currentCondition)
  dataContainer.appendChild(humidArea)


}

const getTime = () => {
  let date = new Date()
  let time = date.getHours() + ":" + date.getMinutes()
  return time
}

const getCurrentDay = () => { 
  let date = new Date()
  let dayNumber = date.getDay()
  let day

  if(dayNumber === 1){
    day = "Mon"
  }
  else if(dayNumber=== 2){
    day = "Tue"
  }
  else if(dayNumber === 3){
    day = "Wed"
  }
  else if(dayNumber=== 4){
    day = "Thur"
  }
  else if(dayNumber === 5){
    day = "Fri"
  }
  else if(dayNumber === 6){
   day = "Sat"
  }
  else if(dayNumber === 7){
    day = "Sun"
  }
  return day
}

const getCurrentMonth = () => {
  let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = new Date();
  let monthName=months[d.getMonth()];
  return monthName
}
const getCurrentDayNumber = () => {
  let date = new Date()
  let dateNumber = date.getDate()
  return dateNumber

}
const fullTimeStanp = () => {
  let day = getCurrentDay()
  let dayNum = getCurrentDayNumber()
  let month = getCurrentMonth()
  let time = getTime()
  let full = `${day}, ${dayNum} ${month} ${time}`
  return full
}

document.addEventListener("DOMContentLoaded", ()=>{
    formEvent()
})

const measureSwitch = () =>{
  measureSwitchBtn.addEventListener("click", ()=>{
    let btn = document.querySelector('.btn')
    let units
    measureSwitchBtn.classList.toggle('alignRight')
    if(measureSwitchBtn.classList.contains('alignRight')){
      let temp = document.querySelector(".temp").innerText
      temp = parseFloat(temp);
      temp = Math.round((temp = temp * 1.8 + 32));
      document.querySelector(".temp").innerHTML = temp
    }
    else{
      let temp = document.querySelector(".temp").textContent
      temp = parseFloat(temp);
      temp = Math.round((temp = (temp - 32) * (5 / 9)));
      document.querySelector(".temp").innerHTML = temp
    }
  })
}


measureSwitch()






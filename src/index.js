import './main.scss';

const formEvent = () => {
  let input = document.getElementById("search") 
  let submit = document.querySelector(".submit-btn")
  submit.addEventListener("click", ()=>{

  })
}
const condition = async (city) => {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Accra&units=metric&appid=0679cd364149a5af42457cf2053eb25f'
      )
  const data = await response.json()
  return data

  }catch(err){
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let updates = [];

  try {
    updates =  await condition()
  }catch(err){
    console.log(err.messages)
  }

  let dataContainer = document.querySelector(".data")
  let name = document.createElement('h3')
  let cond = document.createElement('h3')
  let iconArea = document.createElement('div')
  let currentCondition = document.createElement('h3')
  let conditionDesc = document.createElement('p')
  let humidity = document.createElement('p')
  let date = document.createElement('p')
  let weatherImg = document.createElement('img')
  

  name.innerHTML = updates.name 
  cond.innerHTML = updates.main.temp + "°C"
  date.innerHTML = fullTimeStanp()
  weatherImg.src = `http://openweathermap.org/img/wn/${updates.weather[0].icon}.png`
  currentCondition.innerHTML =  updates.weather[0].main
  conditionDesc.innerHTML = updates.weather[0].description
  humidity.innerHTML = `${updates.main.humidity}%`


  iconArea.setAttribute('class', "iconArea")
  iconArea.appendChild(cond)
  iconArea.appendChild(weatherImg)

  dataContainer.appendChild(name)
  dataContainer.appendChild(date)
  dataContainer.appendChild(iconArea)
  dataContainer.appendChild(currentCondition)
  dataContainer.appendChild(conditionDesc)
  dataContainer.appendChild(humidity)
  

console.log(updates.name)

})

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








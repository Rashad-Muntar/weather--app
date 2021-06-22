import './main.scss';


const condition = async () => {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Kumasi&appid=0679cd364149a5af42457cf2053eb25f'
      )
  const data = await response.json()
  return data.we.country

  }catch(err){
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let updates = [];

  try {
    updates =  await condition()
  }catch(err){
    console.log(err)
  }
console.log(updates)
})



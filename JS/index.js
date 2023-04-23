let SearchButton=document.getElementById('SearchButton');
let inputSearch=document.getElementById('inputSearch');
let errorImg=document.querySelector('.errorImg');
let temperaturebox=document.querySelector('.temperature');
let weatherBox=document.getElementById('weather')
let spin=document.getElementById('spin')

SearchButton.addEventListener('click',()=>{
    let city=inputSearch.value;
    SearchButton.style.display='none'
    spin.style.display='block'
   getdata(city)
})

async function getdata(city){
    
    let respons=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=073a4320452fbdc1ad1aeaa181c57b51`);
    let data=await respons.json();
    console.log(data.main);
    SearchButton.style.display='block'
    spin.style.display='none'
    if(data.cod==='404'){
        weatherBox.style.height="350px"
        temperaturebox.style.display='none'
        setTimeout(()=>{
            errorImg.style.display='block'
        },500)
    }else{
        weatherBox.style.height="570px"
        errorImg.style.display='none'
        setTimeout(()=>{
            temperaturebox.style.display='block'
        },500)
        let tempNumber=document.querySelector('.tempNumber');
        let tempdesc=document.querySelector('.tempdesc');
        let humidityNumber=document.querySelector('.humidityNumber');
        let windSpeed=document.querySelector('.windSpeed');
        let weatherimg=document.querySelector('.temperature img')

        switch (data.weather[0].main) {
            case 'Clear':
                weatherimg.src='./images/clear.png'
                break;
        
                case 'Clouds':
                    weatherimg.src='./images/cloud.png'
                    break;

                     case 'Rain':
                        weatherimg.src='./images/rain.png'
                        break;
                        case 'Snow':
                            weatherimg.src='./images/rain.png'
                            break;
                            case 'Haze':
                                weatherimg.src='./images/mist.png'
                                break;
                    default:
                        weatherimg.src=''
        }
        tempNumber.innerHTML=`${parseInt(data.main.temp)}<sup>°C</sup>`
        tempdesc.innerHTML=`${data.weather[0].description}`
        humidityNumber.innerHTML=`${data.main.humidity}%`
        windSpeed.innerHTML=`${parseInt(data.wind.speed)}Km/h`

    }
   
    
}
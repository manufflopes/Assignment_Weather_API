// const apiInfo = {
//     "location": {
//         "name": "Calgary",
//         "region": "Alberta",
//         "country": "Canada",
//         "lat": 51.08,
//         "lon": -114.08,
//         "tz_id": "America/Edmonton",
//         "localtime_epoch": 1712526110,
//         "localtime": "2024-04-07 15:41"
//     },
//     "current": {
//         "last_updated_epoch": 1712525400,
//         "last_updated": "2024-04-07 15:30",
//         "temp_c": 10.0,
//         "temp_f": 50.0,
//         "is_day": 1,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
//             "code": 1003
//         },
//         "wind_mph": 4.3,
//         "wind_kph": 6.8,
//         "wind_degree": 360,
//         "wind_dir": "N",
//         "pressure_mb": 1012.0,
//         "pressure_in": 29.89,
//         "precip_mm": 0.02,
//         "precip_in": 0.0,
//         "humidity": 37,
//         "cloud": 75,
//         "feelslike_c": 10.3,
//         "feelslike_f": 50.5,
//         "vis_km": 24.0,
//         "vis_miles": 14.0,
//         "uv": 2.0,
//         "gust_mph": 8.7,
//         "gust_kph": 14.0
//     }
// }

async function getCurrentWeather(){
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=3aa2382774664d5d8c7213900240704&q=calgary")
    if (!response.ok){
        throw new Error("API error")
    }

    const currentWeather = await response.json()
    return currentWeather
} 


document.addEventListener("DOMContentLoaded", async function(){
    const apiInfo = await getCurrentWeather()

    const weather = document.getElementsByClassName("apiInfo")[0]
const tempInfo = document.createElement("div")
tempInfo.innerHTML = `
    <section class="location">
        <p>${apiInfo.location["name"]} - </p>
        <p>${apiInfo.location["region"]} - </p>
        <p>${apiInfo.location["country"]} - </p>
        <img src="./images/canada.svg"/>
    </section>
    
    <section class="currentWeather">
            <div class="dayNight condition">
                <img src="./images/${Boolean(apiInfo.current["is_day"]) ? "sun.svg" : "moon.svg" }"/>
                <p>${Boolean(apiInfo.current["is_day"]) ? "Day" : "Night" }</p>
            </div>
            <div class="condition">
                <img src="${apiInfo.current.condition.icon}"/>
                <p>${apiInfo.current.condition["text"]}</p>
            </div>
        <div class="current">
            <p><strong>Temperature</strong> ${apiInfo.current["temp_c"]} °C</p> 
            <p><strong>Real Feel</strong> ${apiInfo.current["feelslike_c"]} °C</p>
            <p><strong>Humidity</strong> ${apiInfo.current["humidity"]} %</p>
            <p><strong>Cloud Cover</strong> ${apiInfo.current["cloud"]} %</p>
        </div>
    </section>
    `

weather.append(tempInfo)

})




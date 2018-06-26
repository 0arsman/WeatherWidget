let startDiv = document.createElement("div");
document.body.appendChild(startDiv);
startDiv.setAttribute("class", "startDiv");

let townName = document.createElement("input");
startDiv.appendChild(townName);
townName.setAttribute("type", "text");
townName.setAttribute("placeholder", "Example: 'Minsk'");

let searchTown = document.createElement("input");
startDiv.appendChild(searchTown);
searchTown.setAttribute("type", "button");
searchTown.setAttribute("value", "Search");

let findTown = function () {
    fetch(`https://www.metaweather.com/api/location/search/?query=${townName.value}`)
    .then(r => r.json())

    .then(r => {
        for (let i = 0; i < r.length; i++) {
            let weatherDiv = document.createElement("div");
            document.body.appendChild(weatherDiv);
            weatherDiv.setAttribute("class", "wdiv");
            let h1 = document.createElement("h1");
            weatherDiv.appendChild(h1);
            let h2 = document.createElement("h2");
            weatherDiv.appendChild(h2);
            let h3 = document.createElement("h3");
            weatherDiv.appendChild(h3);
            h1.innerHTML = r[i].title;
            let img = document.createElement("img");
            weatherDiv.appendChild(img);
            fetch(`https://www.metaweather.com/api/location/${r[i].woeid}/`)
                .then(r => r.json())
                .then(r => r.consolidated_weather[0])
                .then(r => {h2.innerHTML = `${Math.round(r.the_temp)} °C`;
                            h3.innerHTML = `${Math.round(r.wind_speed)} m/h`;
                            img.src=`https://www.metaweather.com/static/img/weather/${r.weather_state_abbr}.svg`;})

        }
    })

townName.value = ''
}

searchTown.addEventListener("click", function() {
    findTown()
})

townName.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        findTown()
}})
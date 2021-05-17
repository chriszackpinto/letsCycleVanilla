"use strict:";

window.addEventListener("load", () => {
  let tempDeg = document.querySelector(".tempDeg");
  let tempDes = document.querySelector(".tempDes");
  let tempIcon = document.querySelector(".tempIcon");
  let tempSec = document.querySelector(".tempSec");
  let tempMain = document.querySelector(".temperature");
  const tempSpan = document.querySelector(".tempSec span");

  const windComp = document.querySelector(".wind-compass");
  const windDir = document.querySelector(".windDir");

  const tides = document.querySelector(".tides");

  if (
    navigator.geolocation.getCurrentPosition((position) => {
      longi = position.coords.longitude;
      lati = position.coords.latitude;
      console.log(lati, longi);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=7797f19d8e620a623448b1a631d4c946&units=metric
      `;

      fetch(api)
        .then((response2) => {
          return response2.json();
        })
        .then((data2) => {
          console.log(data2);
          const tempTemp = data2.main.temp;
          tempDeg.textContent = tempTemp;
          tempDes.textContent = data2.weather[0].main;

          const icon = data2.weather[0].icon;
          tempIcon.src = `./icons/${icon}.png`;

          let farenheit = Math.round(((9 / 5) * tempTemp + 32) * 10) / 10;

          tempMain.onclick = () => {
            if (tempSpan.textContent === "C") {
              tempSpan.textContent = "F";
              tempDeg.textContent = farenheit;
            } else {
              tempSpan.textContent = "C";
              tempDeg.textContent = tempTemp;
            }
          };

          let windSpeed = data2.wind.speed;
          let windDegree = data2.wind.deg;

          let val = Math.floor(windDegree / 22.5 + 0.5);
          const arr = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
          ];

          let windCard = arr[val % 16];
          windDir.textContent = `${windSpeed} MTR/S FROM ${windCard}`;

          windComp.style.transform = `rotate(${windDegree}deg)`;
        });

      // New API - stormglass (Public key on purpose)

      fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${lati}&lng=${longi}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "16b72906-b722-11eb-849d-0242ac130002-16b72988-b722-11eb-849d-0242ac130002",
          },
        }
      )
        .then((response) => response.json())
        .then((jsonData) => {
          const data = jsonData.data.slice(0, 3);
          console.log(jsonData);
          tides.innerHTML = ``;
          data.map((tide) => {
            const qTime = new Date(tide.time);
            const html = ` <div class="card">
                     <h4 class="time">${qTime.getHours()}:${qTime.getMinutes()}</h4>
                     <h3 class="state">${tide.type} Tide</h3>
                     <h4 class="height">${tide.height.toFixed(2)}m</h4>
               </div>`;

            tides.insertAdjacentHTML(`beforeend`, html);
          });
        });
    })
  );
});

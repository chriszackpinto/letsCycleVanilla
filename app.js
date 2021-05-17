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

  let tide1 = document.getElementById("tide1");
  let tide2 = document.getElementById("tide2");
  let tide3 = document.getElementById("tide3");
  let tide4 = document.getElementById("tide4");

  let time1 = document.getElementById("time1");
  let time2 = document.getElementById("time2");
  let time3 = document.getElementById("time3");
  let time4 = document.getElementById("time4");

  let state1 = document.getElementById("state1");
  let state2 = document.getElementById("state2");
  let state3 = document.getElementById("state3");
  let state4 = document.getElementById("state4");

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

      // // tide
      // fetch(
      //   `https://tides.p.rapidapi.com/tides?latitude=${lati}&longitude=${longi}&duration=1440&interval=60`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-rapidapi-key":
      //         "0f1a47ebecmsh7b713ebb8402e84p1fdd6djsnc9b4d1524ce5",
      //       "x-rapidapi-host": "tides.p.rapidapi.com",
      //     },
      //   }
      // )
      //   .then((response) => {
      //     console.log(response);
      //     const data = response.json();
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });

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
      // .then((response1) => {
      //     return response1.json();
      //   })
      //   .then((data1) => {
      //     console.log(data1);
      // .then((response) => {
      //   const data = response.json();
      //   console.log(data);
      //   //     data.map((tide) => {
      //   //       tides.innerHTML = ``;
      //   //       const qTime = new Date(tide.time);
      //   //       const html = ` <div class="card">
      //   //       <h4 class="time">${qTime.getHours()}:${qTime.getMinutes()}</h4>
      //   //       <h3 class="state">${tide.type}</h3>
      //   //       <h4 class="height">${tide.height}</h4>
      //   // </div>`;

      //   //       tides.insertAdjacentHTML(`beforeend`, html);
      //   //     });
      // });

      // Do something with response data.

      // <div class="card first">
      //     <h3 id="state1">Loading ... !</h3>
      //     <h4 id="time1">Loading ... !</h4>
      //   </div>
      // fetch(
      //   `https://tides.p.rapidapi.com/tides?latitude=${lati}&longitude=${longi}&duration=1440&interval=60`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "x-rapidapi-key":
      //         "0f1a47ebecmsh7b713ebb8402e84p1fdd6djsnc9b4d1524ce5",
      //       "x-rapidapi-host": "tides.p.rapidapi.com",
      //     },
      //   }
      // )
      //   .then((response1) => {
      //     return response1.json();
      //   })
      //   .then((data1) => {
      //     console.log(data1);

      //     time1.textContent = data1.extremes[0].datetime.slice(11, 19);
      //     time2.textContent = data1.extremes[1].datetime.slice(11, 19);
      //     time3.textContent = data1.extremes[2].datetime.slice(11, 19);

      //     state1.textContent = data1.extremes[0].state;
      //     state2.textContent = data1.extremes[1].state;
      //     state3.textContent = data1.extremes[2].state;
      //   })

      //   .catch((err) => {
      //     console.error(err);
      //   });
    })
    // EndIf
  );
});

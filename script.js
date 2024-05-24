//Getting Reference
const input = document.querySelector("#searchInput");
const btn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const mainDiv = document.querySelector(".main-content");
const temp = document.querySelector("#temp");
const tempImage = document.querySelector("#temp-img");
const cloud1 = document.querySelector("#cloud1");
const cloud2 = document.querySelector("#cloud2");

//Functions
btn.addEventListener("click", getData);

function getData() {
  let apikey = "f1474510ca6466056790ad4ee1190820";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        let img = createElem();
        populateData(data, img);
        input.value = "";
      } else {
        console.error("Some thing is not right");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function createElem() {
  const img = document.createElement("img");
  img.src = ``;
  img.id = "cloud-img";
  const existingImg = document.querySelector("#cloud-img");
  if (existingImg) {
    existingImg.remove();
  }
  cloud2.insertAdjacentElement("afterend", img);
  return img;
}

function populateData(data, img) {
  const tempinC = (data.main.temp - 273.15).toFixed(2);
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  const cloudData = data.weather[0].description;
  cityName.textContent = `${data.name}`;
  temp.textContent = `${tempinC}°C`;
  img.src = iconUrl;
  cloud1.textContent = `${data.weather[0].main}`;
  cloud2.textContent = `${
    cloudData.charAt(0).toUpperCase() + cloudData.slice(1)
  }`;

  tempImg(tempinC);
}

function tempImg(tempinC) {
  if (tempinC > 0 && tempinC < 15) {
    tempImage.style.display = "block";
    tempImage.src = `./Pics/lowtemp.png`;
    console.log(`${tempinC} Temp low`);
  } else if (tempinC >= 15 && tempinC < 30) {
    tempImage.style.display = "block";
    tempImage.src = `./Pics/Mediumtemp.png`;
    console.log(`${tempinC} Temperature high`);
  } else {
    tempImage.style.display = "block";
    tempImage.src = `./Pics/hightemp.png`;
  }
}

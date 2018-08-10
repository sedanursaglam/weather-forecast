$(function() {
  createCards(1);
  setDay();
  currentWeather();
  currentDayTempandDesc();
  updateClock();

  $("#button-1").click(function() {
    clear();
    createCards(1);
    setDay();
    currentWeather();
    currentDayTempandDesc();
  });
  $("#button-2").click(function() {
    clear();
    createCards(3);
    setDay();
    currentWeather();
    currentDayTempandDesc();
  });
  $("#button-3").click(function() {
    clear();
    createCards(5);
    setDay();
    currentWeather();
    currentDayTempandDesc();
  });
});

function createCards(sizeOfCard) {
  for (i = 1; i <= sizeOfCard; i++) {
    createCard(i, sizeOfCard);
  }
}

function createCard(i, sizeOfCard) {
  let newDiv = document.createElement("div");
  newDiv.id = "card-" + i;
  newDiv.className = "style";
  let cardDiv = document.getElementById("card");
  cardDiv.appendChild(newDiv);
  newDiv.style.background =
    "linear-gradient(rgba(0, 0, 0, 0.726), rgba(255, 255, 255, 0.726))";
  newDiv.style.width = calculateWidth(sizeOfCard);

  let newTitle = document.createElement("div");
  newTitle.id = "title-" + i;
  newTitle.className = "small-title";
  newDiv.appendChild(newTitle);

  let newImage = document.createElement("div");
  newImage.id = "imagle-" + 1;
  newDiv.appendChild(newImage);
  newImage.style.width = imageWidth(sizeOfCard);
  newImage.style.height = imageHeight(sizeOfCard);

  let newIcon = document.createElement("img");
  newIcon.id = "icon-" + i;
  newImage.appendChild(newIcon);
  newIcon.style.width = "100%";
  newIcon.style.height = "100%";
  newImage.style.margin = imageMargin(sizeOfCard);

  let newTemp = document.createElement("div");
  newTemp.id = "temp-" + i;
  newTemp.className = "degree";
  newDiv.appendChild(newTemp);
  newTemp.style.fontSize= tempFontsize(sizeOfCard);

  let newComment = document.createElement("div");
  newComment.id = "comment-" + i;
  newComment.className = "comment";
  newDiv.appendChild(newComment);
  newDiv.style.left = "auto";

  let newId=document.getElementById("card-1");
  newId.style.margin=idMargin(sizeOfCard);

  switch (sizeOfCard) {
    case 1:
    //   newDiv.style.margin = " 0 0 0 35%";
      let newHumidity = document.createElement("div");
      newHumidity.id = "humidity";
      newHumidity.className = "text";
      newDiv.appendChild(newHumidity);

      let newWind = document.createElement("div");
      newWind.id = "wind";
      newWind.className = "text";
      newDiv.appendChild(newWind);

      let newPressure = document.createElement("div");
      newPressure.id = "pressure";
      newPressure.className = "text";
      newDiv.appendChild(newPressure);

      newImage.style.float = "left";

      newTemp.style.float = "left";
      newTemp.style.margin = "15% 11% 0 11%";
    //   newTemp.style.fontSize = "4vw";

      newComment.style.clear = "left";
    case 3:
    //   newIcon.style.margin = "0 0 0 17% ";
    //   newTemp.style.fontSize = "3vw";
    case 5:
    newIcon.style.margin = "0 0 0 12% "
    // newTemp.style.fontSize = "3vw";
    // newTemp.style.margin="15% 0 0 0"
  }
}

function calculateWidth(sizeOfCard) {
  if (sizeOfCard == 5) {
    return "19%";
  } else if (sizeOfCard == 3) {
    return "25%";
  } else if (sizeOfCard == 1) {
    return "30%";
  }
}

function imageWidth(sizeOfCard) {
  switch (sizeOfCard) {
    case 1:
      return "42%";
    case 3:
      return "75%";
    default:
      return "80%";
  }
}
function imageHeight(sizeOfCard) {
  switch (sizeOfCard) {
    case 1:
      return "35%";
    case 3:
      return "50%";
    default:
      return "40%";
  }
}

function tempFontsize(sizeOfCard){
    switch(sizeOfCard){
        case 1:
        return "4vw"
        default: 
        return "3vw"
    }
    
}

function imageMargin(sizeOfCard){
    switch(sizeOfCard){
        case 3:
        return "0 0 0 3.5%";
        case 5:
        return "0 0 0 1%";
    }
}

function idMargin(sizeOfCard){
    switch(sizeOfCard){
        case 1:
        return "0 0 0 36%";
        case 3:
        return "0 0 0 13%";
        case 5:
        return "0 0 0 1%";
    }
}

function clear() {
  document.getElementById("card").innerHTML = "";
}

function setDay() {
  let text;
  let currentDay = new Date().getDay();
  let days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  ];
  
  text1 = "Bugün";
  text2 = days[(currentDay + 1) % 7];
  text3 = days[(currentDay + 2) % 7];
  text4 = days[(currentDay + 3) % 7];
  text5 = days[(currentDay + 4) % 7];
  text6=days[currentDay];

  $(".day").html(text6);
  $("#title-1").html(text1);
  $("#title-2").html(text2);
  $("#title-3").html(text3);
  $("#title-4").html(text4);
  $("#title-5").html(text5);
}

function currentWeather() {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=Ankara,tr&units=metric&lang=tr&APPID=056386c7208231bf6491ffc5fb1d7a63",
    function(data) {
      let imageSource = "image/sunny.png";
      let backgroun_img = "default_background";
      let a = data.weather[0].icon;

      switch (a) {
        case "01d":
          imageSource = "image/sunny.png";
          backgroun_img = "clear_sky";
          break;
        case "01n":
          imageSource = "image/moon.png";
          backgroun_img = "nigh_clear_sky";
          break;
        case "02d":
          imageSource = "image/cloudy.png";
          backgroun_img = "sun_clouds";
          break;
        case "02n":
          imageSource = "image/night.png";
          backgroun_img = "night_clouds";
          break;
        case "03d":
          imageSource = "image/cloud.png";
          backgroun_img = "scattered_clouds";
          break;
        case "03n":
          imageSource = "image/cloud.png";
          backgroun_img = "night_scattered_clouds";
          break;
        case "04d":
          imageSource = "image/cloud.png";
          backgroun_img = "overcast_clouds";
          break;
        case "04n":
          imageSource = "image/cloud.png";
          backgroun_img = "night_scattered_clouds";
          break;
        case "09d":
          imageSource = "image/rain.png";
          backgroun_img = "rain_";
          break;
        case "09n":
          imageSource = "image/rain.png";
          backgroun_img = "night_rain_";
          break;
        case "10d":
          imageSource = "image/sunny_rain.png";
          backgroun_img = "rain";
          break;
        case "10n":
          imageSource = "image/night_rain.png";
          backgroun_img = "night_rain";
          break;
        case "11d":
          imageSource = "image/storm.png";
          backgroun_img = "thunderstorm";
          break;
        case "11n":
          imageSource = "image/storm.png";
          backgroun_img = "thunderstorm";
          break;
        case "13d":
          imageSource = "image/snow.png";
          backgroun_img = "snow";
          break;
        case "13n":
          imageSource = "image/snow.png";
          backgroun_img = "night_snow";
          break;
        case "50d":
          imageSource = "image/foggy.png";
          backgroun_img = "mist";
          break;
        case "50n":
          imageSource = "image/foggy.png";
          backgroun_img = "mist";
          break;
      }
      $("#comment-1").html(titleCase(data.weather[0].description));
      $("#temp-1").html(data.main.temp.toFixed(1) + "°");
      $("#icon-1").attr("src", imageSource);
      $("#back").css(
        "backgroundImage",
        "url(background/" + backgroun_img + ".jpeg)"
      );
      $("#humidity").html("Nem: " + data.main.humidity + " %");
      $("#wind").html("Rüzgar: " + data.wind.speed + " m/s");
      $("#pressure").html("Atmosfer Basıncı: " + data.main.pressure + " hPa");
    }
  );
}
function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

function currentDayTempandDesc() {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/forecast?q=Ankara,tr&units=metric&lang=tr&APPID=056386c7208231bf6491ffc5fb1d7a63",
    function(demo) {
      for (i = 0; i < demo.list.length; i = i + 8) {
        let weatherImagle = "image/sunny.png";
        let weatherIcon = demo.list[i].weather[0].icon;

        switch (weatherIcon) {
          case "01d":
            weatherImagle = "image/sunny.png";
            break;
          case "01n":
            weatherImagle = "image/moon.png";
            break;
          case "02d":
            weatherImagle = "image/cloudy.png";
            break;
          case "02n":
            weatherImagle = "image/night.png";
            break;
          case "03d":
            weatherImagle = "image/cloud.png";
            break;
          case "03n":
            weatherImagle = "image/cloud.png";
            break;
          case "04d":
            weatherImagle = "image/cloud.png";
            break;
          case "04n":
            weatherImagle = "image/cloud.png";
            break;
          case "09d":
            weatherImagle = "image/rain.png";
            break;
          case "09n":
            weatherImagle = "image/rain.png";
            break;
          case "10d":
            weatherImagle = "image/sunny_rain.png";
            break;
          case "10n":
            weatherImagle = "image/night_rain.png";
            break;
          case "11d":
            weatherImagle = "image/storm.png";
            break;
          case "11n":
            weatherImagle = "image/storm.png";
            break;
          case "13d":
            weatherImagle = "image/snow.png";
            break;
          case "13n":
            weatherImagle = "image/snow.png";
            break;
          case "50d":
            weatherImagle = "image/foggy.png";
            break;
          case "50n":
            weatherImagle = "image/foggy.png";
            break;
        }
        switch (i) {
          case 8:
            $("#comment-2").html(
              titleCase(demo.list[i].weather[0].description)
            );
            $("#temp-2").html(demo.list[i].main.temp + "°");
            $("#icon-2").attr("src", weatherImagle);
            break;
          case 16:
            $("#comment-3").html(
              titleCase(demo.list[i].weather[0].description)
            );
            $("#temp-3").html(demo.list[i].main.temp + "°");
            $("#icon-3").attr("src", weatherImagle);
            break;
          case 24:
            $("#comment-4").html(
              titleCase(demo.list[i].weather[0].description)
            );
            $("#temp-4").html(demo.list[i].main.temp + "°");
            $("#icon-4").attr("src", weatherImagle);
            break;
          case 32:
            $("#comment-5").html(
              titleCase(demo.list[i].weather[0].description)
            );
            $("#temp-5").html(demo.list[i].main.temp + "°");
            $("#icon-5").attr("src", weatherImagle);
            break;
        }
      }
    }
  );
  function titleCase(a) {
    let splitStr = a.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }
}

function updateClock(){
    let dt= new Date();
    var s = "";
    let d = "";
   
    s += (10 > dt.getHours() ? "0" : "") + dt.getHours() + ":";
    s += (10 > dt.getMinutes() ? "0" : "") + dt.getMinutes();
    
    d += (10 > dt.getDay() ? "0" : "") + dt.getDay() + "/";
    d += (10 > dt.getMonth() ? "0" : "") + dt.getMonth() + "/";
    d += (10 > dt.getFullYear() ? "0" : "") + dt.getFullYear();


    $(".time").html(s);
    $(".date").html(d);
    
} 


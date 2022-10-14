addEventListener("DOMContentLoaded", (e) => {
  const APIkey = "2b835f534a4534f7a45619ae7ede9406";
  const button = document.getElementById("button");
  const input = document.getElementById("inputText");
  const nombreCiudad = document.getElementById("nombreCiudad");
  const temperatura = document.getElementById("temperatura");
  const ciudadBuscada = document.getElementById("ciudadBuscada");
  const sensacionTermica = document.getElementById("sensacionTermica");
  const maxima = document.getElementById("maxima");
  const minima = document.getElementById("minima");
  const humedad = document.getElementById("humedad");
  const presion = document.getElementById("presion");
  const viento = document.getElementById("viento");
  const img = document.getElementById("img");
  let variableIMG = "";  

  const mostrarInfoCiudad = (data) => {
        ciudadBuscada.style.display = "block";
        nombreCiudad.innerHTML = data.name + " " +  data.sys.country;
        temperatura.innerHTML = "<strong>Temperatura:</strong> " + data.main.temp + "°C";
        sensacionTermica.innerHTML = "<strong>Sensación térmica:</strong> " + data.main.feels_like + "°C";
        maxima.innerHTML = "<strong>Max:</strong> " + data.main.temp_max + "°C";
        minima.innerHTML = "<strong>Min:</strong> " + data.main.temp_min + "°C";
        humedad.innerHTML = "<strong>Humedad:</strong> " + data.main.humidity + "%";
        presion.innerHTML = "<strong>Presión atmosférica:</strong> " + data.main.pressure;
        viento.innerHTML = "<strong>Velocidad del viento:</strong> " + data.wind.speed + " KM/H";
        
        let idIcono = data.weather[0].id;
        
        switch(true){
          case idIcono >= 200 && idIcono <= 232:
            variableIMG = "tormenta"
            break;
          case idIcono >= 300 && idIcono <= 321:
            variableIMG = "llovizna"
            break;
          case idIcono >= 500 && idIcono <= 531:
            variableIMG = "lluvia"
            break;
            case idIcono >= 600 && idIcono <= 622:
              variableIMG = "nieve"
              break;
            case idIcono >= 701 && idIcono <= 781:
              variableIMG = "viento"
              break;
            case idIcono == 800:
              variableIMG = "sol"
              break;
            case idIcono >= 801 && idIcono <= 804:
              variableIMG = "nube"
              break;
        }

        img.src = `assets/icons/${variableIMG}.png`;
  }

  if (localStorage.getItem('ciudadGuardada')){
    mostrarInfoCiudad(JSON.parse(localStorage.getItem('ciudadGuardada')))
  }
  button.addEventListener("click", (e) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}&units=metric&lang=es`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if(data.cod == "404" || data.cod == "400"){
          return
        }
        let ciudadLocal = JSON.stringify(data);
        localStorage.setItem('ciudadGuardada', ciudadLocal);
        mostrarInfoCiudad(data);
      })

      .catch((err) => {
        console.log("Respuesta incorrecta");
      })
  });
  
});

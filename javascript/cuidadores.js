
const btnBuscador = document.getElementById('btn-buscador');

btnBuscador.addEventListener('click', () => {
    const cuidadoresEncontrados = document.getElementById('idprueba2');
    cuidadoresEncontrados.innerHTML = ``;
    const ciudadBuscada = document.getElementById('ciudadBuscada').value;

    new Promise((resolve,reject) => {
        setTimeout(() => {           
            for (let i=0; i<localStorage.length; i++) {
                let clave = localStorage.key(i);
                let userIngresado = localStorage.getItem(clave);
                let usuarioObj = JSON.parse(userIngresado);
                if (ciudadBuscada == usuarioObj.ciudad) {
                    let div = document.createElement("div");
                    div.classList.add('cuidador');
                    div.innerHTML = `   <a href="">
                                            <img class="fotoCuidador" src="../multimedia/sabrina rojas.jpg" alt="Error al cargar la imagen">
                                        </a>
                                        <div class="infoCuidador">
                                            <h2>${usuarioObj.nombre} ${usuarioObj.apellido}</h2>
                                            <ul class="caract">
                                                <li>Vive en ${usuarioObj.ciudad}</li>
                                                <li>Tiene 25 años</li>
                                                <li>Estudiante de Medicina</li>
                                            </ul>
                                        </div>
                                    `
                    cuidadoresEncontrados.appendChild(div);
                }
            }
        }, 3000);
    })

    fetch('../json/users.json')
    .then(response => response.json())
    .then(dataUsers => {
        dataUsers.forEach((usuario) => {
            if (ciudadBuscada == usuario.ciudad) {
                let div = document.createElement('div');
                div.classList.add('cuidador');
                div.innerHTML = `   <a href="">
                                        <img class="fotoCuidador" src="../multimedia/Juan Roman.jpg" alt="Error al cargar la imagen">
                                    </a>
                                    <div class="infoCuidador">
                                        <h2>${usuario.nombre} ${usuario.apellido}</h2>
                                        <ul class="caract">
                                            <li>Vive en ${usuario.ciudad}</li>
                                            <li>Tiene 25 años</li>
                                            <li>Estudiante de Medicina</li>
                                        </ul>
                                    </div>
                                `
                cuidadoresEncontrados.append(div);
            }
        });
    }); 
})


// function iniciarMapa() {
//     mapa = new google.maps.Map(document.getElementById('mapa'),{
//         center:{lat:-34.7623683, lng:-58.2231437},
//         zoom: 13
//     });
// }

// iniciarMapa();

let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(
    instructionsElement
  );
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap;
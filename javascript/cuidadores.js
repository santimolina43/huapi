
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
                    geocoder = new google.maps.Geocoder();
                marker = new google.maps.Marker({
                    map,
                  });
                    geocode({address: usuarioObj.direccion+", "+usuarioObj.ciudad})
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
                geocoder = new google.maps.Geocoder();
                marker = new google.maps.Marker({
                    map,
                  });
                geocode({address: usuario.direccion+", "+usuario.ciudad})
            }
        });
    }); 
})


let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const ciudadBuscada = document.getElementById("ciudadBuscada");

  const btnBuscador = document.getElementById("btn-buscador");

  marker = new google.maps.Marker({
    map,
  });

  btnBuscador.addEventListener("click", () => {
    geocode2({ address: ciudadBuscada.value })
  }
  );
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  geocoder
    .geocode(request)
    .then((result) => {
        const { results } = result;
        addMarker(results[0].geometry.location);
        return results;
    })
    .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
    });
}

function geocode2(request) {
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          map.setCenter(results[0].geometry.location);
          console.log(results)
          return results;
        })
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
    }

function addMarker(position) {
    const marker = new google.maps.Marker({
      position,
      map,
    });
}
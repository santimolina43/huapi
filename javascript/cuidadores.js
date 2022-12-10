
const btnBuscador = document.getElementById('btn-buscador');

btnBuscador.addEventListener('click', () => {
    new Promise((resolve,reject) => {
        setTimeout(() => {
            const ciudadBuscada = document.getElementById('ciudadBuscada').value;
            const cuidadoresEncontrados = document.getElementById('idprueba2');
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
})
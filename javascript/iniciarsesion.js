const iniciarSesionPerfil = document.getElementById('iniciarSesionPerfil');
const iniciarSesionPerfil2 = document.getElementById('iniciarSesionPerfil2');

checkSession();

const ingresar = document.getElementById("ingresar");
const arrayClaves = [];
const iniciarSesionInput = document.getElementById("iniciarSesionInput");
let sessionBoo = sessionStorage.getItem('sessionIniciada');

if (sessionBoo != 'true') {
  ingresar.addEventListener("click", (e) => {
    e.preventDefault();
    const emailIngresado = document.getElementById("floatingInput").value; 
    const contraseñaIngresada = document.getElementById("floatingPassword").value;
    const emailDiv = document.getElementById("floatingInput"); 
    const contraseñaDiv = document.getElementById("floatingPassword");
    for (let i=0; i<localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave == emailIngresado) {
            emailDiv.className = "form-control";
            let userIngresado = localStorage.getItem(clave);
            let usuarioObj = JSON.parse(userIngresado);
            if (usuarioObj.contraseña == contraseñaIngresada) {
                setTimeout(() => {
                  sessionStorage.setItem("sessionIniciada",true);
                  checkSession();
                  const modalbackdrop = document.getElementsByClassName('modal-backdrop');
                  modalbackdrop[0].style.display = 'none';
                }, 1500);
                contraseñaDiv.className = "form-control";
                iniciarSesionInput.innerHTML = `
                                <div class="form-floating mb-3">
                                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                  <label for="floatingInput">Email</label>
                                </div>
                                <div class="form-floating">
                                  <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                                  <label for="floatingPassword">Contraseña</label>
                                </div>
                                <div class="form-floating">
                                  <div class="correctBox"> 
                                    <p>Bienvenido ${usuarioObj.nombre}. Inició sesion correctamente.</p>
                                  </div>
                                </div>
                                                `
                i = localStorage.length;
            } else {
                iniciarSesionInput.innerHTML = `
                                <div class="form-floating mb-3">
                                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                  <label for="floatingInput">Email</label>
                                </div>
                                <div class="form-floating">
                                  <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                                  <label for="floatingPassword">Contraseña</label>
                                </div>
                                <div class="form-floating" id="errorBoxID">
                                  <div class="errorBox"> 
                                    <p>El email y/o contraseña son incorrectos. Por favor intenta de nuevo.</p>
                                  </div>
                                </div>
                                                `
                contraseñaDiv.className = "form-control error-form";
            }
        } else {
            iniciarSesionInput.innerHTML = `
                                <div class="form-floating mb-3">
                                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                  <label for="floatingInput">Email</label>
                                </div>
                                <div class="form-floating">
                                  <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                                  <label for="floatingPassword">Contraseña</label>
                                </div>
                                <div class="form-floating" id="errorBoxID">
                                  <div class="errorBox"> 
                                    <p>El email y/o contraseña son incorrectos. Por favor intenta de nuevo.</p>
                                  </div>
                                </div>
                                                `
            emailDiv.className = "form-control error-form";
            contraseñaDiv.className = "form-control error-form";
        }
    }
})
}

/* Cerrar Sesion */
const cerrarSesion = document.getElementById('cerrarSesion');

if (sessionBoo == 'true') {
  if (cerrarSesion !== null && cerrarSesion !== undefined) {
    cerrarSesion.addEventListener('click', () => {
        sessionStorage.setItem("sessionIniciada",false);
        checkSession();
        window.location = '../index.html';
    })
  }
}


/********* FUNCIONES ********/
function checkSession() {
  let sessionBoo = sessionStorage.getItem('sessionIniciada');

  if (sessionBoo === 'true') {
    if (iniciarSesionPerfil !== null && iniciarSesionPerfil !== undefined) {
      iniciarSesionPerfil.innerHTML = `
        <li class="menu__item">
          <a class="nav-link active" aria-current="page"href="pantallas/perfil.html">Mi Perfil</a>
        </li>
                                        `
    }
    if (iniciarSesionPerfil2 !== null && iniciarSesionPerfil2 !== undefined) {
      iniciarSesionPerfil2.innerHTML = `
        <li class="menu__item">
          <a class="nav-link active" aria-current="page"href="perfil.html">Mi Perfil</a>
        </li>
                                        `
    }
    return true;
  } else {
    if (iniciarSesionPerfil !== null && iniciarSesionPerfil !== undefined) {
      iniciarSesionPerfil.innerHTML = `
        <!-- Button trigger modal -->
        <button type="button" class="menu__item sesion__button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Iniciar sesión
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingresa tus datos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="iniciarSesionInput">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email</label>
                      </div>
                      <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                        <label for="floatingPassword">Contraseña</label>
                      </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="ingresar">Iniciar sesión</button>
                    <div class="modal-footer-registrate">
                        <h6>¿No tienes cuenta aun? </h6>
                        <a href="pantallas/registrarme.html"> Registrate</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
                                        `
    }
    if (iniciarSesionPerfil2 !== null && iniciarSesionPerfil2 !== undefined) {
      iniciarSesionPerfil2.innerHTML = `
        <!-- Button trigger modal -->
        <button type="button" class="menu__item sesion__button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Iniciar sesión
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingresa tus datos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="iniciarSesionInput">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email</label>
                      </div>
                      <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                        <label for="floatingPassword">Contraseña</label>
                      </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="ingresar">Iniciar sesión</button>
                    <div class="modal-footer-registrate">
                        <h6>¿No tienes cuenta aun? </h6>
                        <a href="registrarme.html"> Registrate</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
                                        `
    }
    return false;
  }
}
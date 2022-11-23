const ingresar = document.getElementById("ingresar");
const arrayClaves = [];
const iniciarSesionInput = document.getElementById("iniciarSesionInput");


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
            console.log(usuarioObj);
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
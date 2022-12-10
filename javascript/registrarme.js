class Usuario {
    constructor (email, nombre, apellido, contraseña, direccion, ciudad, provincia, cp) {
        this.nombre = nombre;
        this.email = email;
        this.apellido = apellido;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.cp = cp;
    }
}
const arrayUsuarios = [];

const register = document.getElementById("register");

register.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarUsuario();
})

function agregarUsuario() {
    const nombre = document.getElementById("nombre").value; 
    const apellido = document.getElementById("apellido").value; 
    const email = document.getElementById("inputEmail4").value; 
    const contraseña = document.getElementById("inputPassword4").value; 
    const direccion = document.getElementById("inputAddress").value; 
    const ciudad = document.getElementById("inputCity").value; 
    const provincia = document.getElementById("inputState").value; 
    const cp = document.getElementById("inputZip").value; 
    // let altaCorrecta = true;
    let errores = 0;
    
    for (let i=0; i<localStorage.length; i++) {
        let clave = localStorage.key(i);
        if (clave == email) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ya existe una cuenta registrada con ese email.',
                showConfirmButton: false,
                timer: 3000
              })
            errores = errores + 1;
        }
    }

    const divNombre = document.getElementById("nombre");
    const divApellido = document.getElementById("apellido");
    const divEmail = document.getElementById("inputEmail4");
    const divContraseña = document.getElementById("inputPassword4");
    const divDireccion = document.getElementById("inputAddress");
    const divCiudad = document.getElementById("inputCity");
    const divProvincia = document.getElementById("inputState");
    const divCP = document.getElementById("inputZip");

    if (nombre == "") {
        divNombre.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divNombre.className = "form-control";
    }
    if (apellido == "") {
        divApellido.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divApellido.className = "form-control";
    }
    if (email == "") {
        divEmail.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divEmail.className = "form-control";
    }
    if (contraseña == "") {
        divContraseña.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divContraseña.className = "form-control";
    }
    if (direccion == "") {
        divDireccion.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divDireccion.className = "form-control";
    }
    if (ciudad == "") {
        divCiudad.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divCiudad.className = "form-control";
    }
    if (provincia == "") {
        divProvincia.className = "form-select error-border";
        errores = errores + 1;
    } else {
        divProvincia.className = "form-control";
    }
    if (cp == "") {
        divCP.className = "form-control error-border";
        errores = errores + 1;
    } else {
        divCP.className = "form-control";
    }

    console.log(errores);
    if (errores == 0) {
        const nuevoUser = new Usuario (email, nombre, apellido, contraseña, direccion, ciudad, provincia, cp);
        arrayUsuarios.push(nuevoUser);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Te registraste exitosamente',
            showConfirmButton: false,
            timer: 3000
          })
        register.reset();
        const userJSON = JSON.stringify(nuevoUser);
        localStorage.setItem(nuevoUser.email, userJSON);

    }
    console.log(arrayUsuarios);
    console.log(errores);
} 
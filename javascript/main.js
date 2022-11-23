class usuario {
    constructor (user, nombre, apellido, password, edad, sexo, ciudad) {
        this.user = user;
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.edad = edad;
        this.sexo = sexo;
        this.ciudad = ciudad;
        this.altaCorrecta = false;

    }
}

class mascota {
    constructor (animal, nombre, sexo, edad) {
        this.animal = animal;
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
    }
}
const arrayUsuarios = [];
const arrayMascotas = [];
altaUsuario ("juan123","Juan","Pelotas","12345",25,"M","Berazategui");
altaUsuario ("santimolina43","Santi","Molina","funca",25,"M","Berazategui");

let sesionIniciada = iniciarSesion_Registrarme();

if (sesionIniciada === true) {
    let petMenu;
    do {
        let opc3 = prompt('¿Desea cargar una mascota?\n A. SI \n B. NO');
        if (opc3 == 'A' || opc3 == 'a') {
            let petContinue = true;
            do {
                altaMascota ();
                let opc4 = prompt('¿Desea cargar otra?\n A. SI \n B. NO');
                if (opc4 == 'A' || opc4 == 'a') {
                    petContinue = true;
                } else if (opc4 == 'B' || opc4 == 'b') {
                    petContinue = false;
                } else {
                    alert("Opcion invalida.");
                    petContinue = false;
                }
            } while (petContinue)
            console.log("Sus mascotas cargadas son las siguientes:");
            arrayMascotas.forEach(mascotax => console.log(mascotax));
        } else if (opc3 == 'B' || opc3 == 'b') {
            petMenu = false;
        } else {
            alert("Opcion invalida.");
            petMenu = true;
        }
    } while (petMenu) 
}

/********* FUNCIONES **********/
function iniciarSesion_Registrarme() {
    let opc = prompt('Ingrese la opcion deseada: \n A. Iniciar Sesion \n B. Registrarme');

    while (opc != 'A' && opc != 'a' && opc != 'B' && opc != 'b') {
        alert("Opción invalida. Por favor ingrese una opción válida (A/B)");
        opc = prompt('Ingrese la opcion deseada: \n A. Iniciar Sesion \n B. Registrarme');
    }
    
    if (opc == 'A' || opc == 'a') {
        let logInUser = prompt('Ingrese su usuario:');
        let logInPass = prompt('Ingrese su contraseña:');
        if (arrayUsuarios.some(usuariox => usuariox.user === logInUser)) {
            if (arrayUsuarios.some(usuariox => usuariox.password === logInPass)) {
                for (let usuariox of arrayUsuarios) {
                    if (usuariox.user === logInUser) {
                        alert("Bienvenido "+usuariox.nombre+".\nInició sesion correctamente.");
                        return true;
                    }
                }
            } else {
                alert("Contraseña incorrecta.");
                return false;
            }
        } else {
            alert("Nombre de usuario incorrecto.");
            return false;
        }
    } else if (opc == 'B' || opc == 'b') {
            let regNombre = prompt('Ingrese su nombre:');
            let regApellido = prompt('Ingrese su apellido:');
            let regEdad = parseInt(prompt('Ingrese su edad:'));
            let regSexo = prompt('Ingrese su sexo (M/F):');
            let regCiudad = prompt('Ingrese la ciudad donde vive:');
            let continuar = false;
            let regUser;
            let regPass;
            do {
                regUser = prompt('Eliga su nombre de usuario:');
                regPass = prompt('Ingrese su nueva contraseña:');
                for (let usuariox of arrayUsuarios) {
                    if (usuariox.user === regUser) {
                        alert("El nombre de usuario "+usuariox.user+" ya existe, elija otro.");
                        continuar = true;
                    } else {
                        continuar = false;
                    }
                }
            } while (continuar);
            altaUsuario(regUser, regNombre, regApellido, regPass, regEdad, regSexo, regCiudad);
            let opc2 = prompt('¿Desea iniciar sesion?\n A. SI \n B. NO');
            if (opc2 == 'A' || opc2 == 'a') {
                iniciarSesion_Registrarme();
            } else if (opc2 == 'B' || opc2 == 'b') {
                alert("Registro exitoso. Adiós.");
                return false;
            }
    } else {
        alert ("ERROR");
        return false;
    }
}

    
function altaUsuario (user, nombre, apellido, password, edad, sexo, ciudad) {
    let newuser = new usuario (user, nombre, apellido, password, edad, sexo, ciudad);
    arrayUsuarios.push(newuser);
}

function altaMascota () {
    let opcAnimal = prompt('Ingrese el tipo de animal:\nA. Gato\nB. Perro\nC. Ave\nD. Otro');
    let petAnimal;
    switch (opcAnimal) {
        case "A":
            petAnimal = "Gato";
            break;
        case "B":
            petAnimal = "Perro";
            break;
        case "C":
            petAnimal = "Ave";
            break;
        case "D":
            petAnimal = prompt("Ingrese el tipo de animal:");
            break;
        default:
            alert("Opción incorrecta.");
            altaMascota();
    } 
    let petNombre = prompt('Ingrese el nombre de su mascota:');
    let petEdad = parseInt(prompt('Ingrese la edad de su mascota:'));
    let petSexo = prompt('Ingrese el sexo de su mascota (M/F):');
    while (petSexo != 'm' && petSexo != 'M' && petSexo != 'f' && petSexo != 'F') {
        alert("Sexo desconocido.")
        petSexo = prompt('Ingrese el sexo de su mascota (M/F):');
    }
    let newpet = new mascota (petAnimal, petNombre, petSexo, petEdad);
    arrayMascotas.push(newpet);
}
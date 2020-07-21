//ocultar modal al registrarse y mostrar frase "registrado correctamente"
//quitar boton registrarse al estar logeado
toastr.options.positionClass = 'toast-top-full-width';

//registro de usuario
let botonRegistro = document.querySelector("#botonRegistro")
let botonRegistroModal = document.querySelector("#botonRegistroModal");
botonRegistroModal.addEventListener("click", function() {
    let emailRegistro = document.querySelector("#emailRegistro").value;
    let passRegistro = document.querySelector("#passRegistro").value;

    auth.createUserWithEmailAndPassword(emailRegistro, passRegistro).then(cred => {
        //toastr.success('Te has registrado correctamente', cred.user)
        
    })
    //console.log(emailRegistro, passRegistro);
});


//salir
let logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //console.log("El usuario ha salido de la aplicación");
    })
});

//inicio sesion - otra forma
let inicioSesion = document.querySelector("#inicioSesion");
inicioSesion.addEventListener("submit", (e) => {

    e.preventDefault();
    let emailLogin = document.querySelector("#emailLogin").value;
    let passLogin = document.querySelector("#passLogin").value;

    auth.signInWithEmailAndPassword(emailLogin, passLogin).then(cred => {
        console.log(cred.user);
    })
})

//status del usuario
let inicioSesionArray = document.querySelectorAll("#inicioSesion");
let mapa = document.querySelector("#miMapa");
let formulario = document.querySelector("#formulario");
auth.onAuthStateChanged(user => {
    if(user) {
        console.log("El usuario ha iniciado sesión; ", user);
        toastr["success"]("Has iniciado sesión correctamente");
        inicioSesionArray.forEach(item => item.style.display = "none");
        logout.style.display = "block";
        botonRegistro.style.display = "none";
        mapa.style.display = "block";
        formulario.style.display = "block";
    } else {
        console.log("No has iniciado sesión");
        inicioSesionArray.forEach(item => item.style.display = "block");
        logout.style.display = "none";
        mapa.style.display = "none";
        formulario.style.display = "none";
    }
});



/*const setupUI = (user) => {
    if(user) {
        inicioSesionArray.forEach(item => item.style.display = "none");
        logout.style.display = "block";
    } else {
        inicioSesionArray.forEach(item => item.style.display = "none");
        logout.style.display = "block";
    }
}*/
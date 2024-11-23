document.getElementById("btn_registrarse").addEventListener("click",register);
document.getElementById("btn_iniciar_sesion").addEventListener("click",iniciarSesion);
window.addEventListener("resize", anchoPage);

//declaración de variables
var Contenedor_login_register = document.querySelector(".contenedor_login_register");
var formulario_login = document.querySelector(".formulario_login");
var Formulario_register = document.querySelector(".formulario_register");
var caja_trasera_login = document.querySelector(".caja_trasera_login");
var caja_trasera_register = document.querySelector(".caja_trasera_register");

function anchoPage(){
    if(window.innerWidth > 850){
        caja_trasera_login.style.display = "block";
        caja_trasera_register.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.opacity = "1";
        caja_trasera_login.style.display = "block";
        formulario_login.style.display = "block";
        Formulario_register.style.display = "none";
        Contenedor_login_register.style.left = "0px";

    }
}

function register(){
    if(window.innerWidth > 850){
        Formulario_register.style.display = "block";
        Contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    }else{
        Formulario_register.style.display = "block";
        Contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
    

}

function iniciarSesion(){
    if(window.innerWidth > 850){
        Formulario_register.style.display = "none";
        Contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    }else{
        formulario_login.style.display = "block";
        Contenedor_login_register.style.left = "0px";
        Formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
    
}

function validarUsuario(usuario, contrasena) {
    // Limpiar el localStorage antes de hacer la validación, si es necesario
    localStorage.clear(); // Limpiar cualquier valor previo almacenado
    
    if (usuario === "prueba" && contrasena === "123") {
        localStorage.setItem('ingresoComoInvitado', 'false'); // Indica que es un usuario autenticado
        localStorage.setItem('formularioMostrado', 'false'); // Resetea el estado de formulario
        localStorage.setItem('MostrarPerfil', 'true');
        window.location.href = "../Cremositos/inicio.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

function ingresarComoInvitado() {
    // Limpiar el localStorage antes de hacer el ingreso como invitado
    localStorage.clear(); // Limpiar cualquier valor previo almacenado
    
    localStorage.setItem('ingresoComoInvitado', 'true'); // Indica que es un invitado
    localStorage.setItem('formularioMostrado', 'false'); // Marca que el formulario aún no ha sido mostrado
    localStorage.setItem('MostrarPerfil', 'false');
    window.location.href = "../Cremositos/inicio.html";
}



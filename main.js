let habitaciones = []

fetch("./habitaciones.json")
    .then(response => response.json())
    .then(data => {
        habitaciones = data;
        cargarHabitaciones(habitaciones);
    })


//lo que llamamos del DOM para habitaciones:
const contenedorHabitaciones = document.querySelector("#contenedor-habitaciones")
let botonesAgregar = document.querySelectorAll(".habitacion-agregar") //Boton Agregar
const numerito = document.querySelector("#numerito");
let habitacionesEnCarrito 
const carritoGuardado = JSON.parse (localStorage.getItem("habitaciones-en-carrito"))

const actualizarNumeroCarrito = () => {
    let nuevoNumero = habitacionesEnCarrito.reduce((acc, habitacion) => acc + habitacion.cantidad, 0)
    numerito.innerText = nuevoNumero 
}

if(carritoGuardado){
    habitacionesEnCarrito  = carritoGuardado
    actualizarNumeroCarrito()
}else{
    habitacionesEnCarrito  = []
}


const agregarAlCarrito = (e) => {

    //Pop up
    Toastify({
        text: "Habitación Agregada con exito",
        duration: 2000,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          borderRadius: "5px",
          textTransform: "uppercase",
          fontSize: "20px",
          textAlign: "center",
          background: "rgb(254, 193, 193)",
        
        },
        offset: {
            y: '2 rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id
    const habitacionAgregado = habitaciones.find(habitacion => habitacion.id === idBoton)

    if(habitacionesEnCarrito.some(habitacion => habitacion.id === idBoton)){
        const index = habitacionesEnCarrito.findIndex(habitacion => habitacion.id === idBoton)
        habitacionesEnCarrito[index].cantidad++
    } else {
        habitacionAgregado.cantidad = 1
        habitacionesEnCarrito.push(habitacionAgregado)
    }
    actualizarNumeroCarrito()
    
    localStorage.setItem("habitaciones-en-carrito", JSON.stringify(habitacionesEnCarrito))
}

//Boton Agregar
const cargarBotonesAgregar = () => {
    botonesAgregar = document.querySelectorAll(".habitacion-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

//Habitaciones en Carrito en Local Storage
const habitacionesEnCarritoLS  = JSON.parse(localStorage.getItem("habitaciones-en-carrito"))

if (habitacionesEnCarritoLS){
    habitacionesEnCarrito = habitacionesEnCarritoLS
    actualizarNumeroCarrito()
}else{
    habitacionesEnCarrito = []
}


//funcion cargar habitaciones
const cargarHabitaciones = (habitaciones) => {
    
    //contenedorHabitaciones.innerHTML = " "

    habitaciones.forEach(habitacion => {

        const div = document.createElement ("div")
        div.classList.add("habitacion")
        div.innerHTML = `

        <img class="habitacion-imagen rounded float-start" src="${habitacion.imagen}" alt="">
       
        <div class="col-md-6 themed-grid-col habitacion-detalles">
            <h3 class="habitacion-titulo">${habitacion.nombre}</h3>
            <p class="habitacion-precio"><span>Precio: </span>${habitacion.precio}</p>
            <p class="habitacion-descripcion"><span> -> </span>${habitacion.descripcion}</p>

            <button type="button" class="habitacion-agregar btn btn-success" id=${habitacion.id}>Agregar al Carrito</button>

        </div>
        `
        contenedorHabitaciones.append(div)

    })
    cargarBotonesAgregar ()

}

cargarHabitaciones(habitaciones)


//queremos saber si hay algo en el carrito, traemos la info del local storage
let habitacionesEnCarritoNuevo = localStorage.getItem("habitaciones-en-carrito")
habitacionesEnCarritoNuevo = JSON.parse(habitacionesEnCarritoNuevo)

const reservaVacio = document.querySelector("#reserva-vacio")
const reservaHabitaciones = document.querySelector("#reserva-habitaciones")
const reservaAcciones = document.querySelector("#reserva-acciones")
const reservaComprado = document.querySelector("#reserva-comprado")

const total = document.querySelector(".total-final")
let eliminarReserva = document.querySelectorAll(".btn-eliminar")
const botonVaciarCarrito = document.querySelector("#btn-vaciar")
const comprar = document.querySelector("#btn-comprar")


reservaHabitaciones.innerHTML = ""


//Precio Final
const actualizarPrecioTotal = () => {
    const totalCalculado = habitacionesEnCarritoNuevo.reduce((acc, habitacion) => acc + (habitacion.precio * habitacion.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}


//Eliminar
const eliminarHabitacion = (e) => {

    Toastify({
        text: "Habitación eliminada",
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
      }).showToast()

    //e.preventDefault()
    const idButton = e.target.id
    const index = habitacionesEnCarritoNuevo.findIndex(habitacion => habitacion.id === idButton)

    habitacionesEnCarritoNuevo.splice(index, 1)
    cargarHabitacionesCarrito()
    localStorage.setItem("habitaciones-en-carrito", JSON.stringify(habitacionesEnCarritoNuevo))

}

// Función para eliminar la habitación 
const actualizarBotonesEliminar = () =>{
    eliminarReserva = document.querySelectorAll(".btn-eliminar")

    eliminarReserva.forEach(botonEliminar => {
        botonEliminar.addEventListener("click", eliminarHabitacion)
    })
}


//Habitaciones en Carrito
const cargarHabitacionesCarrito = () => {

    if (habitacionesEnCarritoNuevo && habitacionesEnCarritoNuevo.length > 0){

        reservaVacio.classList.add("disabled")
        reservaHabitaciones.classList.remove("disabled")
        reservaAcciones.classList.remove("disabled")
        reservaComprado.classList.add("disabled")

        const habCarrito = document.querySelectorAll(".reserva-habitacion")
        habCarrito.forEach(elemento => {
            elemento.remove()
        })

        habitacionesEnCarritoNuevo.forEach(habitacion => {
            //div para reserva-habitaciones
            const div = document.createElement("div")
            div.className = "reserva-habitacion"
            
            div.innerHTML = `

            <img class="reserva-habitacion-imagen habitacion-imagen" src="${habitacion.imagen}">
                            
            <ul class="list-group list-group-flush">
                <li class="list-group-item reserva-habitacion-titulo">${habitacion.nombre}</li>
                <li class="list-group-item reserva-habitacion-tipo">Tipo: ${habitacion.tipo}</li>
                <li class="list-group-item reserva-habitacion-descripcion">${habitacion.descripcion} </li>
                <li class="list-group-item">Desayuno Incluido</li>

                <li class="list-group-item reserva-habitacion-cantidad">Cantidad de Habitaciones: ${habitacion.cantidad}</li>
                <li class="list-group-item reserva-habitacion-subtotal">SubTotal: $ ${habitacion.precio }</li>
                <li class="list-group-item reserva-habitacion-total">Total: $ ${habitacion.precio * habitacion.cantidad}</li>
            </ul>
            <button type="button" id=${habitacion.id} class="btn-eliminar btn btn-dark">Eliminar Habitación</button>

            `
            reservaHabitaciones.append(div)

        })

    actualizarBotonesEliminar()
    actualizarPrecioTotal()

    }else{
        reservaVacio.classList.remove("disabled")
        reservaHabitaciones.classList.add("disabled")
        reservaAcciones.classList.add("disabled")
        reservaComprado.classList.add("disabled")
    }

}

cargarHabitacionesCarrito()


//Vaciar Carrito
const vaciarCarrito = () => {

    Swal.fire({
        title: '¿Deseas eliminar todas las habitaciones?',
        icon: 'question',
        html: `Se van a borrar ${habitacionesEnCarritoNuevo.reduce((acc, habitacion) => acc + habitacion.cantidad, 0)} habitacion.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            habitacionesEnCarritoNuevo.length = 0
            localStorage.setItem("habitaciones-en-carrito", JSON.stringify(habitacionesEnCarritoNuevo))
            cargarHabitacionesCarrito()
        }
        })
}
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

//comprar
const comprarCarrito = () => {

    habitacionesEnCarritoNuevo.length = 0;
    localStorage.setItem("habitaciones-en-carrito", JSON.stringify(habitacionesEnCarritoNuevo));
    
    Swal.fire({
        icon: 'success',
        text: 'Su compra ha sido realizada con exito!',
        focusConfirm: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#d15d10',
        backdrop: 'rgb(254, 193, 193, 0.4)'
    })

    reservaVacio.classList.add("disabled")
    reservaHabitaciones.classList.add("disabled")
    reservaAcciones.classList.add("disabled")
    reservaComprado.classList.remove("disabled")

}
comprar.addEventListener("click", comprarCarrito);





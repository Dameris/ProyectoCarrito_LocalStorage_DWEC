// SELECTORES
const carrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")

// VARIABLES
let articulosCarrito = []

// LISTENERS
cargarListeners()

function cargarListeners() {
    listaCursos.addEventListener("click", anyadirCurso)
    contenedorCarrito.addEventListener("click", limpiarHTML)
    document.addEventListener("DOMContentLoaded", () => {
        if (localStorage.getItem("carrito")) {
            articulosCarrito = JSON.parse(localStorage.getItem("carrito"))
            carritoHTML()
        }
    })
    vaciarCarrito.addEventListener("click", () => {
        articulosCarrito = []
        carritoHTML()
        limpiarLocalStorage()
    })
}

// FUNCIONES
function anyadirCurso(evento) {
    evento.preventDefault()

    if (evento.target.classList.contains("agregar-carrito")) {
        const curso = evento.target.parentElement.parentElement
        leerDatosCurso(curso)
    }
}

function eliminarCurso(evento) {
    console.log(evento.target)

    if (evento.target.classList.contains("borrar-curso")) {
        console.log("XXXXXX")
        const cursoId = evento.target.getAttribute("data-id")

        articulosCarrito = articulosCarrito.filter((curso) => {
            curso.id = cursoId
        })

        carritoHTML(articulosCarrito)
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }

    const existe = articulosCarrito.some((cursoCarrito) => cursoCarrito.id === infoCurso.id)

    if (existe) {
        articulosCarrito = articulosCarrito.map((cursoCarrito) => {
            if (cursoCarrito.id === infoCurso.id) {
                cursoCarrito.cantidad ++
            }
            return cursoCarrito;
        })
    } 
    else {
        articulosCarrito.push(infoCurso)
    }

    // Almacenar los datos en LocalStorage
    guardarCarritoLocalStorage()

    carritoHTML()
}

function carritoHTML() {
    limpiarHTML()

    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr")

        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `
        
        contenedorCarrito.appendChild(row)
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

function limpiarLocalStorage() {
    localStorage.clear()
}
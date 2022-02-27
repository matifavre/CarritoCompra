//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector ('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina Cursos del Carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {

       articulosCarrito = []; // reseteamos el arreglo

       limpiarHTML(); // Eliminamos todo el HTML

    })
}

// Functions

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursosSeleccionado = e.target.parentElement.parentElement
       
        leerDatosCurso(cursosSeleccionado);

        //console.log(e.target.parentElement.parentElement) // in order to select 2 parent elements (Div Class in it's enterity)
        
    }
    
}

// Elimina un curso del carrito

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del Arreglo de articulosCarrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el Carrito y mostrar HTML
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //create an object with the content of the course
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe) {
        //actualizamos cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso; //retorna el objeto actualizado
            } else{
               return curso; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }
    else {
        //agregamos curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);

    carritoHTML();

}


//Muestra el carrito en el HTML
function carritoHTML(){

    //Limpiar el HTML

    limpiarHTML();


    //Recorre Carrito y recorre HTML

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td>
            <img src= "${imagen}" width ="100">
        </td>

        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>




        `;

        //Agrega el HTML del Carrito en el tbody
        
        contenedorCarrito.appendChild(row);

    });
}

//Elimina los cursos del tbody

function limpiarHTML(){
 
    while(contenedorCarrito.firstChild) {

    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
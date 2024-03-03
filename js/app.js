const boton=document.querySelector('#lista-cursos');
const removeOll=document.getElementById('vaciar-carrito');
const remove=document.querySelector('#carrito');
const view=document.querySelector('#lista-carrito');
let arrayProducto=[];

loadEvent();

function loadEvent(){
    boton.addEventListener('click', addProduct)
    remove.addEventListener('click',removeProduct)
    removeOll.addEventListener('click', () =>{
        arrayProducto=[];
        bifore();
    })
}

function addProduct (e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){

        const infoProduct=e.target.parentElement.parentElement;
        createObject(infoProduct);
        viewHtml();
    };
};

function createObject(object){
    const product={
        id:object.querySelector('a').getAttribute('data-id'),
        img:object.querySelector('img').src,
        nombre:object.querySelector('h4').textContent,
        precio:object.querySelector('.precio span').textContent,
        cantidad:1
    }

    if( arrayProducto.some( element => element.id === product.id ) ) { 
        const cursos = arrayProducto.map( curso => {
             if( curso.id === product.id ) {
                  curso.cantidad++;
                   return curso;
              } else {
                   return curso;
           }
        })
        arrayProducto = [...cursos];
   }  else {
        arrayProducto.push(product)
   }
   viewHtml();
}

function viewHtml () {

    bifore();

    arrayProducto.forEach(element =>{
        const {nombre,precio,cantidad,id} = element;

        const table=document.createElement('tr');

        table.innerHTML=
            `<td><img src=${element.img}></td> 
             <td>${nombre}</td>
             <td>${precio}</td>
             <td>${cantidad}</td>
             <td><a href='#' class='borrar-curso' data-id='${id}''>x</a></td>`
             ;
            view.appendChild(table);
    })
}

function bifore () {
    while(view.firstChild){
        view.removeChild(view.firstChild)
    }
}

function removeProduct (e) {
    if(e.target.classList.contains('borrar-curso')){
        const removeId=e.target.getAttribute('data-id')

        if(arrayProducto.some(element =>element.cantidad > 1)){
            const removeCurse = arrayProducto.map( curso => {
                if(curso.id === removeId) {
                     curso.cantidad--;
                      return curso;
                 } else {
                    return curso;
                }
            })
            arrayProducto=[...removeCurse];
        } else {
            arrayProducto=arrayProducto.filter(element => element.id !== removeId)
        }
    } 
    viewHtml();  
}

class Producto {

    constructor (id,nombre, precio,stock,img,cantidad){
        this.id=id;
        this.nombre=nombre; 
        this.precio=precio;        
        this.stock=stock;
        this.img=img;
        this.cantidad=cantidad || 0;
    }

    sumarIva(){
        return this.precio = Math.round(this.precio * 1.21) ;
    }

    aumentarCantidad(){
        this.cantidad++;
    }

}

class Usuario {
    constructor (nombre, pass){
        this.nombre=nombre;
        this.pass=pass;

    }
}


const usuarios = [] || JSON.parse(localStorage.getItem(usuarios)); 
const productos = [];

productos.push(new Producto(1,"Teclado Logitech Z21", 30, 33,"teclado.jpg"));
productos.push(new Producto(2,"Mouse Kolke ", 18, 52,"mouse.jpg"));
productos.push(new Producto(3,"Monitor Gamer", 110, 10,"monitor.jpg"));
productos.push(new Producto(4,"Auriculares Kolke 27C", 15, 97,"auriculares.jpg"));


console.log(productos)

const carrito = [];

const respuesta2= document.getElementById("respuesta2")
const inputNombre = document.getElementById("nombre");
const inputPass = document.getElementById("contraseña");
const respuesta = document.getElementById("respuesta");
const btn2 = document.getElementById("btnRegistro");
const btn = document.getElementById("btnIngresar");
const carretilla = document.getElementById("carretilla")
const modalCarrito = document.getElementById("modalCarrito");


const crearUsuario = () => {
    let nombre= inputNombre.value;
    let pass = inputPass.value;
    const usuario = new Usuario (nombre, pass);

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    respuesta.innerHTML= "Usuario creado con exito, ya puede iniciar sesion";
    inputNombre.value ="";
    inputPass.value = "";

}

btn2.onclick = () => {crearUsuario()};

// const iniciarSesion = () =>{
//     let nombre = inputNombre.value;
//     let pass = inputPass.value;

//     if(nombre != ""){
//         let userName = usuarios.find(usuarios => usuarios.nombre == nombre);
//         if(pass != ""){
//             let pass = usuarios.find(usuarios => usuarios.pass == nombre);
//         }
//     }

// }



console.log(carrito);

const mostrarTienda = () => {
   
    for (const producto of productos) {
        
        const tienda = document.getElementById("productos")
        let cardProducto = document.createElement("div")
        
        
        cardProducto.innerHTML = ` 
                                    <div class= "container">
                                    <div class="card mb-3 ">
                                    <div class="card-body  prod3 ">
                                        
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <h6 class="card-text"> Precio U$S ${producto.precio}</h6>
                                            <img class="card-img-top" src="img/${producto.img}" alt=${producto.id}>
                                            
                                        </div>
                                        <button class="btn btn-primary mb-3" id="${producto.id}">Agregar al Carrito</button>
                                    <button class="btn btn-primary">Agregar a favoritos</button>
                                    </div>
                                    </div>`;

        tienda.appendChild(cardProducto);     
        document.getElementById(`${producto.id}`).addEventListener('click', () => comprar(producto))                                   
    }


}

function comprar(producto) {
    let compra =carrito.find(objeto =>objeto.nombre === producto.nombre)

    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
        }else{
            alert("No hay mas stock papa")}
        }else{
        carrito.push(producto);
        producto.aumentarCantidad();
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    
}




function cargarCarrito(){
    let carrito2 = JSON.parse(localStorage.getItem('carrito'))

    if(carrito2){
        for (let i = 0; i < carrito.length; i++) {
            carrito2.push(new Producto(carrito2[i].id, carrito2[i].nombre,carrito2[i].precio,carrito2[i].stock,carrito2[i].img,carrito2[i].cantidad))
            
        }

    }
    const verProducto = document.createElement("div")

    for (const producto of carrito2) {
        
        carretilla.appendChild(verProducto);
        verProducto.innerHTML= `
                           <h3> Producto: ${producto.nombre}</h3>
                           <h3> Valor Unitario $ ${producto.precio}</h3>
                           <h3> Cantidad: ${producto.cantidad}</h3>
                           
                           <h3> ________________________________</h3>`; 
    }
    
}

modalCarrito.addEventListener('click', () => cargarCarrito());    

const bienvUsuario = () =>{
    
    
    const bienvenida = document.getElementById("contBienvenida");

    bienvenida.innerHTML = `<h5 class= ""> Bienvenido/a ${inputNombre.value}</h5>
                            `
    
    $('#ModalUsuario').modal('hide')

    }

btn.onclick = () =>{bienvUsuario()};



mostrarTienda();



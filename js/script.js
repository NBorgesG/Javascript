class Producto {

    constructor (nombre, precio,stock,img){
        
        this.nombre=nombre; 
        this.precio=precio;        
        this.stock=stock;
        this.img=img;
        
    }

    sumarIva(){
        return this.precio = Math.round(this.precio * 1.21) ;
    }

    venderProducto(cantidadPedida){
            return this.stock= this.stock - cantidadPedida;
    }

}

class Usuario {
    constructor (nombre, contraseña){
        this.nombre=nombre;
        this.contraseña=contraseña;

    }
}



const productos = [];

productos.push(new Producto("Teclado Logitech Z21", 30, 33,"teclado.jpg"));
productos.push(new Producto("Mouse Kolke ", 18, 52,"mouse.jpg"));
productos.push(new Producto("Monitor Gamer", 110, 10,"monitor.jpg"));
productos.push(new Producto("Auriculares Kolke 27C", 15, 97,"auriculares.jpg"));


console.log(productos)

const carrito = [];


let cantidadPedida;
let precioConIva;


/*const venta = () => {
  
    while(productoPedido !== "NO"){

        let producto = productos.find(productos => productos.nombre == productoPedido )
        
        if(producto){
            cantidadPedida = parseInt((prompt("Cuantas unidades desea adquirir?")));
                
                    carrito.push(producto); 
                    producto.venderProducto(cantidadPedida);      
                    precioConIva = producto.sumarIva();
                   

        }else{
            console.log("El producto ingresado no se encuentra en stock");
        }
        productoPedido = prompt("Quiere comprar algun otro producto?  Teclado  Mouse  Monitor  Auriculares").toUpperCase();
    } 
}



console.log(carrito);

let precioTotal= 0;



/*const boleta = () => {
    
    let contenedor = document.createElement("div");
    document.getElementById("boleta").appendChild(contenedor);
    let contenedor2 = document.createElement("div");
    document.getElementById("boleta").appendChild(contenedor2);
    
    for (const producto of carrito) {

        contenedor = document.createElement("div");
        precio = producto.precio;
        precioXCantidad = precio * cantidadPedida;
        precioTotal += precioXCantidad;

        contenedor.innerHTML= `
                           <h3> Producto: ${producto.nombre}</h3>
                           <h3> Valor Unitario $ ${producto.precio}</h3>
                           <h3> Cantidad: ${cantidadPedida}</h3>
                           <h3> Precio total $ ${precioXCantidad}</h3>
                           <h3> ________________________________</h3>`; 

        document.getElementById("boleta").appendChild(contenedor);
        
    }
    contenedor2 = document.createElement("div");
    contenedor2.innerHTML = `<h3>Total Boleta: $ ${precioTotal}</h3>`;
    document.getElementById("boleta").appendChild(contenedor2);
    
}
*/

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
                                            <img class="card-img-top" src="img/${producto.img}" alt=${producto.nombre}>
                                            
                                        </div>
                                        <button class="btn btn-primary mb-3">Agregar al Carrito</button>
                                    <button class="btn btn-primary">Agregar a favoritos</button>
                                    </div>
                                    </div>`;

        tienda.appendChild(cardProducto);                                        
    }


}
    


const btn = document.getElementById("btnIngresar");



const bienvUsuario = () =>{
    
    const imputNombre = document.getElementById("nombre");
    const bienvenida = document.getElementById("contBienvenida");

    bienvenida.innerHTML = `<h5> Bienvenido/a ${imputNombre.value}</h5>
                            <h5> HOLAAA </h5> `


    console.log(inputNombre);
    console.log(bienvenida);
    alert("funciona")

    }

btn.onclick = () =>{bienvUsuario()};




mostrarTienda();



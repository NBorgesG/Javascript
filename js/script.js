class Producto {

    constructor (nombre, precio,stock){
        
        this.nombre=nombre; 
        this.precio=precio;        
        this.stock=stock;
        
        
    }

    sumarIva(){
        return this.precio = Math.round(this.precio * 1.21) ;
    }

    venderProducto(cantidadPedida){
            return this.stock= this.stock - cantidadPedida;
    }

}

const productos = [];

productos.push(new Producto("TECLADO", 30, 33));
productos.push(new Producto("MOUSE", 18, 52));
productos.push(new Producto("MONITOR", 110, 10));
productos.push(new Producto("AURICULARES", 15, 97));

console.log(productos)

const carrito = [];

alert("Bienvenido a CoreUruguay")

let productoPedido = prompt("Que producto desea adquirir?  Teclado  Mouse  Monitor Auriculares").toUpperCase();

let cantidadPedida;
let precioConIva;

const venta = () => {
  
    while(productoPedido !== "NO"){

        let producto = productos.find(productos => productos.nombre == productoPedido )
        
        if(producto){
            cantidadPedida = parseInt((prompt("Cuantas unidades desea adquirir?")));
                
                    carrito.push(producto); 
                    producto.venderProducto(cantidadPedida);
                    //console.log(producto.stock);
                     
                    precioConIva = producto.sumarIva();
                    //producto.precio = precioConIva * cantidadPedida;
                    
                    //console.log(producto.precio)

        }else{
            console.log("El producto ingresado no se encuentra en stock");
        }
        productoPedido = prompt("Quiere comprar algun otro producto?  Teclado  Mouse  Monitor  Auriculares").toUpperCase();
    } 
}

venta(productoPedido);

console.log(carrito);

let precioTotal= 0;



const boleta = () => {


    
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





boleta();







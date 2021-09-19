class Producto {

    constructor (nombre, precio,stock){
        
        this.nombre=nombre; 
        this.precio=precio;        
        this.stock=stock;
        
        
    }

    sumarIva(){
        return this.precio = Math.round(this.precio * 1.21) ;
    }

    venderProducto(){
            return this.stock= this.stock - 1;
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

let cantidad;

const venta = () => {

    while(productoPedido !== "NO"){

        let producto = productos.find(productos => productos.nombre == productoPedido )
        
        if(producto){

            cantidadPedida = parseInt((prompt("Cuantas unidades desea adquirir?")));
            venderProducto(producto);
            carrito.push(producto);    
            console.log(producto.stock);   

        }else{
            console.log("El producto ingresado no se encuentra en stock");
        }
       productoPedido = prompt("Quiere comprar algun otro producto?  Teclado  Mouse  Monitor  Auriculares").toUpperCase();

       
  
    }
    
    
    
}



venta(productoPedido);

console.log(carrito);


let precioSinIva = 0;
let precioTotal= 0;

const boleta = () => {

    for (let i = 0; i < carrito.length; i++) {
    
        let precio= carrito[i].precio;
        sumarIva(precio)
        precioTotal -= + precio;
    
    }

     

    alert("El precio total de su compra es: "+ precioTotal);
    
    
}



boleta();










class Producto {

    constructor (nombre,precio,stock){
        
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


const productos = [{nombre: "TECLADO", 
                    precio: 30, 
                    stock :33},
                    {nombre: "MOUSE", 
                    precio: 18, 
                    stock :52},
                    {nombre: "MONITOR", 
                    precio: 110, 
                    stock :10},
                    {nombre: "AURICULARES", 
                    precio: 15, 
                    stock :97}];

console.log(productos);

const carrito = [];

alert("Bienvenido a CoreUruguay")


let productoPedido =prompt("Que producto desea adquirir?  Teclado  Mouse  Monitor Auriculares").toUpperCase();

const venta = (productoPedido) => {

    

        let producto = productos.find(productos => productos.nombre == productoPedido )
    
        if(producto){
            carrito.push(producto);
        }else{
            console.log("El producto ingresado no se encuentra en stock");
   }
   
    
    

   
   
}

console.log(carrito);

venta(productoPedido);



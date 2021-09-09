
let productoElegido = "";

class Producto {
    constructor (producto, precio, stock){
        this.producto=producto; 
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

let teclado = new Producto ("Teclado", 45 , 10); 
let mouse = new Producto ("Mouse", 20 , 18); 
let monitor = new Producto ("Monitor", 120 , 8); 


productoElegido = prompt("Que producto desea comprar? 1) Teclado 2) Mouse 3) Monitor").toUpperCase();

const venta = (productoElegido) => {
    if(productoElegido == "TECLADO"){
        console.log("El teclado cuesta: " + teclado.sumarIva());
        console.log(teclado.venderProducto())

    }else if(productoElegido == "MOUSE"){
        console.log("El mouse cuesta: " + mouse.sumarIva());
        console.log(mouse.venderProducto())

    }else{
    console.log("El Monitor cuesta: " + monitor.sumarIva());
    console.log(monitor.venderProducto())
}
}

venta(productoElegido);

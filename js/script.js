

let precioProducto;

let producto = prompt("Ingrese el producto que quiere comprar( // TECLADO // MOUSE // MONITOR // )").toUpperCase();

let productoElegido = (producto) => {
    
        if(producto == "TECLADO"){
            console.log("El precio del teclado es 30")
            precioProducto = 30;        
            return producto;
            
        }else if(producto == "MOUSE"){
            console.log("El precio del Mouse es 25")
            precioProducto = 25;
            return producto;
        }else{
            console.log("El precio del Monitor es 100")
            precioProducto = 100;
            return producto;
        }
    
}

productoElegido(producto);

alert("El precio de " + producto + " es " + precioProducto);

alert("Gracias por elegir CORE uruguay")


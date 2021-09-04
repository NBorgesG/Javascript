

let precioProducto;
const precioTotal = precioProducto => precioProducto * 1.21;

let producto = prompt("Ingrese el producto que quiere comprar( // TECLADO // MOUSE // MONITOR // )").toUpperCase();

let productoElegido = (producto) => {
    
        if(producto == "TECLADO"){
            console.log("El precio del teclado es 30")
            precioProducto = 30;    
            precioTotal(precioProducto);
            console.log("El precio final es " + precioTotal(precioProducto));
            return producto;
            
        }else if(producto == "MOUSE"){
            console.log("El precio del Mouse es 25")
            precioProducto = 25;
            precioTotal(precioProducto);
            console.log("El precio final es " + precioTotal(precioProducto));
            return producto;
        }else{
            console.log("El precio del Monitor es 100")
            precioProducto = 100;
            precioTotal(precioProducto);
            console.log("El precio final es " + precioTotal(precioProducto));
            return producto;
        }
    
}


productoElegido(producto);
precioTotal(precioProducto);

alert("El producto que elegiste es " + producto )

alert("Gracias por elegir CORE uruguay")




let precioProducto;
let opcion;
let valorBoleta= 0;
let precioConIva;
let producto;
let cuotas = 0 ;

const precioTotal = (precioProducto) => Math.round(precioProducto * 1.21);



const boleta = () => {

    do{
        let producto = prompt("Ingrese el producto que quiere comprar( // TECLADO // MOUSE // MONITOR // )").toUpperCase();

        if(producto == "TECLADO"){
            console.log("El precio del teclado es 30")
            precioProducto = 30;    
            precioConIva = precioTotal(precioProducto);
            console.log("El precio con Iva es " + precioConIva);
            alert("El producto que elegiste es " + producto )
            
            
        }else if(producto == "MOUSE"){
            console.log("El precio del Mouse es 25")
            precioProducto = 25;
            precioConIva = precioTotal(precioProducto);
            console.log("El precio con Iva es " + precioConIva);
            alert("El producto que elegiste es " + producto )
            
        }else if(producto == "MONITOR"){
            console.log("El precio del Monitor es 100")
            precioProducto = 100;
            precioConIva = precioTotal(precioProducto);
            console.log("El precio con Iva es " + precioConIva);
            alert("El producto que elegiste es " + producto )
            
        }else{
            alert("Por favor ingrese un producto de nuestra lista")
        }

        valorBoleta = valorBoleta + precioConIva;
    
        opcion = prompt("Desea agregar otro producto?" ).toUpperCase();


    }while(opcion != "NO")



     
    
}

const metodoPago = (valorBoleta) =>{
    cuotas = prompt("En cuantas cuotas lo queres abonar? (1,2 o 3) ");

        if(cuotas == 1){
            alert("El total de tu compra es: $" + valorBoleta);
        }else if (cuotas == 2){
            alert("El total de tu compra es: $" + valorBoleta + " y te queda en 2 cuotas de: $" + valorBoleta/2);
        }else{
            alert("El total de tu compra es: $" + valorBoleta + " y te queda en 3 cuotas de: $" + valorBoleta/3)
        }

    
}



boleta(producto);

precioTotal(precioProducto);

metodoPago(valorBoleta);




alert("Gracias por elegir CORE uruguay")


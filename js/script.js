let opcion = "";
let valorTotal = 0;

do{
    let producto =  prompt("Ingrese el producto que quiere comprar( // TECLADO // MOUSE // MONITOR // )").toUpperCase();
    
    let precioProdSinIva = "";
    let precioProdConIva = "";

    if (producto == "TECLADO"){       

        precioProdSinIva = 35;    
        alert("El producto elegido es: " + producto );
    
    }else if (producto == "MOUSE"){
    
        precioProdSinIva = 20; 
        alert("El producto elegido es: " + producto );
    
    }else{
    
        precioProdSinIva = 100;
        alert("El producto elegido es: " + producto );
       
    }

    precioProdConIva = Math.round(precioProdSinIva * 1.22);
    
    valorTotal = valorTotal + precioProdConIva;

    opcion = prompt("Desea agregar otro producto?" ).toUpperCase();

}while(opcion != "NO");

alert("El total de su factura es de: " + valorTotal)

alert("Gracias por elegir CORE uruguay")


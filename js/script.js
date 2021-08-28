let producto =  prompt("Ingrese el producto que quiere comprar( // TECLADO // MOUSE // MONITOR // )").toUpperCase();

if (producto == "TECLADO"){
    
    let precioProdSinIva1 = 35;
    let precioProdConIva1 = Math.round(precioProdSinIva1 * 1.22);

    alert("El producto elegido es: " + producto );
    alert("El precio que debe abonar por " + producto + " es : " + precioProdConIva1);

}else if (producto == "MOUSE"){

    let precioProdSinIva2 = 20;
    let precioProdConIva2 = Math.round(precioProdSinIva2 * 1.22);

    alert("El producto elegido es: " + producto );
    alert("El precio que debe abonar por " + producto + " es : " + precioProdConIva2);

}else{

    let precioProdSinIva3 = 100;
    let precioProdConIva3 = Math.round(precioProdSinIva3 * 1.22);

    alert("El producto elegido es: " + producto );
    alert("El precio que debe abonar por " + producto + " es : " + precioProdConIva3);
    
}

alert("Gracias por elegir CORE URUGUAY");


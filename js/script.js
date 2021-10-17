class Producto {

    constructor (id,nombre, precio,stock,img,cantidad){
        this.id=id;
        this.nombre=nombre; 
        
        this.precio=precio;        
        this.stock=stock;
        this.img=img;
        this.cantidad=cantidad || 0;
    }

    sumarIva(){
        return this.precio = Math.round(this.precio * 1.21) ;
    }

    aumentarCantidad(){
        this.cantidad++;
    }

}

class Usuario {
    constructor (nombre, pass){
        this.nombre=nombre;
        this.pass=pass;

    }
}


const usuarios = [] || JSON.parse(localStorage.getItem(usuarios)); 
const productos = [];
const carrito = [];

productos.push(new Producto(1,"Teclado Logitech Z21", 30, 33,"teclado.jpg"));
productos.push(new Producto(2,"Mouse Kolke ", 18, 52,"mouse.jpg"));
productos.push(new Producto(3,"Monitor Gamer", 110, 10,"monitor.jpg"));
productos.push(new Producto(4,"Auriculares Kolke 27C", 15, 97,"auriculares.jpg"));




const respuesta2= document.getElementById("respuesta2")
const inputNombre = $("nombre");
const inputPass = document.getElementById("contraseña");
const respuesta = document.getElementById("respuesta");
const btn2 = document.getElementById("btnRegistro");
const btn = $("#btnIngresar");
const carretilla = document.getElementById("carretilla")
const modalCarrito = document.getElementById("modalCarrito");
const tienda = document.getElementById("productos")


// Creo el usuario, lo sube al local storage pero me falta validarlo
const crearUsuario = () => {
    let nombre= $("#nombre").val();
    let pass = $("#contraseña").val();
    const usuario = new Usuario (nombre, pass);

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    $("#respuesta").append("Usuario creado con exito, ya puede iniciar sesion");
    

    setTimeout(() => {
        respuesta.innerHTML = "";
        }, 1500);
    
    $("#nombre").val("");
    $("#contraseña").val("");

}

btn2.onclick = () => {crearUsuario()};



// Funcion comprar producto anidada al boton de la tienda
function comprar(producto) {
    
    let compra =carrito.find(objeto =>objeto.nombre === producto.nombre)

    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
            tienda.appendChild(respuesta2);
            respuesta2.innerHTML = "Producto agregado con exito!"
            
            setTimeout(() => {
            respuesta2.innerHTML = "";
            }, 1500);
        }else{
            respuesta2.innerHTML= "No hay mas stock del producto seleccionado"
            setTimeout(() => {
                respuesta2.innerHTML = "";
                }, 1500);
        }
    }else{
        producto.precio = producto.sumarIva();
        carrito.push(producto);
        producto.aumentarCantidad();

        tienda.appendChild(respuesta2);
        respuesta2.innerHTML = "Producto agregado con exito!"
    
        setTimeout(() => {
        respuesta2.innerHTML = "";
        }, 1500);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

}



//Cargo el carrito con los productos comprados, cantidades y suma total de factura
function cargarCarrito(){

    carretilla.innerHTML= "";

    let carrito2 = JSON.parse(localStorage.getItem('carrito'));
    let valorTotalFactura =0;
    
    if(carrito.length == 0 && carrito2){
        for (let i = 0; i < carrito2.length; i++) {
            carrito.push(new Producto(carrito2[i].id, carrito2[i].nombre,carrito2[i].precio,carrito2[i].stock,carrito2[i].img,carrito2[i].cantidad))
            }
         }

    for (const producto of carrito) {
        
        let valorTotal = producto.precio * producto.cantidad;
        const verProducto = document.createElement("div")
        carretilla.appendChild(verProducto);
        verProducto.innerHTML= ` <div class= "row divCarrito" >
                                <div class ="col-md-2"><img class="card-img-top" id= "imgCarrito"src="img/${producto.img}" alt=${producto.id}><br>${producto.nombre}</div>
                                
                                
                                <div class ="col-md-2">Por unidad$ ${producto.precio}</div>
                                <div class ="col-md-2">Cantidad : ${producto.cantidad}</div>
          
                                <div class ="col-md-2 divCarrito">
                                 Total $ ${valorTotal}
                                 
                                </div>  
                                <div class ="col-lg-4 divCarrito "> <button type="button" class="btn btns id="btnResta"> <img src="img/resta.png" alt="" ></button>
                                <button type="button" class="btn  btns"> <img src="img/suma.png" alt="" id="btnSuma"></button>
                                <button type="button" class="btn  btns"> <img src="img/basura.png" alt="" id="btnBorrar"></button>
                                </div>    
                                <h6>______________________________________________________________</h6>   
                                </div>
                         
                           `;     
        valorTotalFactura = valorTotalFactura + valorTotal;
        console.log(valorTotalFactura)
        
    }
    if(valorTotalFactura == 0){ 
        carretilla.innerHTML= `<h3> ________________________________</h3>
                                <h3> No agregaste ningun producto al carrito </h3>
                                <h3> ________________________________</h3>`;
    }else{
        const valorFactura = document.createElement("div");
        carretilla.appendChild(valorFactura);

        valorFactura.innerHTML=`<div row justify-content-end >
                             <h6> ________________________________</h6>
                             <h5> Valor Total Factura $ ${valorTotalFactura}</h5>
                            
                            <h6> ________________________________</h6>
                            </div> `;
    }
    

}

modalCarrito.addEventListener('click', () => cargarCarrito());    



//Doy la bienvenida al usuario 

// Inicio de Jquery
$( () => {
    const bienvUsuario = () =>{
        
        $("#contBienvenida").text("Bienvenido/a " + $("#nombre").val())
            
        $('#ModalUsuario').modal('hide');

        $("#nombre").val("");
        $("#contraseña").val("");
          
    }

    $("#btnIngresar").click(() => bienvUsuario());
  
    let tituloCore= $("#tituloCore")
    
    

    $("#tituloCore").mouseover(() => { 
        tituloCore.animate({ 
            transition: "0.8", 
            "font-size":"60px"   
        });
    });

    tituloCore.mouseleave(() => { 
        tituloCore.animate({
            transition: "0.8",
            "font-size":"50px" 
        })
    });


//La nueva tienda ahora se carga por json 
const URLJSON ="data/productos.json"          
  
    $.getJSON(URLJSON, function (respuesta, estado) {
            if(estado==="success"){
                let misDatos = respuesta.productos;
                console.log(misDatos)

                for (const dato of productos) {

                    $("#productos").prepend(`<div id="cardProducto"></div>`);

                    $("#cardProducto").prepend( ` <div class= "container">
                                        <div class="card mb-3 ">
                                            <div class="card-body  prod3 ">
                        
                                                <h5 class="card-title">${dato.nombre}</h5>
                                             <h6 class="card-text"> Precio U$S ${dato.precio}</h6>
                            <img class="card-img-top" src="img/${dato.img}" alt=${dato.id}>
                             </div>
                        <button class="btn btn-primary mb-3" id="${dato.id}">Agregar al Carrito</button>
                    <button class="btn btn-primary">Agregar a favoritos</button>
                    </div>
                    </div>`);

                    document.getElementById(`${dato.id}`).addEventListener('click', () => comprar(dato)) 
                    
                }
            }
        }
    );


   });
    



//Fin de jquery


//mostrarTienda();



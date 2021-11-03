$(() => {

    class Producto {

        constructor(id, nombre, precio, stock, img, cantidad) {
            this.id = id;
            this.nombre = nombre;

            this.precio = precio;
            this.stock = stock;
            this.img = img;
            this.cantidad = cantidad || 0;
        }

        aumentarCantidad() {
            this.cantidad++;
        }
        restarCantidad(){
            this.cantidad--;
        }

    }

    class Usuario {
        constructor(nombre, pass) {
            this.nombre = nombre;
            this.pass = pass;

        }
    }

    const usuarios = [] || JSON.parse(localStorage.getItem(usuarios));
    const productos = [] || JSON.parse(localStorage.getItem(productos));
    let carrito = [] || JSON.parse(localStorage.getItem(carrito));
    const favoritos = [] || JSON.parse(localStorage.getItem(favoritos));
    let boleta = [];
    let boleta2 = [];
    let totalBoleta = 0;


    const respuesta2 = document.getElementById("respuesta2")
    const respuesta = document.getElementById("respuesta");
    const btn2 = document.getElementById("btnRegistro");
    const carretilla = document.getElementById("carretilla")
    const modalCarrito = document.getElementById("modalCarrito");
    
    //funcion auxiliar para resetear el contador de cantidad del producto.
    const reseteoCant = (producto) =>{
        let cant= producto.cantidad;
        producto.cantidad = producto.cantidad - cant;
    }

    // Creo el usuario
    const crearUsuario = () => {
        let nombre = $("#nombre").val();
        let pass = $("#contraseña").val();
        const usuario = new Usuario(nombre, pass);

        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        $("#respuesta").append("Usuario creado con exito, ya puede iniciar sesion");
        setTimeout(() => {
            respuesta.innerHTML = "";
        }, 1500);

        $("#nombre").val("");
        $("#contraseña").val("");

    }

    btn2.onclick = () => { crearUsuario() };

    //Doy la bienvenida al usuario 
    const bienvUsuario = () => {
        $("#contBienvenida").text("Bienvenido/a " + $("#nombre").val())
        $('#ModalUsuario').modal('hide');
        $("#nombre").val("");
        $("#contraseña").val("");
        }

    $("#btnIngresar").click(() => bienvUsuario());

    //Animacion del titulo
    let tituloCore = $("#tituloCore")

    $("#tituloCore").mouseover(() => {
        tituloCore.animate({
            transition: "0.8",
            "font-size": "60px"
        });
    });
    tituloCore.mouseleave(() => {
        tituloCore.animate({
            transition: "0.8",
            "font-size": "50px"
        })
    });

    
   function cargarTienda(){
        
    const URLJSON = "data/productos.json"

    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta.productos;
            if (misDatos) {
                for (let i = 0; i < misDatos.length; i++) {
                    productos.push(new Producto(misDatos[i].id, misDatos[i].nombre, misDatos[i].precio, misDatos[i].stock, misDatos[i].img, misDatos[i].cantidad))
                }
            }
        for (const producto of productos) {
                $("#productos").prepend(`<div id="cardProducto"></div>`);
                $("#cardProducto").prepend(` <div class= "container prueba">
                                                    <div class="card mb-3 ">
                                                        <div class="card-body  prod3 ">
                                                            <h5 class="card-title">${producto.nombre}</h5>
                                                            <h6 class="card-text"> Precio US$ ${producto.precio}</h6>
                                                            <img class="card-img-top" src="img/${producto.img}" alt=${producto.id}>
                                                            </div>
                                                        <button class="btn btn-primary mb-3" id="comprar-${producto.id}">Agregar al Carrito</button>
                                                        <button class="btn btn-primary" id="agregarFav-${producto.id}">Agregar a favoritos</button>
                                                        </div>
                                                    </div>`);

                document.getElementById(`comprar-${producto.id}`).addEventListener('click', () => comprar(producto))
                document.getElementById(`agregarFav-${producto.id}`).addEventListener('click', () => agregarFav(producto))
                }
        }
    });} 

   cargarTienda();
    
    // Funcion comprar producto anidada al boton de la tienda
    function comprar(producto) {
        let carrito2 = JSON.parse(localStorage.getItem('carrito'));
        
        if (carrito.length == 0 && carrito2) {
            for (let i = 0; i < carrito2.length; i++) {
                carrito.push(new Producto(carrito2[i].id, carrito2[i].nombre, carrito2[i].precio, carrito2[i].stock, carrito2[i].img, carrito2[i].cantidad))
            }
        }
        let compra = carrito.find(objeto => objeto.nombre === producto.nombre)
        if (compra) {
            if (compra.cantidad < producto.stock) {
                compra.aumentarCantidad();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No hay mas stock del producto seleccionado',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }else{
            carrito.push(producto);
            producto.aumentarCantidad();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado con exito!',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                respuesta2.innerHTML = "";
            }, 1500);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(carrito)
    }
    
    //Cargo el carrito con los productos comprados, cantidades y suma total de factura
    function cargarCarrito() {
        carretilla.innerHTML = "";
        let valorTotalFactura = 0;
        let carrito2 = JSON.parse(localStorage.getItem('carrito'));
        
        if (carrito.length == 0 && carrito2) {
            for (let i = 0; i < carrito2.length; i++) {
                carrito.push(new Producto(carrito2[i].id, carrito2[i].nombre, carrito2[i].precio, carrito2[i].stock, carrito2[i].img, carrito2[i].cantidad))
            }
        }
        for (const producto of carrito) {
            let valorTotal = producto.precio * producto.cantidad;
            $("#carretilla").append(`<div id="verProducto"></div>`);
            $("#verProducto").append(` <div class= "row divCarrito" >
                                                <div class ="col-md-2 imgCarrito mb-3" ><img class="card-img-top" src="img/${producto.img}" alt=${producto.id}><br>${producto.nombre}</div>
                                                    <div class ="col-md-2"><h6>Por unidad US$ ${producto.precio}</h6></div>
                                                        <div class ="col-md-2" id="cantProducto"><h6 id="cantProducto">Cantidad : ${producto.cantidad}</h6></div>

                                                    <div class ="col-md-2 divCarrito">
                                                        Total US$ ${valorTotal}
                                                      </div>  
                                         <button type="button" class="btn btns" id="resta-${producto.id}"><img src="img/resta.png" alt=""></button>
                                        <button type="button" class="btn btns" id="suma-${producto.id}"><img src="img/suma.png" alt=""></button>
                                        <button type="button" class="btn btns" id="borrar-${producto.id}"><img src="img/basura.png" alt=""></button>
                                           
                                        <h6>____________________________________________________________________________________</h6>   
                                        </div>`)
            valorTotalFactura = valorTotalFactura + valorTotal;
            
            document.getElementById(`resta-${producto.id}`).addEventListener('click', () => restarCarrito(producto))
            document.getElementById(`suma-${producto.id}`).addEventListener('click', () => sumarCarrito(producto))
            document.getElementById(`borrar-${producto.id}`).addEventListener('click', () => eliminarCarrito(producto))
        }
        if (valorTotalFactura == 0) {
            carretilla.innerHTML = `<div class="divCarrito">
                                        <h3> ________________________________</h3>
                                        <h3> No agregaste ningun producto al carrito </h3>
                                        <h3> ________________________________</h3></div>`;
        } else {
            const valorFactura = document.createElement("div");
            carretilla.appendChild(valorFactura);
            valorFactura.innerHTML = `<div class="row justify-content-end divCarrito " > 
                             <h5> Total factura US$ ${valorTotalFactura}</h5>
                             <h6>_____________________________________________________________________________________</h6>  
                            </div> `;}
        localStorage.setItem('carrito', JSON.stringify(carrito));   
        totalBoleta = valorTotalFactura;
    }

    modalCarrito.addEventListener('click', () => cargarCarrito());

    //Restar producto en el carrito
    function restarCarrito(producto) { 
        let objeto = carrito.find(elemento =>elemento.id === producto.id);
        if(objeto.cantidad > 1){
            producto.restarCantidad();
            localStorage.setItem('carrito', JSON.stringify(carrito)); 
            cargarCarrito();
        }else{
            let objeto = carrito.indexOf(producto);
            reseteoCant(producto);
            carrito.splice(objeto,1);
            localStorage.setItem('carrito', JSON.stringify(carrito));  
            cargarCarrito();
        }
    }

    //Sumar producto en el carrito
    const sumarCarrito = (producto) => {
        let objeto = carrito.find(elemento => elemento.id === producto.id);
         if(objeto){
            producto.aumentarCantidad();
            localStorage.setItem('carrito', JSON.stringify(carrito)); 
            cargarCarrito();
        }    
    }

    //Eliminar producto en el carrito
    const eliminarCarrito = (producto) => {
        let objeto = carrito.indexOf(producto);
        reseteoCant(producto); 
        carrito.splice(objeto,1);
        localStorage.setItem('carrito', JSON.stringify(carrito));  
        cargarCarrito();
    }

    //Creacion de la boleta
    $("#btnfinCompra").click(() =>{
        if(carrito.length>=1){
            boleta = boleta2.concat(carrito);
               
            $("#modalBoleta").modal('show');

            $("#boleta").append(`<div class= "divCarrito "><h5>Compraste: </h5></div><hr>`);

            for (const producto of boleta) {
                     $("#boleta").append(`<div class="row divCarrito ">
                                        <div class="col-lg-6"><h6>Producto: ${producto.nombre}</h6></div>
                                        <div class="col-lg-6"><h6>Cantidad: ${producto.cantidad}</h6></div>
                                    </div>`);
                                    reseteoCant(producto);
            }

            $("#boleta").append(`
            <div class="row bol"><h5>TOTAL US$ ${totalBoleta}</h5></div>
            <hr>
            <div class="row mb-3 mt-5"><h4>Confirme datos de Pago</h4> </div>
            <div class="row">
            <div class="col-lg-6"><h5>Tarjeta de credito o Debito</h5></div>            
            <div class="col-lg-6"><input type="text"></div> </div>
            <hr>            
            <div class="row">
            <div class="col-lg-6"><h5>Ingrese todos los numeros</h5></div> 
            <div class="col-lg-6"><input type="text"></div></div>
            <hr>            
            <div class="row"> 
            <div class="col-lg-6"><h5>Fecha de vencimiento</h5></div>
            <div class="col-lg-6"><input type="text"></div>
            </div>
            <hr>
            <div class="row"> 
            <div class="col-lg-6"><h5>Ingrese su email</h5></div>
            <div class="col-lg-6"><input type="email"></div>
            </div>
            <hr>
            <button type="button" class="btn btn-primary" id="btnConf">Confirmar Datos</button>
            `);
            
            $("#btnConf").click(()=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Compra confirmada! Le enviaremos un mail con el resumen de su compra, MUCHAS GRACIAS!!',
                    showConfirmButton: false,
                    timer: 3000}) 

                  $("#modalBoleta").modal('hide');  
                  boleta.splice(0,boleta.length);
                  $("#boleta").empty();
                  carrito.splice(0,carrito.length);
                  localStorage.setItem('carrito', JSON.stringify(carrito)); 
                  })
           
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No puedes finalizar compra si no compraste ningun producto!',
                showConfirmButton: false,
                timer: 1500
              })
        }
        
    })

   

    //Buscador 
    $("#btnBuscar").click(() => {
        let busca = $("#inputBuscar").val().toUpperCase();
        let busqueda = productos.filter(producto => producto.nombre.toUpperCase().includes(busca));
       
        if(busqueda.length >= 1){
            $(".prueba").hide();
            $(".contBusqueda").hide();
            for (const producto of busqueda) {
                $("#productos").prepend(`<div id="cardProducto"></div>`);
                
                $("#cardProducto").append(` <div class= "container contBusqueda ">
                                                <div class="card mb-3 ">
                                                    <div class="card-body  prod3 ">
                                                        <h5 class="card-title">${producto.nombre}</h5>
                                                        <h6 class="card-text"> Precio U$S ${producto.precio}</h6>
                                                        <img class="card-img-top" src="img/${producto.img}" alt=${producto.id}>
                                                    </div>
                                            <button class="btn btn-primary mb-3" id="comprar-${producto.id}">Agregar al Carrito</button>
                                            <button class="btn btn-primary" id="agregarFav-${producto.id}">Agregar a favoritos</button>
                                                </div>
                                            </div>`);
                document.getElementById(`comprar-${producto.id}`).addEventListener('click', () => comprar(producto))
                document.getElementById(`agregarFav-${producto.id}`).addEventListener('click', () => agregarFav(producto))}
                $("#inputBuscar").val("");
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No existe ningun producto con ese nombre',
                showConfirmButton: false,
                timer: 1500
              })
             }
             
            })


    //Veo favoritos        
    $("#modalFavo").click(() => verFavoritos());

    const verFavoritos = () => {
        document.getElementById("modalFav").innerHTML="";
        let fav = JSON.parse(localStorage.getItem('favoritos'));
        if (favoritos.length == 0 && fav) {
            for (let i = 0; i < fav.length; i++) {
                favoritos.push(new Producto(fav[i].id, fav[i].nombre, fav[i].precio, fav[i].stock, fav[i].img, fav[i].cantidad))
                console.log("entra")
            }
        }
        if(favoritos.length<1){
            $("#modalFav").append(`<div class = "divCarrito">
                                        <h3>__________________________________________________</h3>
                                        <h3>No has agregado nada a favoritos</h3>
                                        <h3>__________________________________________________</h3>            
                                        </div>`)
        }else{
            for (const producto of favoritos) {
                $("#modalFav").append(`  <div class="row divCarrito">
                                <h3>__________________________________________________</h3>
                                <div class ="col-lg-3 imgCarrito mb-3" ><img class="card-img-top" src="img/${producto.img}" alt=${producto.id}>
                                </div>
                                <div class="col-lg-3"><h3>${producto.nombre}</h3></div>
                                <div class="col-lg-3"><button class="btn btn-primary" id="comprar2-${producto.id}">Comprar</button></div> 
                                
                                <div class="col-lg-3"><button type="button" class="btn btn-primary" id="borrar-${producto.id}"> Eliminar de favoritos</button></div>
                                
                                <h3>__________________________________________________</h3>
                                </div>`);
        document.getElementById(`comprar2-${producto.id}`).addEventListener('click', () => comprar(producto))
        document.getElementById(`borrar-${producto.id}`).addEventListener('click', () => eliminarProdFav(producto))
            }
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
    }
    
    //Agrego a favoritos
    const agregarFav = (producto) => {
        let productoFav = favoritos.find(elem => elem.id === producto.id);      
        if (productoFav) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ya agregaste este producto a favoritos!',
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }else{
            favoritos.push(producto);
            Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado a favoritos con exito!',
                    showConfirmButton: false,
                    timer: 1500
                  })  
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));   
    }

     //Elimina productos de los favoritos
     const eliminarProdFav = (producto) => {
        let objeto = favoritos.indexOf(producto);
        favoritos.splice(objeto,1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));  
        verFavoritos();
    }

   

});

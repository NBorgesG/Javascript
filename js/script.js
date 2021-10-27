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

        sumarIva() {
            return this.precio = Math.round(this.precio * 1.21);
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
    const productos = [];
    const carrito = [];
    const favoritos = [];


    const respuesta2 = document.getElementById("respuesta2")
    const inputNombre = $("nombre");
    const inputPass = document.getElementById("contraseña");
    const respuesta = document.getElementById("respuesta");
    const btn2 = document.getElementById("btnRegistro");
    const btn = $("#btnIngresar");
    const carretilla = document.getElementById("carretilla")
    const modalCarrito = document.getElementById("modalCarrito");
    const tienda = document.getElementById("productos")
    const btnSumar= document.getElementById("suma-${producto.id}")
    const btnRestar=document.getElementById("resta-${producto.id}")
    const btnEliminar= document.getElementById("borrar-${producto.id}")




    // Creo el usuario, lo sube al local storage pero me falta validarlo
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

    btn2.onclick = () => {
        crearUsuario()
    };

    
    //La nueva tienda ahora se carga por json 
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

                $("#cardProducto").prepend(` <div class= "container">
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
                document.getElementById(`agregarFav-${producto.id}`).addEventListener('click', () => agregarFav(producto))


            }
        }
    });

    // Funcion comprar producto anidada al boton de la tienda
    function comprar(producto) {

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

               
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No hay mas stock del producto seleccionado',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        } else {
            producto.precio = producto.sumarIva();
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
    }
    

    //Cargo el carrito con los productos comprados, cantidades y suma total de factura
    function cargarCarrito() {

        carretilla.innerHTML = "";

        let carrito2 = JSON.parse(localStorage.getItem('carrito'));
        let valorTotalFactura = 0;

        if (carrito.length == 0 && carrito2) {
            for (let i = 0; i < carrito2.length; i++) {
                carrito.push(new Producto(carrito2[i].id, carrito2[i].nombre, carrito2[i].precio, carrito2[i].stock, carrito2[i].img, carrito2[i].cantidad))
            }
        }

        for (const producto of carrito) {

            let valorTotal = producto.precio * producto.cantidad;

            $("#carretilla").append(`<div id="verProducto"></div>`);

            $("#verProducto").append(` <div class= "row divCarrito" >
                                                <div class ="col-md-2"><img class="card-img-top" id= "imgCarrito"src="img/${producto.img}" alt=${producto.id}><br>${producto.nombre}</div>
                                                    <div class ="col-md-2">Por unidad$ ${producto.precio}</div>
                                                        <div class ="col-md-2">Cantidad : ${producto.cantidad}</div>

                                                    <div class ="col-md-2 divCarrito">
                                         Total $ ${valorTotal}
                 
                                                        </div>  
                                         <button type="button" class="btn btns id="resta-${producto.id}"> resta</button>
                                        <button type="button" class="btn  btns id="suma-${producto.id}"> suma</button>
                                        <button type="button" class="btn  btns id="borrar-${producto.id}"> eliminar</button>
                                           
                                        <h6>______________________________________________________________</h6>   
                                        </div>`)
            
            valorTotalFactura = valorTotalFactura + valorTotal;
            
           document.getElementById(`resta-${producto.id}`).addEventListener('click', () => restarCarrito(producto))
           document.getElementById(`suma-${producto.id}`).addEventListener('click', () => sumarCarrito(producto))
           document.getElementById(`borrar-${producto.id}`).addEventListener('click', () => eliminarCarrito(producto))
        
            
        }
        if (valorTotalFactura == 0) {
            carretilla.innerHTML = `<h3> ________________________________</h3>
                                <h3> No agregaste ningun producto al carrito </h3>
                                <h3> ________________________________</h3>`;
        } else {
            const valorFactura = document.createElement("div");
            carretilla.appendChild(valorFactura);

            valorFactura.innerHTML = `<div row justify-content-end >
                             <h6> ________________________________</h6>
                             <h5> Valor Total Factura $ ${valorTotalFactura}</h5>
                            
                            <h6> ________________________________</h6>
                            </div> `;
        }
        
    }

    
    modalCarrito.addEventListener('click', () => cargarCarrito());

    function restarCarrito(producto) { 
        console.log("hola")
        let objeto = carrito.find(elemento =>elemento.id ===producto.id);
        
        if(objeto.cantidad > 1){
            producto.restarCantidad();
        }else{
            eliminarCarrito();
        }

     }
    


    const sumarCarrito = (producto) => {
        let objeto = carrito.find(elemento => elemento.id === producto.id);
        
        if(objeto){
            producto.aumentarCantidad();
        }    
    }

    const eliminarCarrito = (producto) => {
        let objeto = carrito.filter(elemento =>elemento.id !== producto.id);
        console.log(objeto)
    }

    
    

    //Buscador, en construccion :S
    $("#btnBuscar").click(() => {
        let busca = $("#inputBuscar").val().toUpperCase();
        let busqueda = productos.find(producto => producto.id.toUpperCase().includes(busca));
        $("#productos").append(busqueda)
    })



    //Doy la bienvenida al usuario 
    const bienvUsuario = () => {
        $("#contBienvenida").text("Bienvenido/a " + $("#nombre").val())
        $('#ModalUsuario').modal('hide');
        $("#nombre").val("");
        $("#contraseña").val("");
    }

    $("#btnIngresar").click(() => bienvUsuario());

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






    //Agrego a favoritos, puedo comprar productos agregados en favoritos, en proceso aunque que los guarde en el local storage
    const agregarFav = (producto) => {
        let productoFav = favoritos.find(elem => elem.id === producto.id);
        if (productoFav) {
            return;
        } else {
            favoritos.push(producto);
            $("#modalFav").append(`  <div class="row">
                                        <div class="col-lg-6"><h3>${producto.nombre}</h3></div>
                                        <div class="col-lg-6"><button class="btn btn-primary" id="comprar2-${producto.id}">Comprar</button></div> 
                                        </div>
                                        `);
            Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado a favoritos con exito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            setTimeout(() => {
                respuesta2.innerHTML = "";
            }, 1000);
            document.getElementById(`comprar2-${producto.id}`).addEventListener('click', () => comprar(producto))
        }

        localStorage.setItem('prodFavoritos', JSON.stringify(favoritos));
    }






});

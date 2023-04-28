//Variable que mantiene el estado visible del cart
var cartVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonsremoveItem = document.getElementsByClassName('btn-remove');
    for(var i=0;i<botonsremoveItem.length; i++){
        var button = botonsremoveItem[i];
        button.addEventListener('click',removeItemCart);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var addquantity = document.getElementsByClassName('add-quantity');
    for(var i=0;i<addquantity.length; i++){
        var button =addquantity[i];
        button.addEventListener('click',add-quantity);
    }

     //Agrego funcionalidad al buton restar cantidad
    var resetquantity = document.getElementsByClassName('reset-quantity');
    for(var i=0;i<resetquantity.length; i++){
        var button = resetquantity[i];
        button.addEventListener('click',reset-quantity);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var addtocart = document.getElementsByClassName('boton-item');
    for(var i=0; i<addtocart.length;i++){
        var button = addtocart[i];
        button.addEventListener('click', addcartClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-check')[0].addEventListener('click',checkClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function checkClicked(){
    alert("thank you for the purchase");
    //Elimino todos los elmentos del carrito
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updatetotalCart();
    ocultarCart();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function updateCartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    addcartClicked(title, price, imagenSrc);

    visiblecart();
}

//Funcion que hace visible el carrito
function VisibleCart(){
    visiblecart = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items =document.getElementsByClassName('con-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al cart
function addtocart(title, price, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('cart-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('cart-item-title');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==title){
            alert("The item is already in the cart");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('cart-item-amount')[0].value);
    var cantidadActual = selector.getElementsByClassName('cart-item-amount')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('cart-item-amount')[0].value = cantidadActual;
        updatetotalcart();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    updatetotalcart();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCart();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCart(){
    var carritoItems = document.getElementsByClassName('cart-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('cart')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('con-items')[0];
        items.style.width = '100%';
    }
}
//We update the total cart
function updatetotalcart(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('cart')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('cart-item');
    var total = 0;
    //We go through each item in the cart to update the total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('cart-item-price')[0];
        //We remove the symbol weight and the point of thousands.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('cart-item-quantity')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-price-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}









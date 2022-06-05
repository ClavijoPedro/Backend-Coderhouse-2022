"use strict";

//variable global del id
let cartId;

console.log(cartId)
//opciones fetch
const baseUrl = '/api/carrito'
const fetchOptions ={
    method:'post',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
};



//CREA CARRITO Y GUARDA EL PRODUCTO (GUARDA ID CARRITO EN VARIABLE GLOBAL)
async function addToCart(id) {
    try{
        console.log('esto es prodid', id)
        if(!cartId){
            const newCart = await fetch(baseUrl, fetchOptions);
            const cartData = await newCart.json();
            cartId = cartData.id
            console.log('url', `${baseUrl}/${cartId}/productos/${id}`)
            const addProduct = await fetch(`${baseUrl}/${cartId}/productos/${id}`,fetchOptions)
            return
        }
        const addProduct = await fetch(`${baseUrl}/${cartId}/productos/${id}`,fetchOptions)
    }catch (error) {console.log(error)}
};


//TRAE PRODUCTOS CARRITO Y LOS IMPRIME
async function showCart() {
    const cartView = document.getElementById('cartItems');
    const btnConfirm = document.getElementById('btnConfirm')
    const btnDelCart = document.getElementById('btnDelCart')
    try{
        if(cartId){
            const cart = await fetch(`${baseUrl}/${cartId}/productos`, {method:'get'});
            const cartData = await cart.json()
            console.log('cartdata', cart)
            if(cartData.length){
                btnConfirm.classList.remove('d-none')
                btnDelCart.classList.remove('d-none')
            }
            const cartProducts = cartData.map( p => (
              ` <tr id='${p._id || p.id}'>
                  <td><img class="tblImg" src=${p.image} alt="imgProd"></td>
                  <td>${p.name}</td>
                  <td>$${p.price}</td>
                  <td><button onclick="deleteFromCart('${(p._id || p.id)}')" class="btn-close"></button></td>
                </tr>
              `
            ));
            cartView.innerHTML = cartProducts;
        }
    }catch(error) {console.log(error)}
};


//ELIMINA PRODUCTO DEL CARRITO
async function deleteFromCart(id) {
    console.log(id)
    const cartRow = document.getElementById(id)
    try{
        const deleted = await fetch(`${baseUrl}/${cartId}/productos/${id}`, {method:'delete'});
        console.log('esto es deleted',deleted)
        if(deleted.ok){cartRow.remove()};
        console.log('producto eliminado')
    }catch(error){console.log(error)}
};


//ELIMINA CARRITO
async function deleteCart(id){
    const cartView = document.getElementById('cartItems');
    try{
        const cart = await fetch(`${baseUrl}/${cartId}`, {method:'delete'});
        cartView.innerHTML='';
        cartId = '';
        console.log('carrito eliminado')
    }catch(error){console.log(error)}
};


//ENVIA ORDEN DE PRODUCTOS
const sendOrder = async () => {
    const cartView = document.getElementById('cartItems')
    try{
        const orderSended = await fetch(`${baseUrl}/${cartId}/order`, fetchOptions);
        console.log('orden enviada')
        cartView.innerHTML = 
            `<tr class="text-center">
                <td colspan="3" class="py-3 table-info">Su código de pedido es:<br><b>${cartId}<b></td>
            </tr>`
        cartId = '';
    }catch(error){ console.log(error)}
    
};
var updateBtns = document.getElementsByClassName('update-cart')

for(var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click',function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:' , productId, 'action:' , action)

        console.log('USER:', user)
        if(user === 'AnonymousUser'){
            addCookieItem(productId, action )
        }
        else{
            updateUserOrder(productId, action)
        }
    })
}

function addCookieItem(productId, action){
    console.log('Not logged in..')

    if(action == 'add'){
        /*here we can access the cart because it is in main.html*/
        if(cart[productId] == undefined){
            cart[productId] = {'quantity' : 1}
        }else{
            cart[productId]['quantity'] += 1 
        }
    }

    if(action == 'remove'){
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity']<=0){
            console.log('Item should be deleted')
            delete cart[productId]
        }
    }
    console.log('Cart:', cart)
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/" 
    location.reload()  
}

function updateUserOrder(productId, action){
    console.log('User is logged in, sending data...')

    /*to send this data we gonna use fetch*/
    var url = '/update_item/'

    fetch(url, {
        /*what kind of data to send to a backend*/
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        /*Now body,body is the data that we send to backend,we need to send the object to the backend as a string,so JSON.stringify is added*/
        body:JSON.stringify({
            'productId': productId, 'action':action
        })
    })
    
    /*upto this "sending data",now once we send the data we have to return a promise*/
    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log('data:' , data)
        location.reload()
    })
}

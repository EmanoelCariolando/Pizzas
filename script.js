     const el = (el) => document.querySelector(el);     
     const  elAll= (elAll) => document.querySelectorAll(elAll);
     let modalqt = 1;
     let modalKey = 0;
     let cart = [];
     //Variables
     
     pizzaJson.map((item, index)=>{
      let pizzaItem = el('.models .pizza-item').cloneNode(true);
    
      pizzaItem.setAttribute('data-key', index)
      pizzaItem.querySelector('.pizza-item--img img').src = item.img
      pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `$  ${item.price.toFixed(2)}` 
      pizzaItem.querySelector('a').addEventListener('click',(e) => { 
       e.preventDefault();
       let key = e.target.closest('.pizza-item').getAttribute('data-key');
       modalKey = key;
       
      //Selects

       el('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
       el('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
       el('.pizzaInfo--actualPrice').innerHTML = `$  ${pizzaJson[key].price.toFixed(2)}`;
       el('.pizzaBig img').src = pizzaJson[key].img;
       el('.pizzaInfo--size.selected').classList.remove('selected');

       el('.pizzaInfo--qt').innerHTML = modalqt;

       elAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        if(sizeIndex === 2){
           size.classList.add('selected');
        }
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
       
      })
       
       
       el('.pizzaWindowArea').style.opacity = 0;
       el('.pizzaWindowArea').style.display = 'flex';
       setTimeout(()=>{
       el('.pizzaWindowArea').style.opacity = 1;
       },200);
     
     })
     
      el('.pizza-area').append(pizzaItem);
 })
 
 // events Modal window 
 
   const closeModal = () => {
    el('.pizzaWindowArea').style.opacity = 0;
   
    setTimeout(()=>{
    el('.pizzaWindowArea').style.display = 'none';
    },500);
   }


 
   elAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
   })
 
   el('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
   if(modalqt > 1){
    modalqt-- ;
 }
    el('.pizzaInfo--qt').innerHTML = modalqt;
   })
   el('.pizzaInfo--qtmais').addEventListener('click', (e) => {
     modalqt++ ;
     el('.pizzaInfo--qt').innerHTML = modalqt;
   })
   //size 
  elAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
   size.addEventListener('click', (e) => {
     el('.pizzaInfo--size.selected').classList.remove('selected');
     size.classList.add('selected');
   })
 });

   el('.pizzaInfo--addButton').addEventListener('click', (e) => {
     let size = parseInt(el('.pizzaInfo--size.selected').getAttribute('data-key'))

     let indentifier = pizzaJson[modalKey].id+'@'+size;
     let key = cart.findIndex((item) => {
     return item.indentifier === indentifier
     })
     if(key > -1){

     } else {
     cart.push({
      indentifier,
      id:pizzaJson[modalKey].id,
      size,
      qt:modalqt
     })
 }
    uptadeCart()
    closeModal()
   })

   function uptadeCart(){
    if (cart.length > 0){

      el('aside').classList.add('show')
  
 

      for(let i in cart){
        let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
        let cartItem = el('.models .cart--item').cloneNode(true)
        

        let pizzaSizesItems;
        switch(cart[i].size) {
          case 0: 
          pizzaSizesItems = 'P'
          break;
          case 1:
            pizzaSizesItems ='M'
            break;
            case 2:
              pizzaSizesItems ='G'
              break;
        }

        let nameAndSize = `${pizzaItem.name} (${pizzaSizesItems})`;
       
        cartItem.querySelector('img').src = pizzaItem.img
        cartItem.querySelector('.cart--item-nome').innerHTML = nameAndSize
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
  
        el('aside').append(cartItem);
       }
      
      }
   
    else { 
      el('aside').classList.remove('show')
   }
  }

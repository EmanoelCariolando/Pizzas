     const el = (el) => document.querySelector(el);     
     const  elAll= (elAll) => document.querySelectorAll(elAll);

     //QuerySelectors
     
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
        let modalqt = 1;

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
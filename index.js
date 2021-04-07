import items from './items.js';
const linkForMobile=document.querySelector('.sidebar-link-mobile');
const linkForSports=document.querySelector('.sidebar-link-sports');
const linkForHome=document.querySelector('.sidebar-link-home');
const linkForBooks=document.querySelector('.sidebar-link-books');
const darkLightToggle=document.getElementById('change-theme');
const darkLightIcon=document.querySelector('.fa-moon');
const wishlist=document.getElementById('wishlist');
const noOfItems=document.getElementById('numberOfItems');
const showButton=document.getElementById('show');
const budgetInput=document.getElementById('budget');
const output=document.querySelector('.output');
let idsOfSections=['#mobiles','#sports','#home','#books'];
let selectedItems=[];
let mode='light';
let count=0;
createCards();

function createCustomElement(element){
    return document.createElement(element);
}
function setAttributes(element,attributes){
    for(let attribute in attributes){
        element.setAttribute(attribute,attributes[attribute]);
    }
}
function appendElements(parentElem,childElements){
 childElements.forEach((childElem)=>{
  parentElem.appendChild(childElem);
 });   
}

// function for creating and updating wishlist
function updateWishlist(quantityValue,whatToDo){
 if(wishlist.classList.contains('hidden')){
     wishlist.classList.remove('hidden');
 }
    items.forEach((item)=>{
        selectedItems.forEach((selectedItem,index)=>{
           if(item.nameOfProduct===selectedItem){
               count++;
               let newRow=createCustomElement('tr');
               let serialNo=createCustomElement('td');
               let productName=createCustomElement('td');
               setAttributes(productName,{'class':'productName'});
               let quantity=createCustomElement('td');
               let price=createCustomElement('td');
               setAttributes(price,{'class':'priceValue'});
             serialNo.textContent=count;
             productName.textContent=item.nameOfProduct;
             quantity.textContent=quantityValue;
             price.textContent=`$${quantityValue * item.price}`;
             appendElements(newRow,[serialNo,productName,quantity,price]);
             appendElements(wishlist,[newRow]);
             selectedItems.splice(index,1);
       }
        })
    noOfItems.textContent=`Your wishlist has ${count} ${count===1?'item':'items'}.`
       });

}

// Function for creating items cards
function createCards(){
items.forEach((item)=>{
   let sectionId= item.category;
   let card = createCustomElement('div');
   setAttributes(card,{'class':'card'});
   let productImage = createCustomElement('img');
   setAttributes(productImage,{'src':item.image});
   let hr = createCustomElement('hr');
   let description = createCustomElement('div');
   setAttributes(description,{'class':'details'});
   let productName=createCustomElement('span');
   setAttributes(productName,{'class':'product-name'});
   productName.textContent=item.nameOfProduct;
   let price= createCustomElement('span');
   setAttributes(price,{'class':'price'});
   price.textContent=`$${item.price}`;
   let quantity=createCustomElement('span');
   quantity.textContent='Quantity : ';
   setAttributes(quantity,{'class':'quantity'});
   let increase=createCustomElement('span');
   setAttributes(increase,{'class':'increase'});
   increase.innerHTML='<i class="fas fa-plus"></i>';
   let inputForQuantity=createCustomElement('input');
   setAttributes(inputForQuantity,{'type':'number','value':0});
   let decrease=createCustomElement('span');
   setAttributes(decrease,{'class':'decrease'});
   decrease.innerHTML='<i class="fas fa-minus"></i>';
   let button=createCustomElement('button');
   setAttributes(button,{'class':'add-to-wishlist'});
   button.textContent='Add to wishlist';
   let container=document.querySelector(`#${sectionId} > .grid-container`);
appendElements(quantity,[increase,inputForQuantity,decrease]);   
appendElements(description,[productName,price,quantity]);   
appendElements(card,[productImage,hr,description,button]);
appendElements(container,[card]);
});
}

// function for changing theme
function changeTheme(theme){
 if(theme==='dark'){
     document.documentElement.setAttribute('data-theme','dark');
     darkLightIcon.classList.replace('fa-moon','fa-sun');
    }else{
        document.documentElement.removeAttribute('data-theme');
        darkLightIcon.classList.replace('fa-sun','fa-moon');
    }
}
// function for sidebar links

function jumpToSection(e){
const section=e.target.href;
let i=section.indexOf('#');
let removedId;
let idOfSection=section.substring(i);
idsOfSections.forEach((id,index)=>{
    if(id===idOfSection){
       removedId=idsOfSections.splice(index,1);
    }
});
   document.querySelector(removedId[0]).classList.remove('hidden');
   idsOfSections.forEach((id)=>{
    document.querySelector(id).classList.add('hidden');
   });
 idsOfSections=['#mobiles','#sports','#home','#books'];
}

// function that displays whether the user can buy all wishlisted items or not
function showResult(){
    let totalPrice=0;
    document.querySelectorAll('.priceValue').forEach((priceValue)=>{
        // to remove dollar($) sign
        let price=parseFloat(priceValue.textContent.substring(1));
        totalPrice+=price;
    });
output.classList.remove('hidden');
  let budgetValue=parseFloat(budgetInput.value);
  let difference=(budgetValue-totalPrice).toFixed(2);
    if(count!==0&&budgetValue>=totalPrice){
        document.getElementById('output-text').innerHTML =`Wohoo! You are all set to buy your wishlisted items.<br>
        Go and shop for them. <br>Happy Shopping!<br>
        Money to be Spent: $${totalPrice.toFixed(2)}<br> 
        Remaining Amount:$${difference}`;
        document.getElementById('recommendation').textContent="";
    }else{
        if(count===0){
            document.getElementById('output-text').innerHTML =`You don't have any items in your wishlist.<br>
            First add some items you wish to buy .`;
            document.getElementById('recommendation').textContent='';
        }else if(budgetInput.value===""){
             document.getElementById('output-text').innerHTML =`Enter your budget first.`;
            document.getElementById('recommendation').textContent='';
        }else{ 
            document.getElementById('output-text').innerHTML =`Oops! You are going over budget!<br>
            Your Budget:$${budgetValue}<br>Total Price of all wishlisted Items:$${totalPrice.toFixed(2)}. `;
            document.getElementById('recommendation').textContent=count>1?`Recommendation : You should remove one or more items of price greater than $${Math.abs(difference)}.`:"";
        }
    
    }
}
const increase=  document.querySelectorAll('.increase');
const decrease=  document.querySelectorAll('.decrease');
const addToWishlist=document.querySelectorAll('.add-to-wishlist');
// Event Listeners
linkForMobile.addEventListener('click',jumpToSection);
linkForSports.addEventListener('click',jumpToSection);
linkForHome.addEventListener('click',jumpToSection);
linkForBooks.addEventListener('click',jumpToSection);
increase.forEach(function(plusIcon){
    plusIcon.addEventListener('click',async function(e){
        try{
            let quantityInput=await e.target.parentElement.nextElementSibling;
            quantityInput.value++;
        }catch(e){
            console.log('Try Again!');
        }

    });
});
decrease.forEach(function(minusIcon){
    minusIcon.addEventListener('click',async function(e){
        try{
            let quantityInput=await e.target.parentElement.previousElementSibling;
            await quantityInput.value>0 &&  quantityInput.value--;
        }catch(e){
          console.log('Try Again!');
        }
 
        
    });
});
addToWishlist.forEach((button)=>{
    button.addEventListener('click',function(e){
        let quantity= parseInt(e.target.previousElementSibling.querySelector('input').value);
        let selectedProduct=e.target.parentElement.querySelector('.product-name').textContent;
        if(quantity!==0&&button.textContent==="Add to wishlist"){
            button.textContent="Remove";
            selectedItems.push(selectedProduct);
        }else{
            button.textContent="Add to wishlist";
            document.querySelectorAll('.productName').forEach((product)=>{
                selectedItems.push(product.textContent);
                product.parentElement.remove();
            });
            
             selectedItems.forEach((selectedItem,index)=>{
                   if(selectedItem===selectedProduct){
                       selectedItems.splice(index,1);
               }
                });
                count=0;
        }
    if(quantity!==0){
        updateWishlist(quantity);
    }else{
        console.log("Quantity is 0..increase it to add it to wishlist!");
    }   
    
});
});
darkLightToggle.addEventListener('click',()=>{
   mode==='light'?mode='dark':mode='light';
    
   changeTheme(mode);
        
});

showButton.addEventListener('click',showResult);
document.querySelector('.output button').addEventListener('click',()=>{
    output.classList.add('hidden');
})
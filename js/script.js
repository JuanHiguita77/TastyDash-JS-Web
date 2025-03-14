//SELECTORS
import {cleanHtmlFoodCardsContainer, cleanHtmlCart} from './cleanHtml.js';

const UrlFood = 'https://www.themealdb.com/api/json/v1/1/';

//PRODUCTS CONTAINER
const cardsContainer = document.querySelector('.cards-container .row');

//INPUT SEARCHING FOOD
const inputFood = document.querySelector('#foodSearch');

//MODAL BODY FOR ADDITIONAL FOOD INFO 
const modalFoodInfo = document.querySelector('#modalFoodInfo .modal-body');

//MODAL BODY FOR SHOPPING CART
const modalCartFood = document.querySelector('#modalCartFood .cartProducts');

//BASKET BUTTON
const basketContainer = document.querySelector('#basket-container');

//COUNTER FOOD IN BASKET
const quantityProducts = document.querySelector('#quantityProducts');

//TOTAL PRICES IN CHECKOUT
const subtotalPrice = document.querySelector('#subtotal-price');
const totalPrice = document.querySelector('#total-price');

//ANIMATION OPENER SELECTORS
const modalInfo = document.querySelector("#modalFoodInfo");
const modalShoptCart = document.querySelector("#modalCartFood");

//BUTTON CLEAN CART
const cleanStorage = document.querySelector('.cleanCart');

//CART PRODUCTS 
let shopCart = [];

//EVENTS

//DOCUMENT LOADED EVENT
document.addEventListener('DOMContentLoaded', () =>
{
    //COUNTER QUANTITY PRODUCT CART
    quantityProducts.textContent = 0;

    //MESSAGE EMPTY SHOP CART
    modalCartFood.innerHTML = `<h2 class="text-center my-5 fw-bold">¡CALM YOUR HUNGRY NOW!</h2>`;

    shopCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    quantityProducts.textContent = shopCart.length;

    //FOOD FETCHING 
    getFoods();
});

//SEARCH INPUT EVENT
inputFood.addEventListener('input', () =>
{
    setTimeout(()=>
    {
        //Fetching food data
        getFoods();
    }, 300);
});

//ADD PRODUCT CART EVENT AND OPEN MORE INFO
cardsContainer.addEventListener('click', (e) =>
{
    if(e.target.classList.contains('openModalInfo'))
    {
        const id = e.target.getAttribute('id-food')
        
        //OPEN MODAL FOOD INFO
        modalInformacion();
        loadShowMore(id);
    }

    if(e.target.classList.contains('addCart'))
    {
        const price = parseInt(e.target.parentElement.parentElement.querySelector('.priceCard').textContent);
        const titleFood = e.target.parentElement.parentElement.querySelector('.titleCartFood').textContent;
        const imgFood = e.target.parentElement.parentElement.querySelector('img').src;
        
        e.target.disabled = true;   
        quantityProducts.textContent = shopCart.length + 1;

        addProductCart(price,titleFood, imgFood);
    }
});

//ANIMATION AND TOTAL PRICES CALCULATE FIRST TIME
basketContainer.addEventListener('click', ()=>
{   
    setTimeout(()=>
    {
        const pricesTotals = document.querySelectorAll('.totalPrice');
        calculateTotalPrice(pricesTotals);  
    }, 300);


    modalCart();
    printShopCart(shopCart);

    if (shopCart.length === 0)
    {
        document.querySelector('#checkoutButton button').style.display = 'none';
    }

    if(shopCart.length > 0)
    {
        document.querySelector('#checkoutButton button').style.display = 'block';
    }
});

//CALCULATE PRICE INDIVIDUAL PRODUCT 
modalCartFood.addEventListener('change', (e) =>
{ 
    if (e.target.classList.contains('select-quantity')) {
        const pricesTotals = document.querySelectorAll('.totalPrice');

        let totalPriceIndividual = 0;
        let price = 0;
        let selectQuantityIndividual = 0;
            
        price = parseInt(e.target.parentElement.parentElement.querySelector('.priceFoodCart').textContent);
        selectQuantityIndividual = e.target.value;
            
        totalPriceIndividual = price * selectQuantityIndividual;
    
        e.target.parentElement.parentElement.querySelector('.totalPrice').textContent = totalPriceIndividual;

        calculateTotalPrice(pricesTotals);
    };
});


//CLEAN ALL CART FOOD
cleanStorage.addEventListener('click', () =>
{
    const addCart = document.querySelectorAll('.addCart');

    //RESET ALL INFORMATION
    localStorage.clear();
    shopCart = [];
    cleanHtmlCart();
    subtotalPrice.textContent = 0;
    totalPrice.textContent = 0;
    quantityProducts.textContent = 0;
    document.querySelector('#checkoutButton button').style.display = 'none';

    //ENABLE ALL ADD CART BUTTONS
    addCart.forEach(btn =>
    {
        btn.disabled = false;
    })
});

//FUNCTIONS

//CALCULATE TOTAL PRICE FOR CHECK
function calculateTotalPrice(pricesTotals)
{
    let totalPriceFull = 0;

    pricesTotals.forEach( price =>
    {
        totalPriceFull += parseInt(price.textContent);
        
        subtotalPrice.textContent = `${totalPriceFull}$`;
        totalPrice.textContent = `${totalPriceFull}$`;
    })

    if(totalPriceFull === 0)
    {
        document.querySelector('#checkoutButton button').style.display = 'none';
    }
    else
    {
        document.querySelector('#checkoutButton button').style.display = 'block';
    }
};

//Fetching food data
async function getFoods()
{
    //Food search param
    try
    {
        const response = await fetch(`${UrlFood}filter.php?i=${inputFood.value.toLowerCase()}`);
        const data = await response.json();
        
        //Print HTML Cards
        foodPrintHtml(data.meals);
    }
    catch(error)
    {
        console.log('Error en la peticion', error )
    }
};

//Print HTML Cards
function foodPrintHtml(foods)
{
    cleanHtmlFoodCardsContainer();
    
    //SEARCH MESSAGE ORDER NOW  
    cardsContainer.innerHTML = `<h2 class="text-center my-5 fw-bold">¡TYPE YOUR FAVORITE INGREDIENT FOR YOUR MEAL!</h2>`;

    if(foods)
    {
        foods.slice(0,100).forEach( food => 
        {
            const randomPrice = Math.floor(Math.random() * (25000 - 7500 + 1)) + 7500;

            cardsContainer.innerHTML += `
                <div class="card card-body col-12 col-lg-4 rounded-3 mx-3 my-5" style="width: 18rem;">  
                    <div class="text-center d-flex flex-column align-items-stretch">
                        <img src="${food.strMealThumb}" id-food=${food.idMeal} class="card-image img-fluid mx-auto my-3 rounded-3 openModalInfo" data-bs-toggle="modal" data-bs-target="#modalFoodInfo" alt="food">

                        <h2 class="card-title fw-bold mb-5 titleCartFood">${food.strMeal} </h2>
                        <h2 class="card-title fw-bold mb-5">Price $: <span class="priceCard">${randomPrice}</span> </h2>

                        <div class="fixed-bottom">
                            <button class="btn btn-dark rounded-5 text-center mb-3 addCart">Add To Cart</button>
                        </div>
                    </div>
                </div>
            `    
        });  
    }
    else
    {
        cardsContainer.innerHTML = `<h2 class="text-center my-5 fw-bold">¡SORRY, MEAL NOT FOUND!!</h2>`;    
    }

};

//MORE INFO FETCH
async function loadShowMore(id)
{
    try
    {
        const UrlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        const response = await fetch(UrlId);
        const data = await response.json();

        printShowMore(data.meals[0]);
    }
    catch(err)
    {
        console.log('Error obteniendo los detalles del alimento: ', err)
    }
};

//SHOW MORE INFO CARD CREATING
function printShowMore(foodData)
{
    const { strMeal, strArea, strMealThumb, strIngredient1, strIngredient2, strIngredient3 } = foodData;

    //Modal Info adding
    modalFoodInfo.innerHTML = 
    `
        <div class="card-body mx-auto my-auto w-100" style="width: 12rem;">

            <div class="row">
                <h3 class="card-title mt-4 mt-lg-4 mb-lg-3 text-center d-lg-none">${strMeal}</h3>

                <div class="col-lg-6 text-center">
                    <img src="${strMealThumb}" class="card-image img-fluid my-3 rounded-3 mb-2 mb-lg-3" alt="">
                </div>

                <div class="col-lg-6 text-center text-lg-start d-flex flex-column justify-content-center sub-container">
                    <h3 class="card-title mt-4 mt-lg-5 mb-lg-3 d-none d-lg-block">${strMeal}</h3>

                    <h3 class="mb-5">Area: <span class="fw-lighter">${strArea}</span></h3>
                    <h3>Principal Ingredients</h3>
                    <ul class="list-group list-group-flush fs-5">
                        <li class="list-group-item">${strIngredient1}</li>
                        <li class="list-group-item">${strIngredient2}</li>
                        <li class="list-group-item">${strIngredient3}</li>  
                    </ul>
                </div>
            </div>
        </div>
    `;
};

//FOOD OBJECT CREATING AND ADDING TO CART LOADING INDIVIDUAL CARDS INSIDE SHOPPING CART
function addProductCart(price,titleFood, imgFood)
{
    const meal = 
    {
        titleFood,
        price,
        imgFood
    }

    shopCart.push(meal);
    localStorage.setItem('shoppingCart', JSON.stringify(shopCart));

    printShopCart(shopCart);
};

//LOADING INDIVIDUAL CARDS INSIDE SHOPPING CART
function printShopCart(shopCart)
{
    cleanHtmlCart();
    
    shopCart.forEach( food =>
    {
        const { price, titleFood, imgFood} = food;

        modalCartFood.innerHTML += 
        `
            <div class="card card-body d-flex col-12 col-lg-4 rounded-3 mx-2 my-2" style="width: 17rem;">  
                <div>
                    <img src="${imgFood}" class="card-image img-fluid mx-auto my-3 rounded-3" alt="">
                    <h3 class="card-title fs-2 fs-sm-4 text-center">${titleFood}</h3>
                    <h3 class="fs-5 mt-3">PRICE
                    <span class="float-end">$</span><span class="card-price mb-3 float-end priceFoodCart">${price}</span>
                    </h3>
    
                    <div class="d-flex justify-content-between w-100">
                        <h3 class="fs-5 mb-0">QUANTITY</h3>
    
                        <select class="rounded-2 text-center select-quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="0">0</option>
                        </select>
                    </div>
    
                    <h3 class="total-title fs-5 mt-3">TOTAL
                        <span class="float-end">$</span><span class="mb-3 float-end card-price totalPrice">${price}</span>
                    </h3>
                </div>
            </div>
        `;
    });
};

//ANIMATION ADDITIONAL INFO
function modalInformacion() 
{
    //Estilo que se le aplicara al modal despues de añadirle la clase para el estilo
    modalInfo.classList.add("modal-animation-open")
};

//ANIMATION SHOPPING CART
function modalCart() 
{
    // Estilo que se le aplicara al modal despues de añadirle la clase para el estilo
    modalShoptCart.classList.add("modal-animation-open")
};



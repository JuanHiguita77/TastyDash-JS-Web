//SELECTORS
//PRODUCTS CONTAINER
const cardsContainer = document.querySelector('.cards-container .row');

//MODAL BODY FOR SHOPPING CART
const modalCartFood = document.querySelector('#modalCartFood .cartProducts');

//CLEAN MORE INFO CARD
export function cleanHtmlFoodCardsContainer()
{
    while(cardsContainer.firstChild)
    {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
};

//CLEAN PRODUCTS FOR SHOPPING CART
export function cleanHtmlCart()
{
    while(modalCartFood.firstChild)
    {
        modalCartFood.removeChild(modalCartFood.firstChild);
    }
};
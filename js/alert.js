const form = document.querySelector('.container-order-confirmation form');
const alert = document.querySelector('#alertForm');
const inputName = document.querySelector('.nameInput');
const inputTel = document.querySelector('.telInput');
const inputAddress = document.querySelector('.addressInput');

const sendButton = document.querySelector('#orderConfirmationButton');

document.addEventListener('DOMContentLoaded', () =>
{
  sendButton.disabled = true;
})

form.addEventListener('submit', e =>
{
  e.preventDefault();
  form.reset();
  sendButton.disabled = true;
})

//ANIMATION ADDITIONAL INFO
function modalInformacion()
{
  //Estilo que se le aplicara al modal despues de añadirle la clase para el estilo
  alert.classList.add("modal-animation-open")
};

function validateForm()
{
  if (inputName.value !== '' && inputTel.value !== '' && inputAddress.value !== '')   
  {
    sendButton.disabled = false;
    
  }
  else
  {
    sendButton.disabled = true;  
  }
}

inputName.addEventListener('change', validateForm);
inputTel.addEventListener('change', validateForm);
inputAddress.addEventListener('change', validateForm);

modalInformacion();


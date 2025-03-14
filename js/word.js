const dinamicWord = document.querySelector('.dinamic-ingredient');

// Arreglo de palabras
const words = ["DELICIOUS", "EXQUISITE", "TASTY", "GORGEOUS", "EXCEPTIONAL"]; 

// Índice de la palabra actual
let currentIndex = 0;

// Función para mostrar la siguiente palabra
function showNextWord() 
{
  // Limpia el área de palabras antes de mostrar la siguiente
  dinamicWord.innerHTML = '';

  // Obtiene la palabra actual y su longitud
  let currentWord = words[currentIndex];
  let wordLength = currentWord.length;

  // Recorre la palabra y crea elementos para cada letra
  for (let i = 0; i < wordLength; i++) 
  {
    // Crea un nuevo span para cada letra
    const span = document.createElement("span");
    span.textContent = currentWord[i];

    span.style.opacity = 0; // Configura la opacidad inicialmente a 0
    dinamicWord.appendChild(span);

    // Llama a la función que hace que las letras aparezcan gradualmente
    fadeIn(span, i * 100); // Añade un pequeño retraso para efecto de aparición gradual
  }

  // Incrementa el índice para apuntar a la siguiente palabra
  currentIndex = (currentIndex + 1) % words.length;
}

// Función para hacer que las letras aparezcan gradualmente
function fadeIn(element, delay) 
{
  setTimeout(() => 
  {
    let opacity = 0;
    let interval = setInterval( () => 
    {
        if (opacity < 1) 
        {
            opacity += 0.1;
            element.style.opacity = opacity;

        } 
        else 
        {
            clearInterval(interval);
        }
    }, 50);
  }, delay);
}

// Muestra la primera palabra
showNextWord();

// Temporizador para cambiar automáticamente las palabras cada 5 segundos
setInterval(showNextWord, 1500);
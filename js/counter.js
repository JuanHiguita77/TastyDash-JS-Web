counter('count1', 0, 1287, 1000);
counter('count2', 0, 3055, 2000);
counter('count3', 0, 1355, 3000);
counter('count4', 0, 2532, 1000);

//COUNTER SECTION
function counter(id, start, end, duration) {
  let element = document.getElementById(id),
    current = start,
    range = end - start,
    increment = end > start ? 1 : -1,
    step = Math.abs(Math.floor(duration / range)),
    timer = setInterval(() => {
      current += increment;
      element.textContent = current;

      if (current === end) {
        //Paramos el intervalo
        clearInterval(timer)
      }
    }, step);
};

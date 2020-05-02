const div_clock = document.querySelector(".div_clock_js");
const clock = div_clock.querySelector("h3");

function times(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}

function init(){
  times();
  setInterval(times,1000);
}

init();

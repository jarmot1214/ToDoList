form_greeting = document.querySelector(".form_greeting_js");
input_greeting = form_greeting.querySelector("input");
greeting = document.querySelector(".h1_greeting_js");

const USER_LS = "currentUser";
const SHOWING = "showing";

function saveName(name){
  localStorage.setItem(USER_LS,name);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input_greeting.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  form_greeting.classList.add(SHOWING);
  form_greeting.addEventListener("submit",handleSubmit)
}

function  paintGreeting(text){
  form_greeting.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerText = `Hello ${text}!!`
}

function loadUser(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init(){
  loadUser();
}

init();

const form_todo = document.querySelector(".form_todo_js");
const input_todo = form_todo.querySelector("input");
const ul_todo = document.querySelector(".ul_todo_js");

const TODOS_LS = "currentToDos";
let toDos = [];

function deleteToDos(event){
  const btn = event.target;
  const del = btn.parentNode;
  ul_todo.removeChild(del);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(del.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDos(text){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click",deleteToDos);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  ul_todo.appendChild(li);
  const toDosOBJ = {
    text,
    id : newId
  };
  toDos.push(toDosOBJ);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input_todo.value;
  paintToDos(currentValue);
  input_todo.value = "";
}

function loadToDos(){
  const currentToDos = localStorage.getItem(TODOS_LS);
  if (currentToDos !== null) {
    const parsedToDos = JSON.parse(currentToDos);
    parsedToDos.forEach(function(toDo){
      paintToDos(toDo.text);
    });
  }
}

function init(){
  loadToDos();
  form_todo.addEventListener("submit",handleSubmit);
}

init();

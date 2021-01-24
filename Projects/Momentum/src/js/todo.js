/*
Local storage에는, 자바스크립트의 data를 저장할 수 없다.
(오직 string 형식의 값만 가능)

-> 즉, js는 local storage에 있는 모든 데이터를 string으로 저장한다.
*/
const toDoListContainer = document.querySelector(".js-toDoList-wrapper"),
  toDoListWindow = toDoListContainer.querySelector(".js-toDoList-window"),
  closeBtn = toDoListContainer.querySelector("#js-toDoList-header__close"),
  toggleBtn = toDoListContainer.querySelector("button");

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function DeleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  SaveToDos();
}

function SaveToDos() {
  /*
	JSON.stringify(value)
	JSON.stringify(value, replacer)
	-> 자바스크립트의 object를 string으로 바꾸어준다.
	(+)=> JSON(JavaScript Object Notation), 즉 데이터를 전달할 때, 자바스크립트가  그걸 다룰 수 있도록 object로 바꾸어 주는 기능(또는 obj->value)을 수행.*/
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function PaintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", DeleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  SaveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  PaintToDo(currentValue);
  toDoInput.value = "";
}

function LoadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    // console.table([loadedToDos, JSON.parse(loadedToDos)]);
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach(function (toDo) {
      PaintToDo(toDo.text);
    });
  }
}

function init() {
  LoadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

toggleBtn.addEventListener("click", function () {
  toDoListWindow.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  toDoListWindow.style.display = "none";
});

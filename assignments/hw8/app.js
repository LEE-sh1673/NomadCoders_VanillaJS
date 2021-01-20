// Const variables for macro.
const PENDING = 0;
const FINISHED = 1;

const RAND_MAX = 1e15;
const RAND_MIN = 1;

// Objects for local storage and DOM manipulation.
const boards = [
  {
    id: PENDING, // equal to 0
    key: "PENDING",
    toDos: [],
  },
  {
    id: FINISHED, // equal to 1
    key: "FINISHED",
    toDos: [],
  },
];

// DOM elements.
const jsForm = document.querySelector(".js-toDoForm"),
  toDoInput = jsForm.querySelector("input");

const toDoList = Array.from(document.querySelectorAll(".js-toDoList"));
const toDoListItemCount = Array.from(
  document.querySelectorAll(".toDoList__item-count")
);

// get random non-negative number {range: [min, max)}
function getRandomInt() {
  return Math.floor(Math.random() * (RAND_MAX - RAND_MIN)) + RAND_MIN;
}

// Update number of tasks in all boards ('pending' and 'finished')
function UpdateItemCount({ id, toDos }) {
  toDoListItemCount[id].innerText = toDos.length;
}

function SaveBoard({ key, toDos }) {
  localStorage.setItem(key, JSON.stringify(toDos));
}

function DeleteToDo(event, board) {
  const toDos = board.toDos;
  const boardType = board.id;

  // get parentNode (get list item to delete.)
  const btn = event.target;
  const li = btn.parentNode;

  // remove item on DOM element.
  toDoList[boardType].removeChild(li);

  // remove item to delete. (filtered toDos)
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });

  // update board's to-Do list.
  board.toDos = cleanToDos;
  SaveBoard(board);
  UpdateItemCount(board);
}

function MoveToDo(event, board) {
  const btn = event.target;
  const itemValue = btn.parentNode.querySelector("span").innerText;

  if (board.id === PENDING) {
    DeleteToDo(event, board);
    PaintBoard(boards[FINISHED], itemValue);
  } else {
    DeleteToDo(event, board);
    PaintBoard(boards[PENDING], itemValue);
  }
}

function PaintBoard(board, text) {
  // get board information.
  const toDos = board.toDos;
  const boardType = board.id;

  // create elements for new list item.
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");

  // assign new id for new item.
  const newId = getRandomInt(); //toDos.length + 1;

  // assign values below:
  span.innerText = text;

  // assign delete button value & property.
  delBtn.innerText = "❌";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", function (event) {
    DeleteToDo(event, board);
  });

  // assign check button value & property.
  if (boardType === PENDING) {
    chkBtn.innerText = "✅";
  } else {
    chkBtn.innerText = "🔙";
  }
  chkBtn.classList.add("check");
  chkBtn.addEventListener("click", (event) => {
    MoveToDo(event, board);
  });

  // assign id & values into new item.
  li.id = newId;
  li.append(chkBtn, span, delBtn);
  toDoList[boardType].appendChild(li);

  const toDoObj = {
    id: newId,
    text: text,
  };
  board.toDos.push(toDoObj);
  SaveBoard(board);
  UpdateItemCount(board);
}

function handleSubmit(event) {
  event.preventDefault();
  PaintBoard(boards[PENDING], toDoInput.value);
  toDoInput.value = "";
}

function LoadBoards() {
  boards.forEach(function (board) {
    // get storage item by key.
    const toDos = localStorage.getItem(board.key);

    if (toDos !== null) {
      const parsedTodos = JSON.parse(toDos);
      parsedTodos.forEach(function (toDo) {
        PaintBoard(board, toDo.text);
      });
    }
  });
}

function init() {
  LoadBoards();
  jsForm.addEventListener("submit", handleSubmit);
}

init();

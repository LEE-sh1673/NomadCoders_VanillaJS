const PENDING = 0;
const FINISHED = 1;

// Objects for local storage and DOM manipulation.
const taskObjs = [
  {
    id: PENDING, // equal to 0
    name: "PENDING",
    tasks: [],
  },
  {
    id: FINISHED, // equal to 1
    name: "FINISHED",
    tasks: [],
  },
];

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};

// to-do list wrapper elements.
const toDoFormWrapper = document.querySelector(".js-toDoList-wrapper"),
  toDoListWindow = toDoFormWrapper.querySelector("div"),
  toDoToggleBtn = toDoFormWrapper.querySelector("button");

// to-do lists.
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector("[data-pending-list]");
const finishedList = document.querySelector("[data-finished-list]");

// count elements.
const pendingTasks = document.querySelector("[data-pending-tasks]");
const finishedTasks = document.querySelector("[data-finished-tasks]");

// btn toggle event.
toDoToggleBtn.addEventListener("click", function () {
  toDoListWindow.classList.toggle("showing--flex");
});

function UpdateTaskCount(id) {
  if (id === PENDING) {
    pendingTasks.innerText = taskObjs[PENDING].tasks.length;
  } else {
    finishedTasks.innerText = taskObjs[FINISHED].tasks.length;
  }
}

function AppendTaskObj(taskList, taskObj) {
  taskList.tasks.push(taskObj);
}

function CreateTaskObj(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function FilterTaskObj(taskList, taskObjId) {
  taskList.tasks = taskList.tasks.filter(function (task) {
    return task.id !== taskObjId;
  });
}

function FindTaskObj(taskList, targetId) {
  const taskObj = taskList.tasks.find(function (task) {
    return task.id === targetId;
  });
  return taskObj;
}

function LoadFinishedList(taskList) {
  const parsedTasks = JSON.parse(taskList);
  parsedTasks.forEach(function (task) {
    PaintFinishedTask(task);
  });
  UpdateTaskCount(FINISHED);
}

function LoadPendingList(taskList) {
  const parsedTasks = JSON.parse(taskList);
  parsedTasks.forEach(function (task) {
    PaintPendingTask(task);
  });
  UpdateTaskCount(PENDING);
}

function SaveTaskList(taskList) {
  localStorage.setItem(taskList.name, JSON.stringify(taskList.tasks));
}

function SwapTask(event) {
  const currentList = Number(!this.checked);
  const li = event.target.parentNode;
  const targetTaskObj = FindTaskObj(taskObjs[currentList], li.id);

  switch (currentList) {
    case PENDING:
      DeletePendingTask(event);
      PaintFinishedTask(targetTaskObj);
      break;
    case FINISHED:
      DeleteFinishedTask(event);
      PaintPendingTask(targetTaskObj);
      break;
    default:
      throw new Error("Unexpected task-list received.");
  }
}

function DeletePendingTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  //   FilterTaskObj(taskObjs[PENDING], li.id);
  taskObjs[PENDING].tasks = taskObjs[PENDING].tasks.filter(function (task) {
    return task.id !== li.id;
  });
  SaveTaskList(taskObjs[PENDING]);
  UpdateTaskCount(PENDING);
}

function DeleteFinishedTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  //   FilterTaskObj(taskObjs[FINISHED], li.id);
  taskObjs[FINISHED].tasks = taskObjs[FINISHED].tasks.filter(function (task) {
    return task.id !== li.id;
  });
  SaveTaskList(taskObjs[FINISHED]);
  UpdateTaskCount(FINISHED);
}

function CreateTaskElement(listId, text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBox = document.createElement("input");

  span.innerText = text;
  delBtn.innerText = "Ｘ";
  checkBox.type = "checkbox";

  if (listId == PENDING) {
    delBtn.addEventListener("click", DeletePendingTask);
    checkBox.checked = false;
  } else {
    delBtn.addEventListener("click", DeleteFinishedTask);
    checkBox.checked = true;
  }
  checkBox.addEventListener("change", SwapTask);
  li.append(checkBox, span, delBtn);
  return li;
}

function PaintPendingTask(taskObj) {
  const listItem = CreateTaskElement(PENDING, taskObj.text);
  listItem.id = taskObj.id;
  pendingList.appendChild(listItem);
  taskObjs[PENDING].tasks.push(taskObj);
  //   AppendTaskObj(taskObjs[PENDING], taskObj);
  SaveTaskList(taskObjs[PENDING]);
  UpdateTaskCount(PENDING);
}

function PaintFinishedTask(taskObj) {
  const listItem = CreateTaskElement(FINISHED, taskObj.text);
  listItem.id = taskObj.id;
  finishedList.appendChild(listItem);
  taskObjs[FINISHED].tasks.push(taskObj);
  //   AppendTaskObj(taskObjs[FINISHED], taskObj);
  SaveTaskList(taskObjs[FINISHED]);
  UpdateTaskCount(FINISHED);
}

function handleSubmit(event) {
  event.preventDefault();
  const newTaskObj = CreateTaskObj(toDoInput.value);
  PaintPendingTask(newTaskObj);
  toDoInput.value = "";
}

function LoadTaskLists() {
  taskObjs.forEach(function (taskObj) {
    // get storage item by key.
    const taskList = localStorage.getItem(taskObj.name);

    if (taskList !== null) {
      switch (taskObj.id) {
        case PENDING:
          LoadPendingList(taskList);
          break;
        case FINISHED:
          LoadFinishedList(taskList);
          break;
        default:
          throw new Error("Unexpected taskList received.");
      }
    }
  });
}

function init() {
  LoadTaskLists();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

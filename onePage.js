const plusbtn = document.getElementById("navigateAdd");
const mainDiv = document.getElementById("divList");
let str = [];
let currentEditTaskName = null;

const inputEdit = document.getElementById("taskInputEdit");
inputEdit.addEventListener("input", () => {
  if (inputEdit.value.trim() == "") {
    showAlertEdit("Task title can't be empty");
  } else {
    hideAlert();
  }
});
const inputText = document.getElementById("taskInput");
inputText.addEventListener("input", () => {
  if (inputText.value.trim() == "") {
    showAlertAdd("Task title can't be empty");
  } else if (str.some((task) => task.Task === inputText.value)) {
    showAlertAdd("Task already found in your list items");
  } else {
    hideAlert();
  }
});

window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks && savedTasks !== "[]") {
    str = JSON.parse(savedTasks);
    document.getElementById("status").innerHTML = "Your Tasks: ";

    Rebuild();
  }
};

const btnUpdate = document.getElementById("btnUpdate");
btnUpdate.addEventListener("click", () => updateTask());
const btnCancel = document.getElementById("btnCancel");
btnCancel.addEventListener("click", () => {
  reset();
  setTimeout(() => {
    location.href = "addFirst.html";
  }, 100);
});

plusbtn.addEventListener("click", () => {
  document.getElementById("container1").style.display = "none";
  document.getElementById("container2").style.display = "block";
});

// const input = document.getElementById("taskInput");
const form = document.getElementById("task-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputText.value.trim() == "") {
    showAlertAdd("Task title can't be empty");
    return;
  }

  if (str.some((task) => task.Task === inputText.value.trim())) {
    showAlertAdd("Task already found in your list items");
    return;
  } else hideAlert();
  add(event);
});

const add = (event) => {
  event.preventDefault();
  let txtTask = document.getElementById("taskInput").value.trim();
  const txtSub = document.getElementById("taskInputSub").value;
  const txtDesc = document.getElementById("taskInputDesc").value;

  const btnDelete = document.createElement("button");
  const btnEdit = document.createElement("button");

  const newTask = { Task: txtTask, Sub: txtSub, Desc: txtDesc };
  str.push(newTask);

  const txtLI = document.createElement("li");
  txtLI.dataset.task = txtTask;

  btnEdit.textContent = "Edit";

  btnDelete.textContent = "Delete";

  txtLI.innerHTML = `Task: ${newTask.Task}<br>Subtitle: ${newTask.Sub}<br><div id="hidden">Description: ${newTask.Desc}</div> `;

  showToast("Item added successfully!");
  document.getElementById("status").innerHTML = "Your Tasks: ";

  document.getElementById("taskInput").value = "";
  document.getElementById("taskInputSub").value = "";
  document.getElementById("taskInputDesc").value = "";

  document.getElementById("taskInput").focus();
  localStorage.setItem("tasks", JSON.stringify(str));
  hideAlert();

  // if (window.opener && !window.opener.closed) {
  //   window.opener.focus();
  // }
  Rebuild();
  setTimeout(() => {
    document.getElementById("container2").style.display = "none";
    document.getElementById("container1").style.display = "block";
  }, 1000);
};

function showAlertAdd(txt) {
  document.getElementById("mainAlert1").style.display = "flex";
  document.getElementById("inputAlert1").innerText = txt;
  document.getElementById("AlertIcon1").style.display = "inline";

  const input2 = document.getElementById("taskInput");

  input2.style.borderColor = "";
  input2.classList.add("error");
}
function showAlertEdit(txt) {
  document.getElementById("mainAlert2").style.display = "flex";
  document.getElementById("inputAlert2").innerText = txt;
  document.getElementById("AlertIcon2").style.display = "inline";
  const input = document.getElementById("taskInputEdit");

  input.style.borderColor = "";
  input.classList.add("error");
}

function hideAlert() {
  document.getElementById("mainAlert1").style.display = "none";
  document.getElementById("AlertIcon1").style.display = "none";
  document.getElementById("mainAlert2").style.display = "none";
  document.getElementById("AlertIcon2").style.display = "none";

  const input = document.getElementById("taskInput");
  input.classList.remove("error");
  input.style.borderColor = "";
}

function showToast(text) {
  const popup = document.getElementById("toast");
  popup.textContent = text;

  popup.style.visibility = "visible";
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.visibility = "hidden";
    }, 300);
  }, 1000);
}

function Rebuild() {
  document.getElementById("divList").innerHTML = "";
  str.forEach((task) => {
    const txtLI = document.createElement("li");
    txtLI.dataset.task = task.Task;
    txtLI.innerHTML = ` Task: ${task.Task}<br> Subtitle: ${task.Sub}<br><div id="hidden">Description: ${task.Desc}</div> `;

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("edit");

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.classList.add("delete");

    txtLI.appendChild(btnEdit);
    txtLI.appendChild(btnDelete);
    mainDiv.appendChild(txtLI);

    txtLI.classList.add("task-item");

    btnDelete.addEventListener("click", () => deleteTask(txtLI, str));
    btnEdit.addEventListener("click", () => editTask(txtLI, str));

    txtLI.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() !== "button") {
        viewTask(txtLI, str);
      }
    });
  });
}
function deleteTask(txtLI, str) {
  const taskName = txtLI.dataset.task;
  const index = str.findIndex((task) => task.Task === taskName);
  const currentEditTaskNameDelete = localStorage.getItem("currentTask");

  str.splice(index, 1);
  txtLI.remove();

  localStorage.setItem("tasks", JSON.stringify(str));

  if (str.length == 0)
    document.getElementById("status").innerHTML = "No ToDo's";
}

window.addEventListener("storage", () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks && savedTasks !== "[]") {
    str = JSON.parse(savedTasks);
    document.getElementById("status").innerHTML = "Your Tasks: ";

    Rebuild();
  } else {
    document.getElementById("status").innerHTML = "No ToDo's";
  }
});
function editTask(txtLI, str) {
  hideAlert();

  document.getElementById("container1").style.display = "none";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container3").style.display = "block";
  const taskName = txtLI.dataset.task;
  const index = str.findIndex((task) => task.Task === taskName);

  document.getElementById("taskInputEdit").value = str[index].Task;

  document.getElementById("taskInputSubEdit").value = str[index].Sub;
  document.getElementById("taskInputDescEdit").value = str[index].Desc;

  currentEditTaskName = taskName;
}
document
  .getElementById("btnUpdate")
  .addEventListener("click", () => updateTask(str, txtLI));

function updateTask() {
  const updatedTask = document.getElementById("taskInputEdit").value.trim();
  const updatedSub = document.getElementById("taskInputSubEdit").value.trim();
  const updatedDesc = document.getElementById("taskInputDescEdit").value.trim();

  if (!updatedTask) {
    showAlertEdit("Task Name can't be empty...");
    return;
  }

  const index = str.findIndex((task) => task.Task === currentEditTaskName);
  if (index === -1) return;

  str[index].Task = updatedTask;
  str[index].Sub = updatedSub;
  str[index].Desc = updatedDesc;

  reset();
  Rebuild();
  hideAlert();
  localStorage.setItem("tasks", JSON.stringify(str));
}
function reset() {
  document.getElementById("taskInputEdit").value = "";
  document.getElementById("taskInputSubEdit").value = "";
  document.getElementById("taskInputDescEdit").value = "";

  currentEditTaskName = null;

  document.getElementById("container1").style.display = "block";
  document.getElementById("container3").style.display = "none";
}
function cancel(){
  document.getElementById('container3').style.display = "none";
  document.getElementById('container1').style.display = "block";
}
function viewTask(txtLI, str) {
  const taskName = txtLI.dataset.task;
  const index = str.findIndex((task) => task.Task === taskName);
  if (
    txtLI.innerHTML ==
    `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}<br>Description: ${str[index].Desc}<br><button class="edit">Edit</button><button class="delete">Delete</button>`
  ) {
    const Task = `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}`;
    txtLI.innerHTML =
      Task +
      `<br><button class="edit">Edit</button><button class="delete">Delete</button>`;
    const btnDeleteNew = txtLI.querySelector(".delete");
    const btnEditNew = txtLI.querySelector(".edit");

    btnDeleteNew.addEventListener("click", () => deleteTask(txtLI, str));
    btnEditNew.addEventListener("click", () => editTask(txtLI, str));
  } else {
    const Task = `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}<br>Description: ${str[index].Desc}`;
    txtLI.innerHTML =
      Task +
      `<br><button class="edit">Edit</button><button class="delete">Delete</button>`;
    const btnDeleteNew = txtLI.querySelector(".delete");
    const btnEditNew = txtLI.querySelector(".edit");

    btnDeleteNew.addEventListener("click", () => deleteTask(txtLI, str));
    btnEditNew.addEventListener("click", () => editTask(txtLI, str));
  }
} 
const plusbtn = document.getElementById("navigateAdd");
const mainDiv = document.getElementById("divList");
let str = [];
let page2;

// setInterval(() => {
//   location.reload();
// }, 20000);
plusbtn.addEventListener("click", () => {
  // if (!page2 || page2.closed) {
  //   // page2 = window.open("add2.html", "NewToDo");

  // } else {
  //   page2.focus();
  // }
  location.href = `add2.html`;
});

window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks && savedTasks !== "[]") {
    str = JSON.parse(savedTasks);
    document.getElementById("status").innerHTML = "Your Tasks: ";

    Rebuild();
  }
};
window.addEventListener("storage", () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks && savedTasks !== "[]") {
    str = JSON.parse(savedTasks);
    document.getElementById("status").innerHTML = "Your Tasks: ";

    Rebuild();
  } else document.getElementById("status").innerHTML = "No ToDo's";
});

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
   const currentEditTaskName = localStorage.getItem("currentTask");
  //  if(str[index].Task == currentEditTaskName )
  // {
  //   let page3 = window.open('edit.html','Edit ToDo');
  //   page3.location.reload();
  // }
  str.splice(index, 1);
  txtLI.remove();
 
 
  localStorage.setItem("tasks", JSON.stringify(str));
  // console.log(str);
  
  if (str.length == 0)
    document.getElementById("status").innerHTML = "No ToDo's";
  
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
function editTask(txtLI, str) {
  const taskName = txtLI.dataset.task;
  const index = str.findIndex((task) => task.Task === taskName);
  // localStorage.setItem("index", index.toString());
  const currentEditTaskName = taskName;
  // localStorage.setItem("currentTask", currentEditTaskName.toString());
  // window.open("edit.html", "Edit ToDo");
  location.href = `edit.html?id=${index}&taskN=${currentEditTaskName}`;
}

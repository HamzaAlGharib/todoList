const main = document.getElementById("task-list");
const mainDiv = document.getElementById("divList");
let currentEditTaskName = null;

let str = [];

document.getElementById("btnUpdate").addEventListener("click", () => updateTask());
document.getElementById("btnCancel").addEventListener("click" , () => reset());
hideAlert();



window.onload = () => {
  
  
  const savedTasks = localStorage.getItem('tasks');
  if(savedTasks){
  str = JSON.parse(savedTasks);
  Rebuild();
  }
  document.getElementById("taskInput").focus();
};

  const input = document.getElementById("taskInput");
  input.addEventListener('input', () => {
  if (input.value.trim() == "") {
   
    showAlert("Task title can't be empty");
 } 
  else if (str.some(task => task.Task ===  input.value)) {
 
  showAlert("Task already found in your list items");
  
}

 else {
  
  hideAlert();

 }
 
});
const form = document.getElementById("task-form");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value.trim() == "") {
    showAlert("Task title can't be empty");
    return; 
  }

  if (str.some(task => task.Task === input.value.trim())) {
    showAlert("Task already found in your list items");
    return; 
  }
  else
    hideAlert();
  add(event);
});



const add = (event) => {
    event.preventDefault();
  
  let txtTask = document.getElementById("taskInput").value.trim();
  const txtSub = document.getElementById("taskInputSub").value;
  const txtDesc = document.getElementById("taskInputDesc").value;
  

  const btnDelete = document.createElement("button");
  const btnEdit = document.createElement("button");

  const newTask={"Task": txtTask ,"Sub": txtSub ,"Desc":txtDesc };
  str.push(newTask);
  

  const txtLI = document.createElement("li");
  txtLI.dataset.task = txtTask;

  btnEdit.textContent = "Edit";

  btnDelete.textContent = "Delete";
 
   txtLI.innerHTML = `Task: ${newTask.Task}<br>Subtitle: ${newTask.Sub}<br><div id="hidden">Description: ${newTask.Desc}</div> `;
  
 
  mainDiv.appendChild(txtLI);
  txtLI.appendChild(btnEdit);
  txtLI.appendChild(btnDelete);
  
   btnDelete.addEventListener("click", () => deleteTask(txtLI,str));
  btnEdit.addEventListener("click", () => editTask(txtLI,str));

  txtLI.addEventListener("click" , (e) => {
  if (e.target.tagName.toLowerCase() !== "button") {
    viewTask(txtLI,  str);
  }
});

  document.getElementById("taskInput").value = "";
  document.getElementById("taskInputSub").value = "";
  document.getElementById("taskInputDesc").value = "";

  txtLI.classList.add("task-item");
  btnEdit.classList.add("edit");
  btnDelete.classList.add("delete");
  document.getElementById("taskInput").focus();
  localStorage.setItem('tasks',JSON.stringify(str));
  
}
// end add function

 
document.getElementById("taskInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
     if (input.value.trim() == "") {
    showAlert("Task title can't be empty ");
    return; 
  }

  if (str.some(task => task.Task === input.value.trim())) {
    showAlert("Task already found in your list items ");
    return; 
  }
  else
    hideAlert();
  add(event);
  }
});


function deleteTask(txtLI,str) {
  hideAlert();

  const taskName = txtLI.dataset.task;
  const index = str.findIndex(task => task.Task === taskName);
  str.splice(index,1);  
   txtLI.remove();
   localStorage.setItem('tasks', JSON.stringify(str));
   
   
}


function editTask(txtLI,str) {
  hideAlert();
  const taskName = txtLI.dataset.task;
  const index = str.findIndex(task => task.Task === taskName);

  document.getElementById("taskInput").value = str[index].Task;
  document.getElementById("taskInputSub").value = str[index].Sub;
  document.getElementById("taskInputDesc").value = str[index].Desc;

  currentEditTaskName = taskName;
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("edit-buttons").style.display = "block";
  document.getElementById("task-form").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
     if (input.value.trim() == "") {
    showAlert("Task title can't be empty");
    return; 
  }

  // if (str.some(task => task.Task === input.value.trim())) {
  //   showAlert("Task already found in your list items ");
  //   return; 
  // }
  else
  // hideAlert();
  updateTask();
  
  }
});
  
}
 

  function updateTask(){
    const updatedTask = document.getElementById("taskInput").value.trim();
    const updatedSub = document.getElementById("taskInputSub").value.trim();
    const updatedDesc = document.getElementById("taskInputDesc").value.trim();

    if (!updatedTask) {
    // alert("Task Name can't be empty...");
    showAlert("Task Name can't be empty...");
    return;
  }
  
  const index = str.findIndex(task => task.Task === currentEditTaskName);
  if (index === -1) 
      return;

    
    str[index].Task = updatedTask;
    str[index].Sub = updatedSub;
    str[index].Desc = updatedDesc;
   
    
    reset();
    Rebuild();
    hideAlert();
    localStorage.setItem('tasks', JSON.stringify(str));

  }
  function reset (){
    document.getElementById("taskInput").value = "";
    document.getElementById("taskInputSub").value = "";
    document.getElementById("taskInputDesc").value = "";

    currentEditTaskName = null;

    document.getElementById("btnAdd").style.display = "block";
    document.getElementById("edit-buttons").style.display = "none"; 


  }
 function Rebuild() {
  mainDiv.innerHTML = ""; 

  str.forEach(task => {
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

    
    

    btnDelete.addEventListener("click", () => deleteTask(txtLI,str));
    btnEdit.addEventListener("click", () => editTask(txtLI,str));

    txtLI.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() !== "button") {
        viewTask(txtLI,str);
      }
    });
  });
}


function viewTask(txtLI,str){
  
  const taskName = txtLI.dataset.task;
  const index = str.findIndex(task => task.Task === taskName);
  if(txtLI.innerHTML == `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}<br>Description: ${str[index].Desc}<br><button class="edit">Edit</button><button class="delete">Delete</button>`){
    const Task = `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}`;
    txtLI.innerHTML = Task +`<br><button class="edit">Edit</button><button class="delete">Delete</button>`; 
    const btnDeleteNew = txtLI.querySelector(".delete");
 const btnEditNew = txtLI.querySelector(".edit");

  btnDeleteNew.addEventListener("click", () => deleteTask(txtLI,str));
  btnEditNew.addEventListener("click", () => editTask(txtLI, str));
  }
  else{
 
 const Task = `Task: ${str[index].Task}<br>Subtitle: ${str[index].Sub}<br>Description: ${str[index].Desc}`;
 txtLI.innerHTML = Task + `<br><button class="edit">Edit</button><button class="delete">Delete</button>`;  
 const btnDeleteNew = txtLI.querySelector(".delete");
 const btnEditNew = txtLI.querySelector(".edit");

  btnDeleteNew.addEventListener("click", () => deleteTask(txtLI,str));
  btnEditNew.addEventListener("click", () => editTask(txtLI, str));
  
  }

}
function hideAlert(){
 document.getElementById("mainAlert").style.display = "none";
  document.getElementById("AlertIcon").style.display = "none";
  const input = document.getElementById("taskInput");
  input.classList.remove("error");
  input.style.borderColor = "";
}
function showAlert(txt){
    document.getElementById("mainAlert").style.display = "flex";
    document.getElementById("inputAlert").innerText = txt;
    document.getElementById("AlertIcon").style.display = "inline";
    const input = document.getElementById("taskInput");
    input.style.borderColor = "";
    input.classList.add("error");


}
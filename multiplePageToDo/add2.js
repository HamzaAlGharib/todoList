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
  
  showToast("Item added successfully!");

  document.getElementById("taskInput").value = "";
  document.getElementById("taskInputSub").value = "";
  document.getElementById("taskInputDesc").value = "";

  document.getElementById("taskInput").focus();
  localStorage.setItem('tasks',JSON.stringify(str));
  hideAlert();
  
  // if (window.opener && !window.opener.closed) {
  //   window.opener.focus(); 
  // }
  setTimeout(() =>{
    location.href = ('addFirst.html');
  },1000);
  
}


 
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

  function reset (){
    document.getElementById("taskInput").value = "";
    document.getElementById("taskInputSub").value = "";
    document.getElementById("taskInputDesc").value = "";

    currentEditTaskName = null;

    document.getElementById("btnAdd").style.display = "block";
    document.getElementById("edit-buttons").style.display = "none"; 


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

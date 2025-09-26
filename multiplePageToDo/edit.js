let str = [];
const input = document.getElementById("taskInput");
input.addEventListener("input", () => {
  if (input.value.trim() == "") {
    showAlert("Task title can't be empty");
  } else {
    hideAlert();
  }
});

const btnUpdate = document.getElementById("btnUpdate");
btnUpdate.addEventListener("click", () => updateTask());
const btnCancel = document.getElementById("btnCancel");
btnCancel.addEventListener("click", () => {
  reset();
  setTimeout(() => {
    location.href = ('addFirst.html');
  },100);

});

window.onload = () => {
  // const index = parseInt(localStorage.getItem("index"), 10);
  const params =new URLSearchParams(window.location.search);
  const index = params.get('id');

  // console.log(index);
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks && savedTasks != "[]") {
    str = JSON.parse(savedTasks);
    // const currentEditTaskName = localStorage.getItem("currentTask");
    const currentEditTaskName = params.get('taskN');
    // console.log(currentEditTaskName);
    if(str[index].Task == currentEditTaskName){
    document.getElementById("taskInput").value = str[index].Task;
    document.getElementById("taskInputSub").value = str[index].Sub;
    document.getElementById("taskInputDesc").value = str[index].Desc;
    document.getElementById("taskInput").focus();
    }
    else{
      document.getElementById("taskInput").value = "";
    document.getElementById("taskInputSub").value = "";
    document.getElementById("taskInputDesc").value = "";

    }
    
  } else {
    alert("no items to edit");
    // window.close("edit.html", "Edit ToDo");
    location.href('addFirst.html');
  }
};

function updateTask() {
  const updatedTask = document.getElementById("taskInput").value.trim();
  const updatedSub = document.getElementById("taskInputSub").value.trim();
  const updatedDesc = document.getElementById("taskInputDesc").value.trim();

  if (!updatedTask) {
    showAlert("Task Name can't be empty...");
    return;
  }

  // const currentEditTaskName = localStorage.getItem("currentTask");
  const params = new URLSearchParams(window.location.search);
  const currentEditTaskName = params.get('taskN');
  // console.log(currentEditTaskName);
  const index = str.findIndex((task) => task.Task === currentEditTaskName);
  if (index === -1) 
    {
      document.getElementById('toast').style.backgroundColor = "red";
      showToast("You can't update a nonexisting task...");
      return;
    }
  str[index].Task = updatedTask;
  str[index].Sub = updatedSub;
  str[index].Desc = updatedDesc;
  

  showToast("Item edited successfully!");
  localStorage.setItem("tasks", JSON.stringify(str));
  reset();
  hideAlert();
}
function showAlert(txt) {
  document.getElementById("mainAlert").style.display = "flex";
  document.getElementById("inputAlert").innerText = txt;
  document.getElementById("AlertIcon").style.display = "inline";
  const input = document.getElementById("taskInput");
  input.style.borderColor = "";
  input.classList.add("error");
}
function hideAlert() {
  document.getElementById("mainAlert").style.display = "none";
  document.getElementById("AlertIcon").style.display = "none";
  const input = document.getElementById("taskInput");
  input.classList.remove("error");
  input.style.borderColor = "";
}
function reset() {
  document.getElementById("taskInput").value = "";
  document.getElementById("taskInputSub").value = "";
  document.getElementById("taskInputDesc").value = "";
  return;

}
function showToast(text) {
  const popup = document.getElementById("toast");
  popup.textContent = text;

  popup.style.visibility = "visible";
  popup.style.opacity = "1";
   const params = new URLSearchParams(window.location.search);
  const currentEditTaskName = params.get('taskN');
  // console.log(currentEditTaskName);
  const index = str.findIndex((task) => task.Task === currentEditTaskName);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.visibility = "hidden";
    }, 300);
    // window.close();
    // window.opener.focus();
    location.href = ('addFirst.html');
  }, 1000);
}

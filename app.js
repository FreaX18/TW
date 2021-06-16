const input = document.querySelector(".input"); 
const button = document.querySelector(".do"); 
const list = document.querySelector(".list"); 
const filterOption = document.querySelector('.filter-tasks');

//event listeners
document.addEventListener("DOMContentLoaded", getTasks);
button.addEventListener("click", addTask);
list.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTasks);

function addTask(event){
    event.preventDefault();
    //Task div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    //create LI
    const newTask = document.createElement('li');
    newTask.innerText = input.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);
    //add tasks to localStorage
    saveTasks(input.value);
    //important button
    const importantButton = document.createElement('button');
    importantButton.innerHTML = '<i class="fas fa-star"></i>';
    importantButton.classList.add("important-btn");
    taskDiv.appendChild(importantButton);
    //Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);
    //Append to list
    list.prepend(taskDiv); 
    //Clear Input
    input.value = "";
}

 function deleteCheck(e){
     const item = e.target;
     //Delete task
     if(item.classList[0] == "delete-btn"){
        const task = item.parentElement;
        task.classList.add("fall");
        removeTask(task);
        task.addEventListener("transitionend", function(){
            task.remove();
        });
     }
        //checked task
     if(item.classList[0] == "complete-btn"){
        const task = item.parentElement;
        task.classList.toggle("completed");
     }

     //imporatant task
    if(item.classList[0]== "important-btn"){
        const task = item.parentElement;
        task.classList.toggle("important");
    }
 }

 function filterTasks(e){
    const tasks = list.childNodes;
    console.log(tasks);
    
    tasks.forEach(function(task){
        switch(e.target.value){

            case "all":
                task.style.display = "flex";
                break;

            case "important":
                if(task.classList.contains("important")){
                    task.style.display = "flex";
                }
                else{
                    task.style.display = "none";
                }
                break;
            case "completed":
                if(task.classList.contains("completed")){
                    task.style.display = "flex";
                }
                else{
                    task.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!task.classList.contains("completed")){
                    task.style.display = "flex";
                }
                else{
                    task.style.display = "none";
                }
                break;
        }
    });
 }


 function saveTasks(task){
   //check if local storage contains some tasks already
     let tasks;
     if(localStorage.getItem("tasks") === null){
         tasks = [];
     }
     else{
         tasks = JSON.parse(localStorage.getItem("tasks"));
     }
     tasks.push(task);
     localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 function getTasks(){
     //check if local storage contains some tasks already
     let tasks;
     if(localStorage.getItem("tasks") === null){
         tasks = [];
     }
     else{
         tasks = JSON.parse(localStorage.getItem("tasks"));
     }

     tasks.forEach(function(task){
        //Task div
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        //create LI
        const newTask = document.createElement('li');
        newTask.innerText = task;
        newTask.classList.add('task-item');
        taskDiv.appendChild(newTask);
        //important button
        const importantButton = document.createElement('button');
        importantButton.innerHTML = '<i class="fas fa-star"></i>';
        importantButton.classList.add("important-btn");
        taskDiv.appendChild(importantButton);
        //Checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);
        //Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        taskDiv.appendChild(deleteButton);
        //Append to list
        list.appendChild(taskDiv); 
     });
 }

 function removeTask(task){
     //check if local storage contains some tasks already
     let tasks;
     if(localStorage.getItem("tasks") === null){
         tasks = [];
     }
     else{
         tasks = JSON.parse(localStorage.getItem("tasks"));
     }
     const taskIndex = task.children[0].innerText;
     tasks.splice(tasks.indexOf(taskIndex),1);
     localStorage.setItem("tasks", JSON.stringify(tasks));

 }
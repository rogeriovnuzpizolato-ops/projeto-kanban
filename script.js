const taskInput= document.getElementById("task-input");
const addBtn= document.getElementById("add-btn");
const sectionBord= document.querySelector(".board");
const divColumns= document.querySelector(".column");
const todoColumn= document.getElementById("todo-column");

const tasks= [];

function addTask(){
    
    const newTask= {
        id: Date.now(),
        nome:taskInput.value,
        status:"todo"
    }
    tasks.push(newTask);

   todoColumn.append(newTask.nome);
   console.log(tasks);
}

addBtn.addEventListener("click", ()=>{
    addTask();
})
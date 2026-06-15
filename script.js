const taskInput= document.getElementById("task-input");
const addBtn= document.getElementById("add-btn");
const sectionBord= document.querySelector(".board");
const divColumns= document.querySelector(".column");
const todoColumn= document.getElementById("todo-column");

const tasks= [];

function addTask(){

    if(taskInput.value.trim() === ""){
        alert("Digite uma atividade");
        return;
    }
    
    const newTask= {
        id: Date.now(),
        nome:taskInput.value,
        status:"todo"
    }


    tasks.push(newTask);

    const paragraph= document.createElement("p");

    paragraph.append(newTask.nome)

   todoColumn.append(paragraph);
   
}

addBtn.addEventListener("click", ()=>{
    addTask();
    taskInput.value= "";
})
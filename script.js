const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const todoColumn = document.getElementById("todo-column");
const doingColumn = document.getElementById("doing-column");
const doneColumn = document.getElementById("done-column");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

const COLUMNS = {
  todo:  { el: () => todoColumn,  prev: null,    next: "doing" },
  doing: { el: () => doingColumn, prev: "todo",  next: "done"  },
  done:  { el: () => doneColumn,  prev: "doing", next: null    },
};

function loadTasks (){
  localStorage.setItem("tasks", JSON.stringify(tasks))

  tasks.forEach(task => {
    const card = createCard(task);
    COLUMNS[task.status].el().append(card);
  });
}

function createCard(task) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = task.id;

  const text = document.createElement("p");
  text.textContent = task.nome;

  const btnArea = document.createElement("div");
  btnArea.classList.add("card-btns");

  const btnPrev = document.createElement("button");
  btnPrev.textContent = "← Voltar";
  btnPrev.addEventListener("click", () => moveTask(task.id, "prev"));

  const btnNext = document.createElement("button");
  btnNext.textContent = "Avançar →";
  btnNext.addEventListener("click", () => moveTask(task.id, "next"));

  btnArea.append(btnPrev, btnNext);
  card.append(text, btnArea);

  return card;
}

function moveTask(id, direction) {
  
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const config = COLUMNS[task.status];
  const newStatus = config[direction]; 

  if (!newStatus) return;

  task.status = newStatus;

  const card = document.querySelector(`.card[data-id="${id}"]`);
  COLUMNS[newStatus].el().append(card);

  updateCardBtns(card, task.status);

  saveTasks()
}

function updateCardBtns(card, status) {
  const [btnPrev, btnNext] = card.querySelectorAll("button");
  btnPrev.style.visibility = COLUMNS[status].prev ? "visible" : "hidden";
  btnNext.style.visibility = COLUMNS[status].next ? "visible" : "hidden";

}

function addTask() {
  if (taskInput.value.trim() === "") {
    alert("Digite uma atividade");
    return;
  }

  const newTask = {
    id: Date.now(),
    nome: taskInput.value,
    status: "todo"
  };

  tasks.push(newTask);

  const card = createCard(newTask);
  updateCardBtns(card, "todo");  
  todoColumn.append(card);

  taskInput.value = "";

  saveTasks()
}

addBtn.addEventListener("click", () => addTask());

loadTasks()
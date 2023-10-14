const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textarea = document.querySelector(".app__form-textarea");
const cancelFormtaskBtn = document.querySelector(
  ".app__form-footer__button--cancel"
);
const taskAtiveDescription = document.querySelector(
  ".app__section-active-task-description"
);
// function to clear the form:
const cleanForm = () => {
  textarea.value = "";
  formTask.classList.add("hidden");
};

// function to get the itens from the "tasks" and save at the localStorage:
const localStorageTasks = localStorage.getItem("tasks");

// json to take the string and turn into javascript
let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

// function to select task:
let taskSelected = null;
let itemTaskSelected = null;

const selectTask = (task, element) => {
  document
    .querySelectorAll(".app__section-task-list-item-active")
    .forEach(function (button) {
      button.classList.remove("app__section-task-list-item-active");
    });

  if (taskSelected == task) {
    taskAtiveDescription.textContent = null;
    itemTaskSelected = null;
    taskSelected = null;
    return;
  }

  taskSelected = task;
  itemTaskSelected = element;
  taskAtiveDescription.textContent = task.description;
  element.classList.add("app__section-task-list-item-active");
};

// function to creat the task and creat the li item:
function createTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");

  paragraph.textContent = task.description;
  li.onclick = () => {
    selectTask(task, li);
  };

  li.appendChild(svgIcon);
  li.appendChild(paragraph);

  return li;
}

// function to show the date on the screen:
tasks.forEach((task) => {
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
});

// function to make the button work:
toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando Tarefa";
  formTask.classList.toggle("hidden");
});

// function to update the localStorage:
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// function to change and save the task:
formTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    description: textarea.value,
    concluded: false,
  };
  tasks.push(task);
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
  updateLocalStorage();
  cleanForm();
});

// function to cancel the task
cancelFormtaskBtn.addEventListener("click", () => {
  formTask.classList.add("hidden");
});

// to clear the form when canceled
cancelFormtaskBtn.addEventListener("click", cleanForm);

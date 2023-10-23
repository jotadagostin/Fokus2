const taskListContainer = document.querySelector(".app__section-task-list");

const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");

const cancelFormTaskBtn = document.querySelector(
  ".app__form-footer__button--cancel"
);

const taskAtiveDescription = document.querySelector(
  ".app__section-active-task-description"
);

const textarea = document.querySelector(".app__form-textarea");

// function to cancel the task:
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");

// function to cancel/delete the task:
const btnDeletar = document.querySelector(".app__form-footer__button--delete");

// function to delete the concluded tasks:
const btnDeletarConcluidas = document.querySelector("#btn-remover-concluidas");

// function to delete everything:
const btnDeletarTodas = document.querySelector("#btn-remover-todas");

// function to get the itens from the "tasks" and save at the localStorage:
const localStorageTarefas = localStorage.getItem("tarefas");

// json to take the string and turn into javascript
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

// we start with the variables(let)
// function to select task:
let tarefaSelecionada = null;
let itemTarefaSelecionada = null;
let tarefaEmEdicao = null;
let paragraphEmEdicao = null;

const removerTarefas = (somenteConcluidas) => {
  const seletor = somenteConcluidas
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(seletor).forEach((element) => {
    element.remove();
  });

  tarefas = somenteConcluidas ? tarefas.filter((t) => !t.concluida) : [];
  updateLocalStorage();
};

const selecionaTarefa = (tarefa, elemento) => {
  if (tarefa.concluida) {
    return;
  }

  document
    .querySelectorAll(".app__section-task-list-item-active")
    .forEach(function (button) {
      button.classList.remove("app__section-task-list-item-active");
    });

  if (tarefaSelecionada == tarefa) {
    taskAtiveDescription.textContent = null;
    itemTarefaSelecionada = null;
    tarefaSelecionada = null;
    return;
  }

  tarefaSelecionada = tarefa;
  itemTarefaSelecionada = elemento;
  taskAtiveDescription.textContent = tarefa.descricao;
  elemento.classList.add("app__section-task-list-item-active");
};

// function to clear the form:
const limparForm = () => {
  tarefaEmEdicao = null;
  paragraphEmEdicao = null;
  textarea.value = "";
  formTask.classList.add("hidden");
};

// function to edit the task:
const selecionaTarefaParaEditar = (tarefa, elemento) => {
  if (tarefaEmEdicao == tarefa) {
    limparForm();
    return;
  }

  formLabel.textContent = "Editando tarefa";
  tarefaEmEdicao = tarefa;
  paragraphEmEdicao = elemento;
  textarea.value = tarefa.descricao;
  formTask.classList.remove("hidden");
};

// function to creat the task and creat the li item:

function createTask(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");

  paragraph.textContent = tarefa.descricao;

  const button = document.createElement("button");

  button.classList.add("app_button-edit");
  const editIcon = document.createElement("img");
  editIcon.setAttribute("src", "/imagens/edit.png");

  button.appendChild(editIcon);

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    selecionaTarefaParaEditar(tarefa, paragraph);
  });

  li.onclick = () => {
    selecionaTarefa(tarefa, li);
  };

  svgIcon.addEventListener("click", (event) => {
    if (tarefa == tarefaSelecionada) {
      event.stopPropagation();
      button.setAttribute("disabled", true);
      li.classList.add("app__section-task-list-item-complete");
      tarefaSelecionada.concluida = true;
      updateLocalStorage();
    }
  });

  if (tarefa.concluida) {
    button.setAttribute("disabled", true);
    li.classList.add("app__section-task-list-item-complete");
  }

  // to show the button

  li.appendChild(svgIcon);
  li.appendChild(paragraph);
  li.appendChild(button);

  return li;
}

// function to show the date on the screen:

tarefas.forEach((task) => {
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
});

cancelFormTaskBtn.addEventListener("click", () => {
  formTask.classList.add("hidden");
});

btnCancelar.addEventListener("click", limparForm);

// function to make the button work:

toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adding task";
  formTask.classList.toggle("hidden");
});

// function to cancel/delete the task:

btnDeletar.addEventListener("click", () => {
  if (tarefaSelecionada) {
    const index = tarefas.indexOf(tarefaSelecionada);
    if (index !== -1) {
      tarefas.splice(index, 1);
    }

    itemTarefaSelecionada.remove();
    tarefas.filter((t) => t != tarefaSelecionada);
    itemTarefaSelecionada = null;
    tarefaSelecionada = null;
  }

  updateLocalStorage();
  limparForm();
});

// function to update the localStorage:
const updateLocalStorage = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
};
// function to change and save the task:

formTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  // edition recieve a textarea with the text

  if (tarefaEmEdicao) {
    tarefaEmEdicao.descricao = textarea.value;
    paragraphEmEdicao.textContent = textarea.value;
  } else {
    const task = {
      descricao: textarea.value,
      concluida: false,
    };
    tarefas.push(task);
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
  }
  updateLocalStorage();
  limparForm();
});

btnDeletarConcluidas.addEventListener("click", () => removerTarefas(true));
btnDeletarTodas.addEventListener("click", () => removerTarefas(false));

// function to finish the task:

document.addEventListener("TarefaFinalizada", function (e) {
  if (tarefaSelecionada) {
    tarefaSelecionada.concluida = true;
    itemTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    itemTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", true);
    updateLocalStorage();
  }
});

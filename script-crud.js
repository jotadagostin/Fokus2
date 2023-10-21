// const taskListContainer = document.querySelector(".app__section-task-list");
// const formTask = document.querySelector(".app__form-add-task");
// const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
// const formLabel = document.querySelector(".app__form-label");
// const cancelFormtaskBtn = document.querySelector(
//   ".app__form-footer__button--cancel"
// );
// const taskAtiveDescription = document.querySelector(
//   ".app__section-active-task-description"
// );
// const textarea = document.querySelector(".app__form-textarea");

// // function to cancel the task:
// const btnCancel = document.querySelector(".app__form-footer__button--cancel");
// // function to cancel/delete the task:
// const btnDelete = document.querySelector(".app__form-footer__button--delete");
// // function to delete the concluded tasks:
// const btnDeleteConcluded = document.querySelector("#btn-remover-concluidas");
// // function to delete everything:
// const btnDeleteAll = document.querySelector("#btn-remover-todas");

// // function to get the itens from the "tasks" and save at the localStorage:
// const localStorageTasks = localStorage.getItem("tasks");

// // json to take the string and turn into javascript
// let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];

// const taskIconSvg = `
// <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
//     fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="12" cy="12" r="12" fill="#FFF" />
//     <path
//         d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
//         fill="#01080E" />
// </svg>
// `;

// // we start with the variables(let)
// // function to select task:
// let taskSelected = null;
// let itemTaskSelected = null;
// // function to edit the task
// let taskEdition = null;
// let paragraphEdition = null;

// const removeTask = (onlyConcluded) => {
//   const selector = onlyConcluded
//     ? ".app__section-task-list-item-complete"
//     : ".app__section-task-list-item";
//   document.querySelector(selector).forEach((element) => {
//     element.remove();
//   });

//   tasks = onlyConcluded ? tasks.filter((t) => !t.concluded) : [];
//   updateLocalStorage();
// };

// const selectTask = (task, element) => {
//   if (task.concluded) {
//     return;
//   }

//   document
//     .querySelectorAll(".app__section-task-list-item-active")
//     .forEach(function (button) {
//       button.classList.remove("app__section-task-list-item-active");
//     });

//   if (taskSelected == task) {
//     taskAtiveDescription.textContent = null;
//     itemTaskSelected = null;
//     taskSelected = null;
//     return;
//   }

//   taskSelected = task;
//   itemTaskSelected = element;
//   taskAtiveDescription.textContent = task.description;
//   element.classList.add("app__section-task-list-item-active");
// };

// // function to clear the form:
// const cleanForm = () => {
//   taskEdition = null;
//   paragraphEdition = null;
//   textarea.value = "";
//   formTask.classList.add("hidden");
// };

// // function to edit the task:
// const selectTaskToEdit = (task, element) => {
//   if (taskEdition == task) {
//     cleanForm();
//     return;
//   }

//   formLabel.textContent = "Editando tarefa";
//   taskEdition = task;
//   paragraphEdition = element;
//   textarea.value = task.description;
//   formTask.classList.remove("hidden");
// };

// // function to creat the task and creat the li item:
// function createTask(task) {
//   const li = document.createElement("li");
//   li.classList.add("app__section-task-list-item");

//   const svgIcon = document.createElement("svg");
//   svgIcon.innerHTML = taskIconSvg;

//   const paragraph = document.createElement("p");
//   paragraph.classList.add("app__section-task-list-item-description");

//   paragraph.textContent = task.description;

//   const button = document.createElement("button");

//   button.classList.add("app_button-edit");
//   const editIcon = document.createElement("img");
//   editIcon.setAttribute("src", "/imagens/edit.png");

//   button.appendChild(editIcon);

//   button.addEventListener("click", (event) => {
//     event.stopPropagation();
//     selectTaskToEdit(task, paragraph);
//   });

//   svgIcon.addEventListener("click", (event) => {
//     if (task == taskSelected) {
//       event.stopPropagation();
//       button.setAttribute("disabled", true);
//       li.classList.add("app__section-task-list-item-complete");
//       taskSelected.concluded = true;
//       updateLocalStorage();
//     }
//   });

//   if (task.concluded) {
//     button.setAttribute("disabled", true);
//     li.classList.add("app__section-task-list-item-complete");
//   }

//   li.onclick = () => {
//     selectTask(task, li);
//   };

//   // to show the button
//   li.appendChild(svgIcon);
//   li.appendChild(paragraph);
//   li.appendChild(button);

//   return li;
// }

// // function to show the date on the screen:
// tasks.forEach((task) => {
//   const taskItem = createTask(task);
//   taskListContainer.appendChild(taskItem);
// });

// cancelFormtaskBtn.addEventListener("click", () => {
//   formTask.classList.add("hidden");
// });

// btnCancel.addEventListener("click", cleanForm);

// // function to make the button work:
// toggleFormTaskBtn.addEventListener("click", () => {
//   formLabel.textContent = "Adding Task";
//   formTask.classList.toggle("hidden");
// });

// // function to cancel/delete the task:
// btnDelete.addEventListener("click", () => {
//   if (taskSelected) {
//     const index = tasks.indexOf(taskSelected);

//     if (index !== -1) {
//       tasks.splice(index, 1);
//     }

//     itemTaskSelected.remove();
//     tasks.filter((t) => t != taskSelected);
//     itemTaskSelected = null;
//     taskSelected = null;
//   }
//   updateLocalStorage();
//   cleanForm();
// });

// // function to update the localStorage:
// const updateLocalStorage = () => {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// };

// // function to change and save the task:
// formTask.addEventListener("submit", (event) => {
//   event.preventDefault();
//   // edition recieve a textarea with the text
//   if (taskEdition) {
//     taskEdition.description = textarea.value;
//     paragraphEdition.textContent = textarea.value;
//   } else {
//     const task = {
//       description: textarea.value,
//       concluded: false,
//     };
//     tasks.push(task);
//     const taskItem = createTask(task);
//     taskListContainer.appendChild(taskItem);
//   }
//   updateLocalStorage();
//   cleanForm();
// });

// btnDeleteConcluded.addEventListener("click", () => removeTask(true));
// btnDeleteAll.addEventListener("click", () => removeTask(false));

// // function to finish the task:

// document.addEventListener("TarefaFinalizada", function (e) {
//   if (taskSelected) {
//     taskSelected.concluded = true;
//     itemTaskSelected.classList.add("app__section-task-list-item-complete");
//     itemTaskSelected.querySelector("button").setAttribute("disabled", true);
//     updateLocalStorage();
//   }
// });


const taskListContainer = document.querySelector('.app__section-task-list')

const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')

const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')

const taskAtiveDescription = document.querySelector('.app__section-active-task-description')

const textarea = document.querySelector('.app__form-textarea')

const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

const btnDeletar = document.querySelector('.app__form-footer__button--delete')

const btnDeletarConcluidas = document.querySelector('#btn-remover-concluidas')
const btnDeletarTodas = document.querySelector('#btn-remover-todas')

const localStorageTarefas = localStorage.getItem('tarefas')
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : []

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

let tarefaSelecionada = null
let itemTarefaSelecionada = null

let tarefaEmEdicao = null
let paragraphEmEdicao = null

const removerTarefas = (somenteConcluidas) => {
    const seletor = somenteConcluidas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach((element) => {
        element.remove();
    });

    tarefas = somenteConcluidas ? tarefas.filter(t => !t.concluida) : []
    updateLocalStorage()
}

const selecionaTarefa = (tarefa, elemento) => {
    if (tarefa.concluida) {
        return
    }

    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })

    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }

    tarefaSelecionada = tarefa
    itemTarefaSelecionada = elemento
    taskAtiveDescription.textContent = tarefa.descricao
    elemento.classList.add('app__section-task-list-item-active')
}

const limparForm = () => {
    tarefaEmEdicao = null
    paragraphEmEdicao = null
    textarea.value = ''
    formTask.classList.add('hidden')
}

const selecionaTarefaParaEditar = (tarefa, elemento) => {
    if(tarefaEmEdicao == tarefa) {
        limparForm()
        return
    }

    formLabel.textContent='Editando tarefa'
    tarefaEmEdicao=tarefa
    paragraphEmEdicao=elemento
    textarea.value = tarefa.descricao
    formTask.classList.remove('hidden')
}

function createTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcon = document.createElement('svg')
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao

    const button = document.createElement('button')

    button.classList.add('app_button-edit')
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', '/imagens/edit.png')

    button.appendChild(editIcon)

    button.addEventListener('click', (event) =>{
        event.stopPropagation()
        selecionaTarefaParaEditar(tarefa, paragraph)
    })

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    svgIcon.addEventListener('click', (event) => {
        if (tarefa == tarefaSelecionada) {
            event.stopPropagation()
            button.setAttribute('disabled', true)
            li.classList.add('app__section-task-list-item-complete')
            tarefaSelecionada.concluida = true
            updateLocalStorage()
        }
    })

    if(tarefa.concluida){
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)
    
    return li
}

tarefas.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

cancelFormTaskBtn.addEventListener('click', () => {
    formTask.classList.add('hidden')
})

btnCancelar.addEventListener('click', limparForm)

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

btnDeletar.addEventListener('click', () => {
    if (tarefaSelecionada) {
        const index = tarefas.indexOf(tarefaSelecionada);
        if (index !== -1) {
            tarefas.splice(index, 1);
        }
        
        itemTarefaSelecionada.remove()
        tarefas.filter(t => t != tarefaSelecionada) 
        itemTarefaSelecionada = null
        tarefaSelecionada = null
    }

    updateLocalStorage()
    limparForm()
})

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

formTask.addEventListener('submit', (evento) => {
    evento.preventDefault()
    if(tarefaEmEdicao) {
        tarefaEmEdicao.descricao = textarea.value
        paragraphEmEdicao.textContent = textarea.value
    } else {
    const task = {
        descricao: textarea.value,
        concluida: false
    }
    tarefas.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
}
    updateLocalStorage()
    limparForm()
})

btnDeletarConcluidas.addEventListener('click', () => removerTarefas(true))
btnDeletarTodas.addEventListener('click', () => removerTarefas(false))

document.addEventListener("TarefaFinalizada", function (e) {
    if (tarefaSelecionada) {
        tarefaSelecionada.concluida = true
        itemTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        itemTarefaSelecionada.querySelector('button').setAttribute('disabled', true)
        updateLocalStorage()
    }
});
const input = document.querySelector("#input-lista");
const adicionar = document.querySelector(".adicionar");
const tarefas = document.querySelector(".tarefas");

adicionar.addEventListener("click", (e) => {
  e.preventDefault();
  if (!input.value) return;
  criaTarefa(input.value);

  return;
});

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!input.value) return;
    criaTarefa(input.value);
  }

  return;
});

const criaTarefa = (texto) => {
  const li = document.createElement("li");
  li.innerText = texto;
  tarefas.appendChild(li);
  limpaInput();
  botaoApagar(li);
  salvarTarefa();

  return;
};

const limpaInput = () => {
  input.value = "";
  input.focus();

  return;
};

const botaoApagar = (li) => {
  const apagar = document.createElement("button");
  apagar.innerText = "apagar";
  apagar.setAttribute("class", "apagar");
  apagar.setAttribute("title", "apagar esta tarefa");
  li.appendChild(apagar);
};

document.addEventListener("click", (e) => {
  const elemento = e.target;
  if (elemento.classList.contains("apagar")) {
    elemento.parentElement.remove();
    salvarTarefa();
  }
});

const salvarTarefa = () => {
  const listaTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of listaTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("apagar", " ").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
};

const recarregaTarefas = () => {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
};

recarregaTarefas();

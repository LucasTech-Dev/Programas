let input = document.getElementById("inputTarefa"); //declaração de variaveis de ambiente
let main = document.getElementById("areaLista");
let cont = 0;


function AddTarefa() {

    let valorIpunt = input.value;

    if ((valorIpunt !== "") && (valorIpunt !== null) && (valorIpunt !== undefined)) {
        cont++

        let novoItem = ` <div id="${cont}" class="item">
            <div onclick="marcarConcluido(${cont})"  class="icone">
                <i id="icone_${cont}" class="mdi mdi-checkbox-blank-circle-outline"></i>
            </div>
            <div onclick="marcarConcluido(${cont})" class="tarefa">
                <p id="tarefa_${cont}">${valorIpunt}</p>
            </div>
            <div class="botao">
                    <div class="espacoDeletar">
                    <button class="Editar" onclick="Editar(${cont})"> <i class="mdi mdi-pencil"></i>Editar</button>
                </div>
                <div class="espacoEditar">
                     <button class="Deletar" onclick="Deletar(${cont})"> <i class="mdi mdi-delete"></i>Deletar</button>
                </div>
            </div>
        </div>`

        main.innerHTML += novoItem;

        input.value = "";
        input.focus();
    }
}
function Deletar(id) {
    let item = document.getElementById(id)
    item.remove()
}

function Editar(id) {
  document.getElementById("overlay").style.display = "flex";

  // onde o card será renderizado
  const editor = document.getElementById("editor");

  // monta o card de edição
  const EditorTarefa = `
    <div class="card-login">
      <h2>Mudar Tarefa</h2>
      <input id="inputEditar" type="text" placeholder="digite sua tarefa">
      <button onclick="fecharEditar(${id})">Salvar</button>
    </div>
  `;

  editor.innerHTML = EditorTarefa;
}

function fecharEditar(id) {
  // pega o novo valor digitado
  const valorInputNovo = document.getElementById("inputEditar").value;

  // pega o elemento da tarefa
  const tarefaElemento = document.getElementById("tarefa_" + id);

  // atualiza o texto da tarefa
  tarefaElemento.textContent = valorInputNovo;

  // fecha o overlay
  document.getElementById("overlay").style.display = "none";
}

function marcarConcluido(id) {
    let item = document.getElementById(id);
    let classe = item.getAttribute('class');

    if (classe == "item") {
        item.classList.add('marcado');

        let icone = document.getElementById('icone_' + id)

        icone.classList.remove('mdi-checkbox-blank-circle-outline');
        icone.classList.add("mdi-check-circle");

    } else {
        item.classList.remove('marcado');

        let icone = document.getElementById('icone_' + id)

        icone.classList.add('mdi-checkbox-blank-circle-outline');
        icone.classList.remove("mdi-check-circle");

    }


}

// Função que dispara ao apertar Enter
function aoPressionarEnter(event) {
    if (event.key === "Enter") {
        AddTarefa();
        // aqui você pode chamar qualquer ação, ex: adicionar tarefa
    }
}
document.addEventListener("keydown", aoPressionarEnter);




//  // valorIpunt.add( valorInputNovo);
//       function Editar(cont) {
//   // pega o elemento <p> da tarefa
//   const tarefa = document.getElementById(`tarefa_${cont}`);

//   // guarda o valor atual
//   const valorAtual = tarefa.textContent;

//   // cria um input para edição
//   const input = document.createElement("input");
//   input.type = "text";
//   input.value = valorAtual;
//   input.id = `input_editar_${cont}`;

//   // substitui o <p> pelo input
//   tarefa.replaceWith(input);

//   // quando apertar Enter, salva o novo valor
//   input.addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//       const novoValor = input.value;

//       // cria novamente o <p> com o novo texto
//       const novoP = document.createElement("p");
//       novoP.id = `tarefa_${cont}`;
//       novoP.textContent = novoValor;

//       // recoloca no lugar do input
//       input.replaceWith(novoP);
//     }
//   });
// }








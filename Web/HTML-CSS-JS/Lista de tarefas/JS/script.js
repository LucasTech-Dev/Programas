let cont = 0;
let input = document.getElementById('inputTarefa'); //declarando o valor das variaveis para usar em qualqure lugar do codigo
let btnAdd = document.getElementById('btnAdd');
let main = document.getElementById('areaLista');

function AddTarefa() {
    //pegando valores
    let valorInput = input.value;

    //vericação do campo input
    if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {
        //adicionar numero ao contador de controle
        cont++;
        let novoItem = `<div id="${cont}" class="item">
            <div onclick="marcarConcluido(${cont})"  class="icone">
                <i id="icone_${cont}" class="mdi mdi-checkbox-blank-circle-outline"></i>
            </div>
            <div onclick="marcarConcluido(${cont})" class="tarefa">
                <p>${valorInput}</p>
            </div>
            <div class="botao">
                <button onclick="Deletar(${cont})"> <i class="mdi mdi-delete"></i>Deletar</button>
            </div>
        </div>`

        //adicionar item na area lista
        main.innerHTML += novoItem;

        //zerar campos
        input.value = "";
        input.focus;
    }
}
function Deletar(id) {
    var tarefa = document.getElementById(id)
    tarefa.remove();
}

function marcarConcluido(id) {
    var item = document.getElementById(id);
    var classe = item.getAttribute("class");
    console.log(item);

    if (classe == "item") {
        item.classList.add('marcado');

        var icone = document.getElementById('icone_'+id);
        icone.classList.remove("mdi-checkbox-blank-circle-outline");
        icone.classList.add("mdi-checkbox-marked-circle");

        item.parentNode.appendChild(item)

    }else{
        item.classList.remove('marcado');

        var icone = document.getElementById('icone_'+id);
        icone.classList.add("mdi-checkbox-blank-circle-outline");
        icone.classList.remove("mdi-checkbox-marked-circle");

        item.parentNode.prepend(item);


    }
}

input.addEventListener("keyup", function (event) {
    //se teclou enter
    if (event.keyCode === 13) {
        event.preventDefault();
        AddTarefa();
    }
}
);


let n = "Lucas";
let email = "lucassantanadias2008@gmail.com";
let age = 18;

function Verificaca() {
    var batata = document.getElementById("nome").value;
    var cenora = document.getElementById("email").value;
    var abobora = document.getElementById("idade").value;

    if (batata === n && cenora === email && parseInt(abobora) === age) {
        alert("tudo beleza meu patrão")

    } else {
        alert("cai fora pe de urubu")
    }
}
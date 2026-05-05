// treino de saidas
document.getElementById("texto").innerHTML = "blabla";
alert(" isso é um alerta ");
alert("Segundo alerta de teste")
console.log("isso é um console.log");

var pote = 1, bote = 2;
document.getElementById("texto2").innerHTML = pote;
document.getElementById("texto3").innerHTML = bote;



// isso é um treino de declarações
let nome, sobrenome;
let idade, anoAtual, anoNascimento;
let pessoa;

nome = "lucas";
sobrenome = "santana";
anoAtual = 2025;
anoNascimento = 2008;

idade = anoAtual - anoNascimento;
pessoa = nome + " " + sobrenome + " " + idade;

document.getElementById("texto").innerHTML = pessoa;


//  revisando operadores
var valor1 = 10, valor2 = 20, valor3 = 5;
var resultado;

resultado = (valor1 + valor2) / valor3;
resultado += resultado;

document.getElementById("texto4").innerHTML = "o resultado é: ";


// APRENDENDO FUNCAO
let n1 = document.getElementById("texto3");
let n2 = document.getElementById("texto2");

function soma(n1, n2) {
    return n1 + n2;
}
let total;
total = soma(n2, n1);

document.getElementById("texto5").innerHTML = n1




// FORMULARIO TREINO




// EVENTOS TREINO
// onclick => disparado quando recebe um click
// ondblclick => disparado quando click duplo
// onmouseover => disparado quando o mouse está sobre
// onmouseout => disparado quando o mouse sai do objeto
// onmousemove => disparado quando o mouse é movido no elemento
// onmousedown => disparado quando o clique do botão for pressionado
// onmouseup = > disparado quando o click do mouse é solto
// onfocus => disparado quando o elemento recebe o foco. Válido para input
// onchange => disparado quando há uma mudança no conteúdo. "Ao mudar"
// onblur => disparado quando o elemento perde o foco
// onkeydown => disparado quando uma tecla é pressionada 
// onkeypress => disparado quando uma tecla é pressionada e solta
// onkeyup => disparado quando uma tecla é solta sobre o elemento
// onload => disparado quando a página terminou de ser carregada. Carroceria
// onresize => disparado quando há um redimencionamento da janela



function Onclick() {
    document.body.style.backgroundColor = "blue";
}




// APRENDENDO ARRAWAY/MATIZES
// METODOS PARA MATRIZES
let mercado = ["pao", "refri", "carne", "salada"]
let compras = ["apartamento", "moto", "carro", "casa"];
const casa = mercado.concat(compras); // junta duas ou mais matrizes

// document.getElementById("texto5").innerHTML = casa;

// document.getElementById("texto5"). innerHTML = compras.join(" - ");  //adicona algo entre os elementos das matrizes

// document.getElementById("texto5").innerHTML= x;

// compras.push("aaa") //adicona na ultima posição

// compras.unshift("bbbbb") //adiciona na primeira posição

// compras.shift() //remove primeiro itens

// compras.pop() //romeve o ultimo

// compras.splice(1,0, "add1","add2","add3") //adiciona varios itens a partir de uma posição(ex: "1" a apartir de qual posição começa, "0" quantidade de itens a ser removido, proximas coisas oq vai ser adicionado)

// var corte= casa.slice(2,5) //separa o conteudo de uma posição ate a outra
// document.getElementById("texto5").innerHTML = corte

var number = [10, 22, 23, 4, 9, 25, 6, 2008, 18];
//number.sort(); //organiza em ordem "alfabetica"
//number.sort(function(a,b){ return a-b}); //ordena do menor para o maior. para fazer ao contrario é só trocar a ordem dos parametros passados na função

//function NumberMaior(arraway){
//  return Math.max.apply(null, arraway) // achar o maior numero

//function NumberMenor(arraway){
//return Math.min.apply(null, arraway) //achar o menor numero
// document.getElementById("texto5").innerHTML = NumberMaior(number) +" "+ NumberMenor(number);






//aprendendo if else
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



// objetos  obs:cada propriedade de um obj pode ter uma matriz 
const carro = {
    marca: "chevrolet", modelo: "Astra", Ano: 2005, buzina: function () {
        alert("biiii"); // isso é chamado de metodo, um objeto com uma função dentro
    },
    completo: function () {
        return "A marca é " + this.marca + " e o modelo é " + this.modelo; // this é usado para se referir ao objeto quando ainda se esta dentro de seu dominio, ou seja as chaves
    }
};  //criando objeto(obs: pratica comum usar um objeto como const)
console.log(carro.completo());
carro.buzina();


// SetTimeout e SetInterval / eventos de tempo

//setTimeout ->
//function ComecaContagem (){
//     document.getElementById("contador").innerHTML= "Começou a conatagem";
//     tempo=setTimeout(function(){
//         document.getElementById("contador").innerHTML= "Terminou a conatagem";
//    }, 5000) }; // em determinado tempo a função sera ativa, uma unica vez. Este é o setTimeout

//     //Clear Timeout / parar a conatgem
//function ParaContagem(){
//         clearTimeout(tempo)
//         document.getElementById("contador").innerHTML = "Parou de contar";

// };
//setTimeout  <-



//setInterval ->

function ComecaContagem() {
    tempo = setInterval(function () {
        var contador = document.getElementById("contador").innerHTML;
        var mais = parseInt(contador) + 1;

        document.getElementById("contador").innerHTML = mais;

    }, 500);

}


function ParaContagem() {
    clearInterval(tempo)

}

//setInterval <-


// classes ->  obs: so posso invocar uma classe de onde ela foi criada para baixo

class Caro { //manter sempre a primeira letra da clase em maiusculo, a classe é como se fosswe a fabrica por fora, a estrutura dela em si
    constructor(V1, V2, V3) { //o contructor funciona tipo uma função, é passado parametros para ele e dentro das chaves é denominado para onde vao estes valores, e nao tem um limite de objetos para serem criados.
        this.marca = V1;
        this.modelo = V2;
        this.ano = V3;

    }
    buzina() {
        return this.modelo + "boooooooo"; //funciona exatamente como metodos em objetos, é uma função que pode ser usada em qualquer objeto que for chamada 
    }
}
const astra = new Caro("Chevrolet", "Astra", 2001);
const vectra = new Caro("Chevrolet", "Vectra", 2001);
astra.ano = 2000; //para mudar valores de objetos


console.log(astra);
console.log(vectra);

//classes <-


//Manipulação de datas ->

//pegar a data completa
let data = new Date();
console.log(data)

//pegar o ano atual
let ano = data.getFullYear();
console.log(ano)

//pegar o mes de 0 a 11, como se fosse em um array, para pegar os meses por escrito é so criar a matriz
let mes = data.getMonth();
const mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
console.log(mesesDoAno[mes])

//pegar dia do mes em numeros
let diaMes = data.getDate(); //pegar dia do mes
console.log(diaMes)


//pegar dia da semana em numeros e passar para dias
const semana = ["Domingo", "Segunda", "Terça", "Quanrta", "Quinta", "Sexta", "Sabado"]
let diaSemana = data.getDay();
console.log(semana[diaSemana]);


//pegar horas de 0 a 23
let horas = data.getHours();
console.log(horas);


//pegar minutos de 0 a 59
let minutos = data.getMinutes();
console.log(minutos);


//pegar segundos de 0 a 59
let segundos = data.getSeconds();
console.log(segundos)


//pegar segundos de 0 a 999
let Milisegundos = data.getMilliseconds();
console.log(Milisegundos)


//PEGAR DATA PADRAO BR                            apenas a hora                             apenas a hora
let databr = data.toLocaleDateString('pt-br'); //('pt-br', {dateStyle: 'short'})     ('pt-br', {timeStyle: 'short'})       
console.log(databr);



//comparar datas
let hoje = new Date();
let vencimento = new Date(2026, 0, 26);

if (hoje > vencimento) {
    console.log("deu merda");
} else {
    console.log("nao deu merda");

}


//DIFERENÇA EM DIAS NAS DATAS 
var dataInicio = new Date();
var dataFinal = new Date(2026, 11, 31);

var diferenca = dataFinal.getTime() - dataInicio.getTime();

console.log(diferenca)


//Manipulação de datas <-



//JSON ->
const moto = {
    marca: "HONDA",
    modelo: "XRE",
    motor: ["1.6", "1.5", "2.0"]
}
//passando o obejto para texto
//let texto = JSON.stringify(moto) 

//inserindo texto no html
//document.getElementById("area").innerHTML= texto

// passando texto para json
//let obj = JSON.parse(texto)

//mostrando obj no console
//console.log(obj.motor[2]) // isso gera erro pq essa variavel nao é mais um objeto, e sim um texto




//USANDO JSON PARA BUSCAR INFORMAÇÕES EM OUTROS SITES
function buscarCep() {
    let comapoText = document.getElementById('cep').value

    //pegar informações do site
    const ajax = new XMLHttpRequest();
    ajax.open("GET", "https://viacep.com.br/ws/"+ comapoText+"/json/"); //PEGANDO INFORMAÇÕES DO SITE
    ajax.send(); //enviando solicitação

    //quando o ajax careegar as informações
    ajax.onload = function () {
        //document.getElementById("area").innerHTML = this.responseText; // resposta em texto da consulta no site

        //trabalhar com as informações pegas pelo  this.responseText
        //let obj = JSON.parse(this.responseText);
        //console.log(obj.ddd);
        //console.log(obj.cep);

       // document.getElementById("text").innerHTML = 
        this.responseText;

        let obj=JSON.parse(this.responseText);

        document.getElementById("text").innerHTML = "CEP: "+obj.cep +"<br>DDD: "+ obj.ddd +"<br>LOCALIDADE: "+ obj.localidade +"<br>CIGLA DO ESTADO: "+ obj.uf +"<br>POPULAÇÃO: "+ obj.ibge;


    }




}








//JSON <-




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
let n= "Lucas";
let email= "lucassantanadias2008@gmail.com";
let age = 18;

function Verificaca(){
  var batata =  document.getElementById("nome").value;
  var cenora =  document.getElementById("email").value;
  var abobora =  document.getElementById("idade").value;

   if(batata===n && cenora===email && parseInt (abobora)===age ){
    alert("tudo beleza meu patrão")

   }else{
    alert("cai fora pe de urubu")
   }
}
 







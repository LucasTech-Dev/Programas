// treino de saidas
document.getElementById("texto").innerHTML="blabla";
 alert(" isso é um alerta ");
 alert("Segundo alerta de teste")
 alert("Terceiro alert de teste")
console.log("isso é um console.log");

var pote = 1, bote=2;
document.getElementById("texto2"). innerHTML= pote;
document.getElementById("texto3"). innerHTML= bote;
// isso é um treino de declarações


let nome, sobrenome;
let idade, anoAtual, anoNascimento;
let pessoa;
 
nome= "lucas";
sobrenome="santana";
anoAtual=2025; 
anoNascimento=2008;

idade=anoAtual - anoNascimento;
 pessoa= nome +" "+ sobrenome+" "+idade;

 document.getElementById("texto").innerHTML=pessoa;


//  revisando operadores
var valor1=10, valor2=20,valor3=5;
var resultado;

resultado = (valor1 + valor2)/valor3;
resultado+=resultado;

document.getElementById("texto4"). innerHTML= "o resultado é: ";
      

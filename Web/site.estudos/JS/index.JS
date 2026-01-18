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
      

// APRENDENDO FUNCAO
 let n1= document.getElementById("texto3");
 let n2= document.getElementById("texto2");

function soma (n1, n2){
    return n1 + n2;
}
let total;
total= soma(n2,n1);

document.getElementById("texto5").innerHTML= n1


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



function Onclick(){
    document.body.style.backgroundColor="blue";
}







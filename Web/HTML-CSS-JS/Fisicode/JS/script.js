render();

function render(){
    const espacoCard=document.getElementById("espacoCard")

    espacoCard.innerHTML=`
    <div class="card">
    
    <div class="espacoInput">
        <input id="v0" type="number" placeholder="Insira a Velocidade Inicial">
        <input id="a" type="number" placeholder="Insira a Aceleração">
        <input id="d" type="number" placeholder="Insira a Distância">
    </div>

    <div class="espacoResposta">
        <div id="campoResposta">
            Velocidade Final:
        </div>
    </div>

    <!-- BOTÃO TEM QUE FICAR AQUI DENTRO -->
    <div class="espacoBotao">
        <button class="btn-operacao" onclick="calcular()">Calcular</button>
    </div>

</div>`
};

function calcular(){
    let campoResposta=document.getElementById("campoResposta");
    let v0= document.getElementById("v0").value;
     let a= document.getElementById("a").value;
     let d= document.getElementById("d").value;


     var Vquadrado = Math.sqrt( (v0 **2) + 2 * a *d );

     

     campoResposta.innerHTML=(Vquadrado+"M/s");


    
}
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let secretNumber = generateRandomNumber();

let tentativas = 1;

function displayTextOnScreen(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirMensagemInicial();

function generateRandomNumber(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return generateRandomNumber();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}


function verificarChute(){
    let guess = document.querySelector('input').value;
    if (secretNumber == guess){
        displayTextOnScreen('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        displayTextOnScreen('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(secretNumber < guess){
            displayTextOnScreen('p', 'O número secreto é menor');
        }else{
            displayTextOnScreen('p', 'o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
    
}


function limparCampo(){
    guess = document.querySelector('input');
    guess.value = '';
}

function reiniciarJogo(){
    exibirMensagemInicial();
    secretNumber = generateRandomNumber();
    console.log(secretNumber);
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial(){
    displayTextOnScreen('h1', 'Jogo do número secreto');
    displayTextOnScreen('p', 'Escolha um número entre 1 e 10');
}
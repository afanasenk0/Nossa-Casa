const frase = document.getElementById("frase");

const pensamentosContainer = document.getElementById("pensamentos");

const botoesPensamento = document.querySelectorAll(".pensamento");

const pensamentoAberto = document.getElementById("pensamento-aberto");

const fechar = document.getElementById("fechar");

const pensamentoNumero = document.getElementById("pensamento-numero");

const pensamentoTitulo = document.getElementById("pensamento-titulo");

const pensamentoTexto = document.getElementById("pensamento-texto");

const final = document.getElementById("final");

const fraseFinal = document.getElementById("frase-final");


// ======================================================
// CONTROLE
// ======================================================

const pensamentosVistos = new Set();

let transicaoIniciada = false;


// ======================================================
// FUNÇÃO DE ESPERA
// ======================================================

function esperar(tempo) {

    return new Promise(resolve => {
        setTimeout(resolve, tempo);
    });

}


// ======================================================
// OS 5 PENSAMENTOS
// ======================================================

const pensamentos = {

    1: {
        titulo: "Uma coisa que eu nunca soube te explicar",
        texto: "Meus pensamentos. Nunca soube te explicar certas conclusões ou ideias, mas, impressionantemente, você conseguia me entender na maioria das vezes."
    },

    2: {
        titulo: "Uma coisa que eu sempre quis que você soubesse",
        texto: "Muitas coisas absurdas que eu dizia eram tentativas de chamar a sua atenção. Péssimo jeito de fazer isso, não é?"
    },

    3: {
        titulo: "Uma coisa que eu tinha medo de dizer",
        texto: "Eu tinha medo de dizer que ainda não estava 100% bem para um relacionamento, até eu acabar me perdendo daquele jeito."
    },

    4: {
        titulo: "Uma coisa que eu só entendi depois",
        texto: "Que somos seres individuais. Temos as nossas vidas à parte. Eu pensava que, em um namoro, as pessoas se tornavam um único ser, onde tudo era os dois, sem nenhum tempo separados, pois eu \"não estava solteiro\" para viver sozinho."
    },

    5: {
        titulo: "Uma coisa que eu ainda quero te dizer",
        texto: "Eu me arrependo profundamente de ter escondido tanto de ti e permitido que nossa relação tenha chegado a tal estopim."
    }

};


// ======================================================
// INTRODUÇÃO
// ======================================================

const introducao = [

    {
        texto: "Existem coisas que eu pensei muitas vezes.",
        tempo: 4000
    },

    {
        texto: "Algumas eu tentei dizer.",
        tempo: 3500
    },

    {
        texto: "Outras ficaram guardadas.",
        tempo: 3500
    },

    {
        texto: "Talvez porque eu nunca tenha encontrado as palavras certas.",
        tempo: 4500
    }

];


// ======================================================
// MOSTRAR FRASE
// ======================================================

async function mostrarFrase(item) {

    frase.textContent = item.texto;

    frase.classList.remove("saindo");

    frase.classList.add("visivel");

    await esperar(item.tempo);

    frase.classList.remove("visivel");

    frase.classList.add("saindo");

    await esperar(2000);

}


// ======================================================
// INICIAR PÁGINA
// ======================================================

async function iniciarPagina() {

    await esperar(1000);

    for (const item of introducao) {

        await mostrarFrase(item);

    }

    pensamentosContainer.classList.add("visivel");

}


iniciarPagina();


// ======================================================
// ABRIR PENSAMENTO
// ======================================================

botoesPensamento.forEach(botao => {

    botao.addEventListener("click", () => {

        const numero = botao.dataset.pensamento;

        abrirPensamento(numero);

    });

});


function abrirPensamento(numero) {

    const pensamento = pensamentos[numero];


    pensamentoNumero.textContent =
        String(numero).padStart(2, "0");


    pensamentoTitulo.textContent =
        pensamento.titulo;


    pensamentoTexto.textContent =
        pensamento.texto;


    pensamentosContainer.style.opacity = "0";


    pensamentoAberto.classList.add("visivel");


    pensamentosVistos.add(numero);


    if (
        pensamentosVistos.size === 5 &&
        !transicaoIniciada
    ) {

        transicaoIniciada = true;

    }

}


// ======================================================
// FECHAR PENSAMENTO
// ======================================================

fechar.addEventListener("click", async () => {

    pensamentoAberto.classList.remove("visivel");


    await esperar(1000);


    pensamentosContainer.style.opacity = "1";


    // Se os cinco já foram vistos,
    // começa o encerramento da página.

    if (
        pensamentosVistos.size === 5 &&
        transicaoIniciada
    ) {

        await esperar(1500);

        mostrarFinal();

    }

});


// ======================================================
// FINAL
// ======================================================

async function mostrarFinal() {

    pensamentosContainer.style.opacity = "0";


    await esperar(1500);


    fraseFinal.textContent =
        "Talvez agora você saiba.";


    final.classList.add("visivel");


    await esperar(5000);


    document.body.style.transition =
        "opacity 2s ease";

    document.body.style.opacity = "0";


    await esperar(2000);


    window.location.href =
        "nossa-trilha.html";

}
const frase = document.getElementById("frase");

const trilha = document.getElementById("trilha");

const faixasContainer = document.getElementById("faixas");

const botaoAnterior = document.getElementById("anterior");

const botaoProximo = document.getElementById("proximo");

const indicadores = document.getElementById("indicadores");

const final = document.getElementById("final");

const fraseFinal = document.getElementById("frase-final");


// ======================================================
// CONTROLE
// ======================================================

let indiceAtual = 0;

let transicaoFinal = false;

let primeiraExibicao = true;


// ======================================================
// FUNÇÃO DE ESPERA
// ======================================================

function esperar(tempo) {

    return new Promise(resolve => {
        setTimeout(resolve, tempo);
    });

}


// ======================================================
// MÚSICAS
// ======================================================

const musicas = [

    {
        titulo: "Freak on a Leash",

        artista: "Korn",

        legenda:
            "Uma música que me lembra você.",

        youtube:
            "ihgc5LQbjg8"
    },


    {
        titulo: "Sailor Song",

        artista: "Gigi Perez",

        legenda:
            "Uma música que eu dedicaria a você.",

        youtube:
            "wPY6dOC-MDA"
    },


    {
        titulo: "Golden Brown",

        artista: "The Stranglers",

        legenda:
            "Uma música que eu imagino tendo a sua vibe, aos meus olhos.",

        youtube:
            "BTnM71u_v2I"
    },


    {
        titulo: "Just the Two of Us",

        artista: "Grover Washington Jr. feat. Bill Withers",

        legenda:
            "Uma música que eu colocaria de trilha sonora para um dia especial nosso.",

        youtube:
            "6POZlJAZsok"
    },


    {
        titulo: "Lovers Rock",

        artista: "TV Girl",

        legenda:
            "Uma música que eu gostaria de dançar contigo.",

        youtube:
            "j_sG_Juncn8"
    },


    {
        titulo: "A Thousand Years",

        artista: "John Michael Howell",

        legenda:
            "A primeira música que eu escutei pensando em ti.",

        youtube:
            "6fVlX2AbW_U"
    },


    {
        titulo: "I Wanna Be Yours",

        artista: "Arctic Monkeys",

        legenda:
            "Uma música que substituiria minhas palavras.",

        youtube:
            "nyuo9-OjNNg"
    },


    {
        titulo: "1 Minuto para o Fim do Mundo",

        artista: "CPM 22",

        legenda:
            "Uma música que você me ensinou a gostar.",

        youtube:
            "2Z8Fyuj-gxo"
    }

];


// ======================================================
// INTRODUÇÃO
// ======================================================

const introducao = [

    {
        texto: "Algumas coisas são difíceis de colocar em palavras.",

        tempo: 4000
    },


    {
        texto: "Às vezes, uma música consegue dizer aquilo que a gente não consegue.",

        tempo: 4500
    },


    {
        texto: "Essas são algumas delas.",

        tempo: 3500
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
// CRIAR CARDS
// ======================================================

function criarFaixas() {

    musicas.forEach((musica, indice) => {

        const faixa = document.createElement("article");

        faixa.classList.add("faixa");

        faixa.dataset.indice = indice;


        const player = document.createElement("div");

        player.classList.add("player");


        const iframe = document.createElement("iframe");

        iframe.src =
            `https://www.youtube.com/embed/${musica.youtube}`;

        iframe.title =
            musica.titulo;

        iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        );

        iframe.setAttribute(
            "allowfullscreen",
            ""
        );


        player.appendChild(iframe);


        const informacoes =
            document.createElement("div");

        informacoes.classList.add("informacoes");


        const titulo =
            document.createElement("h2");

        titulo.classList.add("titulo");

        titulo.textContent =
            musica.titulo;


        const artista =
            document.createElement("p");

        artista.classList.add("artista");

        artista.textContent =
            musica.artista;


        const legenda =
            document.createElement("p");

        legenda.classList.add("legenda");

        legenda.textContent =
            musica.legenda;


        informacoes.appendChild(titulo);

        informacoes.appendChild(artista);

        informacoes.appendChild(legenda);


        faixa.appendChild(player);

        faixa.appendChild(informacoes);


        faixasContainer.appendChild(faixa);

    });

}


// ======================================================
// CRIAR INDICADORES
// ======================================================

function criarIndicadores() {

    musicas.forEach((_, indice) => {

        const indicador =
            document.createElement("button");

        indicador.classList.add("indicador");

        indicador.setAttribute(
            "aria-label",
            `Ir para música ${indice + 1}`
        );


        indicador.addEventListener(
            "click",
            () => {

                irPara(indice);

            }
        );


        indicadores.appendChild(indicador);

    });

}


// ======================================================
// ATUALIZAR CARROSSEL
// ======================================================

function atualizarCarrossel() {

    const faixas =
        document.querySelectorAll(".faixa");

    const pontos =
        document.querySelectorAll(".indicador");


    faixas.forEach((faixa, indice) => {

        faixa.classList.remove(
            "ativa",
            "anterior",
            "proxima"
        );


        if (indice === indiceAtual) {

            faixa.classList.add("ativa");

        }


        else if (
            indice ===
            indiceAtual - 1
        ) {

            faixa.classList.add("anterior");

        }


        else if (
            indice ===
            indiceAtual + 1
        ) {

            faixa.classList.add("proxima");

        }

    });


    pontos.forEach((ponto, indice) => {

        ponto.classList.toggle(
            "ativo",
            indice === indiceAtual
        );

    });

}


// ======================================================
// IR PARA UMA MÚSICA
// ======================================================

function irPara(indice) {

    if (transicaoFinal) {
        return;
    }


    if (indice < 0) {

        return;

    }


    if (indice >= musicas.length) {

        iniciarFinal();

        return;

    }


    indiceAtual = indice;

    atualizarCarrossel();

}


// ======================================================
// PRÓXIMA
// ======================================================

botaoProximo.addEventListener(
    "click",
    () => {

        if (
            indiceAtual ===
            musicas.length - 1
        ) {

            iniciarFinal();

            return;

        }


        irPara(indiceAtual + 1);

    }
);


// ======================================================
// ANTERIOR
// ======================================================

botaoAnterior.addEventListener(
    "click",
    () => {

        if (indiceAtual === 0) {

            return;

        }


        irPara(indiceAtual - 1);

    }
);


// ======================================================
// TECLADO
// ======================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            botaoProximo.click();

        }


        if (event.key === "ArrowLeft") {

            botaoAnterior.click();

        }

    }
);


// ======================================================
// FINAL
// ======================================================

async function iniciarFinal() {

    if (transicaoFinal) {
        return;
    }


    transicaoFinal = true;


    trilha.style.opacity = "0";

    indicadores.style.opacity = "0";

    botaoAnterior.style.opacity = "0";

    botaoProximo.style.opacity = "0";


    await esperar(1500);


    fraseFinal.textContent =
        "Algumas histórias também são contadas assim.";


    final.classList.add("visivel");


    await esperar(5000);


    document.body.style.transition =
        "opacity 2s ease";

    document.body.style.opacity =
        "0";


    await esperar(2000);


    window.location.href =
        "fotografias.html";

}


// ======================================================
// INICIAR PÁGINA
// ======================================================

async function iniciarPagina() {

    await esperar(1000);


    for (const item of introducao) {

        await mostrarFrase(item);

    }


    criarFaixas();

    criarIndicadores();

    atualizarCarrossel();


    await esperar(500);


    trilha.classList.add("visivel");

}


iniciarPagina();
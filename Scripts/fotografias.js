const frase = document.getElementById("frase");

const album = document.getElementById("album");

const fotografiasContainer =
    document.getElementById("fotografias");

const botaoAnterior =
    document.getElementById("anterior");

const botaoProximo =
    document.getElementById("proximo");

const indicadores =
    document.getElementById("indicadores");

const final =
    document.getElementById("final");

const fraseFinal =
    document.getElementById("frase-final");


// ======================================================
// CONTROLE
// ======================================================

let indiceAtual = 0;

let transicaoFinal = false;


// ======================================================
// ESPERA
// ======================================================

function esperar(tempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tempo);

    });

}


// ======================================================
// FOTOGRAFIAS
// ======================================================

const fotografias = [

    "foto01.jpg",
    "foto02.jpg",
    "foto03.jpg",
    "foto04.jpg",
    "foto05.jpg",
    "foto06.jpg",
    "foto07.jpg",
    "foto08.jpg",
    "foto09.jpg",
    "foto10.jpg",
    "foto11.jpg",
    "foto12.jpg",
    "foto13.jpg",
    "foto14.jpeg",
    "foto15.jpg",
    "foto16.jpg",
    "foto17.jpg",
    "foto18.jpg",
    "foto19.jpg"

];


// ======================================================
// INTRODUÇÃO
// ======================================================

const introducao = [

    {
        texto:
            "Existem coisas que eu não consigo colocar em palavras.",

        tempo: 4000
    },

    {
        texto:
            "Então, algumas delas eu prefiro guardar assim.",

        tempo: 4000
    }

];


// ======================================================
// MOSTRAR FRASE
// ======================================================

async function mostrarFrase(item) {

    frase.textContent =
        item.texto;

    frase.classList.remove("saindo");

    frase.classList.add("visivel");


    await esperar(item.tempo);


    frase.classList.remove("visivel");

    frase.classList.add("saindo");


    await esperar(2000);

}


// ======================================================
// CRIAR FOTOGRAFIAS
// ======================================================

function criarFotografias() {

    fotografias.forEach(
        (arquivo, indice) => {

            const fotografia =
                document.createElement("article");


            fotografia.classList.add(
                "fotografia"
            );


            fotografia.dataset.indice =
                indice;


            const imagem =
                document.createElement("img");


            imagem.src =
                `Assets/${arquivo}`;


            imagem.alt =
                `Fotografia ${indice + 1}`;


            imagem.draggable =
                false;


            imagem.addEventListener(
                "click",
                () => {

                    if (
                        indice ===
                        indiceAtual
                    ) {

                        proximaFotografia();

                    }

                }
            );


            fotografia.appendChild(
                imagem
            );


            fotografiasContainer.appendChild(
                fotografia
            );

        }
    );

}


// ======================================================
// CRIAR INDICADORES
// ======================================================

function criarIndicadores() {

    fotografias.forEach(
        (_, indice) => {

            const indicador =
                document.createElement("button");


            indicador.classList.add(
                "indicador"
            );


            indicador.setAttribute(
                "aria-label",
                `Ir para fotografia ${indice + 1}`
            );


            indicador.addEventListener(
                "click",
                () => {

                    irPara(indice);

                }
            );


            indicadores.appendChild(
                indicador
            );

        }
    );

}


// ======================================================
// ATUALIZAR CARROSSEL
// ======================================================

function atualizarCarrossel() {

    const elementos =
        document.querySelectorAll(
            ".fotografia"
        );


    const pontos =
        document.querySelectorAll(
            ".indicador"
        );


    elementos.forEach(
        (elemento, indice) => {

            elemento.classList.remove(
                "ativa",
                "anterior",
                "proxima"
            );


            if (
                indice ===
                indiceAtual
            ) {

                elemento.classList.add(
                    "ativa"
                );

            }


            else if (
                indice ===
                indiceAtual - 1
            ) {

                elemento.classList.add(
                    "anterior"
                );

            }


            else if (
                indice ===
                indiceAtual + 1
            ) {

                elemento.classList.add(
                    "proxima"
                );

            }

        }
    );


    pontos.forEach(
        (ponto, indice) => {

            ponto.classList.toggle(
                "ativo",
                indice === indiceAtual
            );

        }
    );

}


// ======================================================
// IR PARA
// ======================================================

function irPara(indice) {

    if (
        transicaoFinal ||
        indice < 0 ||
        indice >= fotografias.length
    ) {

        return;

    }


    indiceAtual =
        indice;


    atualizarCarrossel();

}


// ======================================================
// PRÓXIMA
// ======================================================

function proximaFotografia() {

    if (
        indiceAtual ===
        fotografias.length - 1
    ) {

        iniciarFinal();

        return;

    }


    irPara(
        indiceAtual + 1
    );

}


// ======================================================
// ANTERIOR
// ======================================================

function fotografiaAnterior() {

    if (
        indiceAtual === 0
    ) {

        return;

    }


    irPara(
        indiceAtual - 1
    );

}


// ======================================================
// BOTÕES
// ======================================================

botaoProximo.addEventListener(
    "click",
    proximaFotografia
);


botaoAnterior.addEventListener(
    "click",
    fotografiaAnterior
);


// ======================================================
// TECLADO
// ======================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "ArrowRight"
        ) {

            proximaFotografia();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            fotografiaAnterior();

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


    album.style.opacity =
        "0";


    indicadores.style.opacity =
        "0";


    botaoAnterior.style.opacity =
        "0";


    botaoProximo.style.opacity =
        "0";


    await esperar(1500);


    fraseFinal.textContent =
        "Algumas lembranças não precisam de explicação.";


    final.classList.add(
        "visivel"
    );


    await esperar(4000);


    fraseFinal.textContent =
        "Só precisam continuar existindo.";


    await esperar(5000);


    document.body.style.transition =
        "opacity 2s ease";


    document.body.style.opacity =
        "0";


    await esperar(2000);


    window.location.href =
        "pequenas-historias.html";

}


// ======================================================
// INICIAR
// ======================================================

async function iniciarPagina() {

    await esperar(1000);


    for (
        const item of introducao
    ) {

        await mostrarFrase(item);

    }


    criarFotografias();

    criarIndicadores();

    atualizarCarrossel();


    await esperar(500);


    album.classList.add(
        "visivel"
    );

}


iniciarPagina();
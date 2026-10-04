const capa = document.getElementById("capa");
const abrirLivro = document.getElementById("abrirLivro");

const paginas = [
    ...document.querySelectorAll(".pagina-texto")
];

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const contador = document.getElementById("contador");

const finalLivro = document.getElementById("finalLivro");

let paginaAtual = 0;
let livroAberto = false;
let animando = false;


/* =========================
   INICIAR
========================= */

function inicializarLivro() {

    paginas.forEach((pagina, indice) => {

        if (indice === 0) {
            pagina.classList.add("ativa");
        } else {
            pagina.classList.remove("ativa");
        }

    });

    atualizarContador();
}


/* =========================
   ABRIR LIVRO
========================= */

abrirLivro.addEventListener("click", async () => {

    if (livroAberto || animando) return;

    animando = true;

    livroAberto = true;

    capa.classList.add("aberta");

    await esperar(900);

    animando = false;

    atualizarContador();
});


/* =========================
   MOSTRAR PÁGINA
========================= */

async function mostrarPagina(indice) {

    if (!livroAberto || animando) return;

    if (indice < 0) return;

    if (indice >= paginas.length) {
        finalizarLivro();
        return;
    }

    animando = true;

    const paginaAnterior = paginas[paginaAtual];
    const proximaPagina = paginas[indice];

    paginaAnterior.classList.remove("ativa");

    await esperar(300);

    paginaAtual = indice;

    proximaPagina.classList.add("ativa");

    atualizarContador();

    await esperar(900);

    animando = false;
}


/* =========================
   PRÓXIMA PÁGINA
========================= */

proximo.addEventListener("click", () => {

    mostrarPagina(paginaAtual + 1);

});


/* =========================
   PÁGINA ANTERIOR
========================= */

anterior.addEventListener("click", () => {

    if (animando) return;

    if (paginaAtual === 0) {

        capa.classList.remove("aberta");

        livroAberto = false;

        atualizarContador();

        return;
    }

    mostrarPagina(paginaAtual - 1);

});


/* =========================
   CONTADOR
========================= */

function atualizarContador() {

    if (!livroAberto) {

        contador.textContent = "capa";

        return;
    }

    contador.textContent =
        `${String(paginaAtual + 1).padStart(2, "0")} / ${String(paginas.length).padStart(2, "0")}`;
}


/* =========================
   FINAL DO LIVRO
========================= */

async function finalizarLivro() {

    if (animando) return;

    animando = true;

    finalLivro.classList.add("visivel");

    await esperar(8000);

    window.location.href = "ainda-escrevendo.html";
}


/* =========================
   TECLADO
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (livroAberto) {
            mostrarPagina(paginaAtual + 1);
        }

    }

    if (event.key === "ArrowLeft") {

        if (livroAberto) {
            anterior.click();
        }

    }

});


/* =========================
   ESPERA
========================= */

function esperar(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}


/* =========================
   INÍCIO
========================= */

inicializarLivro();
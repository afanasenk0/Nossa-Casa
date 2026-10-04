
const cena = document.getElementById("cena");
const porta = document.getElementById("porta");
const dialogo = document.getElementById("dialogo");
const texto = document.getElementById("texto");
const telaPreta = document.getElementById("telaPreta");
const final = document.getElementById("final");

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostrarTexto(mensagem, duracao = 3500) {
    texto.textContent = mensagem;
    dialogo.classList.add("visivel");

    await esperar(duracao);

    dialogo.classList.remove("visivel");
    await esperar(1800);
}

async function iniciarCena() {

    // A câmera se aproxima lentamente da porta.
    await esperar(1200);
    cena.classList.add("aproximando");

    await esperar(3000);

    // A maçaneta se move.
    cena.classList.add("macaneta-ativa");

    await esperar(900);

    // A porta começa a abrir.
    cena.classList.add("abrindo");

    await esperar(2200);

    // Primeira fala.
    await mostrarTexto("Amor! Estou em casa", 3200);

    // A cena desaparece lentamente.
    await esperar(800);
    telaPreta.classList.add("ativa");

    await esperar(4000);

    // Segunda fala, agora no escuro.
    await mostrarTexto("Bem-vinda de volta!", 3000);

    await mostrarTexto("Eu estava esperando por você.", 3500);

    await mostrarTexto("Depois de tudo, é aqui que eu quero estar.", 4000);

    // A última frase.
    await esperar(1000);
    final.classList.add("visivel");

    // Deixa a frase permanecer na tela.
    await esperar(7000);

    // Próxima página.
    window.location.href = "nossa-casa.html";
}

// Inicia a sequência quando a página estiver carregada.
window.addEventListener("load", () => {
    iniciarCena();
});
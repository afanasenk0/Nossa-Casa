const frase = document.getElementById("frase");
const fraseContainer = document.getElementById("frase-container");
const titulo = document.getElementById("titulo");
const botaoEntrar = document.getElementById("entrar");


const frases = [
    {
        texto: "Existem coisas que a gente não consegue explicar.",
        tempo: 4500
    },

    {
        texto: "Algumas pessoas chegam...",
        tempo: 3500
    },

    {
        texto: "...e mudam o lugar onde a gente chama de casa.",
        tempo: 5000
    },

    {
        texto: "Essa é a nossa história.",
        tempo: 4500
    }
];


function esperar(tempo) {
    return new Promise(resolve => {
        setTimeout(resolve, tempo);
    });
}


async function mostrarFrase(item) {

    frase.textContent = item.texto;

    frase.classList.remove("saindo");
    frase.classList.add("visivel");

    await esperar(item.tempo);

    frase.classList.remove("visivel");
    frase.classList.add("saindo");

    await esperar(2000);
}


async function iniciarEntrada() {

    await esperar(1500);

    for (const item of frases) {
        await mostrarFrase(item);
    }

    fraseContainer.style.display = "none";

    await esperar(1000);

    titulo.classList.add("visivel");
}


iniciarEntrada();


botaoEntrar.addEventListener("click", () => {

    document.body.style.transition = "opacity 2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
         window.location.href = "primeiro-passo.html";
    }, 2000);

});
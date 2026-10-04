const final = document.getElementById("final");

const frases = [
    document.querySelector(".frase-1"),
    document.querySelector(".frase-2"),
    document.querySelector(".frase-3")
];

const titulo = document.querySelector("h1");
const inicio = document.getElementById("inicio");


function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function iniciar() {

    await esperar(1500);

    frases[0].classList.add("visivel");

    await esperar(4000);

    frases[0].classList.remove("visivel");

    await esperar(1800);

    frases[1].classList.add("visivel");

    await esperar(4000);

    frases[1].classList.remove("visivel");

    await esperar(1800);

    frases[2].classList.add("visivel");

    await esperar(5000);

    frases[2].classList.remove("visivel");

    await esperar(2500);

    titulo.classList.add("visivel");

    await esperar(4500);

    final.classList.add("iniciando");

    await esperar(5000);

    inicio.classList.add("visivel");
}


inicio.addEventListener("click", () => {

    document.body.style.transition = "opacity 2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);

});


window.addEventListener("load", iniciar);
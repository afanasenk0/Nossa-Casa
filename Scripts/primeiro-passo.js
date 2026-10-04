const frase = document.getElementById("frase");

const datas = document.getElementById("datas");

const botoes = document.querySelectorAll("#datas button");

const revelacao = document.getElementById("revelacao");

const data = document.getElementById("data");

const texto = document.getElementById("texto");


const frases = [
    {
        texto: "Antes de continuar, existe uma coisa que você precisa lembrar.",
        tempo: 4500
    },

    {
        texto: "Entre inúmeras datas importantes na minha vida, acho que uma se destaca mais.",
        tempo: 5000
    },

    {
        texto: "Talvez você saiba qual é.",
        tempo: 3500
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


async function iniciarPagina() {

    await esperar(1000);

    for (const item of frases) {

        await mostrarFrase(item);

    }

    datas.classList.add("visivel");
}


iniciarPagina();


botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const dataEscolhida = botao.dataset.data;

        if (dataEscolhida === "07/04") {

            revelarData();

        } else {

            frase.textContent = "Não é essa.";

            frase.classList.remove("saindo");

            frase.classList.add("visivel");

            setTimeout(() => {

                frase.classList.remove("visivel");
                frase.classList.add("saindo");

            }, 2000);

        }

    });

});


async function revelarData() {

    datas.style.display = "none";

    await esperar(1000);

    data.textContent = "07/04";

    texto.textContent =
        "O dia em que nasceu alguém que, de tantas maneiras diferentes, acabou se tornando parte da minha vida.";

    revelacao.classList.add("visivel");

    await esperar(5000);

    revelacao.classList.remove("visivel");

    await esperar(2000);

    texto.textContent =
        "É engraçado como alguns números deixam de ser apenas números.";

    revelacao.classList.add("visivel");

    await esperar(4500);

    revelacao.classList.remove("visivel");

    await esperar(2000);

    texto.textContent =
    "Esse é um deles.";

    revelacao.classList.add("visivel");

    await esperar(5000);

    document.body.style.transition = "opacity 2s ease";
    document.body.style.opacity = "0";

    await esperar(2000);

    window.location.href = "o-que-eu-nunca-soube-dizer.html";
}
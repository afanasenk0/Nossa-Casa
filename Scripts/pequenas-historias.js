const frase = document.getElementById("frase");

const historiasSection =
    document.getElementById("historias");

const historia =
    document.getElementById("historia");

const numeroHistoria =
    document.getElementById("numero-historia");

const tituloHistoria =
    document.getElementById("titulo-historia");

const textoHistoria =
    document.getElementById("texto-historia");

const botaoAnterior =
    document.getElementById("anterior");

const botaoProximo =
    document.getElementById("proximo");

const contador =
    document.getElementById("contador");

const indicadores =
    document.getElementById("indicadores");

const final =
    document.getElementById("final");

const fraseFinal =
    document.getElementById("frase-final");


/* ======================================================
   HISTÓRIAS
   ====================================================== */

const historias = [

    {
        titulo: "O começo",

        texto:
            'Lembra da nossa primeira conversa? "EU VOU MATAR O GUILHERME" kkkkkkkkk. Ainda me lembro de como dei um pulo lendo essa mensagem e percebi quem era.'
    },


    {
        titulo: "Loccitane, aí vou eu",

        texto:
            "A primeira vez que fui te buscar, um lugar totalmente diferente do que eu estava acostumado. Hoje eu sei o caminho de cor, mas naquela época eu peguei o mais longo e saí correndo pra chegar a tempo kkkkk."
    },


    {
        titulo: "RATAZANA",

        texto:
            "Esse eu lembro perfeitamente. Fomos tomar um Red Bull após seu trabalho, e surgiu essa pérola. Eu nunca vou superar a cara que a moça atrás de ti fez depois dessa frase."
    },


    {
        titulo: "Nosso primeiro encontro",

        texto:
            "Liberdade. Que lugar lindo. A primeira vez que fui na minha vida, e você estava tão linda naquele dia. Nós andamos bastante, e teve até aquele B.O. com o seu pai. Foi um dos melhores dias desde que te conheci. Conheci tantos lugares legais lá."
    },


    {
        titulo: "A catedral",

        texto:
            "Sim, eu sei. Faz parte do nosso primeiro encontro, mas eu sinto que ela merece uma parte apenas para ela. Eu lembro o quanto chorei agradecendo a Deus naquele dia. Ainda sonho em te encontrar no altar lá. É definitivamente um dos lugares mais belos em que estive na minha vida."
    },


    {
        titulo: "O Almirante",

        texto:
            "Nossa, eu lembro até hoje. Foi bem no começo. Você foi lá como alguém que não queria nada, me olhando como uma picanha e me chamando de gatinho. Eu fiquei sem jeito, mas estava gostando demais de te ver lá. Aí você começou a beber igual doida e eu pensando em como te levar até em casa, até o Renan tocar aquela música e, bem, aconteceu o nosso primeiro beijo naquele lugar. Lembro de você no dia seguinte: \"AQUILO REALMENTE ACONTECEU???\". Foi muito engraçado e fofo kkkkkkk."
    },


    {
        titulo: "Academia",

        texto:
            "Essa é boba. Aquele dia que você me acompanhou. Eu lembro que queria me amostrar, mas além de fraco eu estava com medo de pegar muito peso e me peidar kkkkk. Que raiva."
    },


    {
        titulo: "O buquê",

        texto:
            "Lembra daquele buquê que eu te dei e você tirou inúmeras fotos de vestido? Eu sinto falta disso. Você ficava linda com as flores."
    },


    {
        titulo: "Dia dos namorados",

        texto:
            "Ali você me lascou. O Guilherme junto dando ideias, e eu sei que gastei tanto dinheiro que estava pra chorar. Mas, sendo sincero? A sua reação pagou tudo o que eu gastei. Eu fiquei muito feliz pela forma que você estava."
    },


    {
        titulo: "A aliança",

        texto:
            "Foi antes do Dia dos Namorados, você lembra? Eu me confundi todo e não sabia como te entregar a aliança. Sua reação naquele dia foi incrível. Você andava dando pulinhos kkkkk."
    },


    {
        titulo: "O brownie",

        texto:
            "Ainda sinto os puxões de cabelo que você me deu enquanto eu só queria mexer o chocolate derretido. Gostei tanto daqueles vídeos que guardei pra mim. Não quis postar."
    },


    {
        titulo: "A Galeria do Rock",

        texto:
            "Acho que foi um dos melhores dias ao seu lado. Definitivamente o nosso melhor date. Fizemos tantas coisas. Eu fiquei com muita dó quando você perdeu o celular, mas depois que você achou eu fiquei achando engraçado, por mais que quase tenha dado muita merda. A gente correu um monte."
    },


    {
        titulo: "O Campo de Marte",

        texto:
            "A melhor experiência que tive na minha vida, e foi ao seu lado. Chorei tanto de felicidade depois disso. Foi incrível ter voltado de tal forma."
    },


    {
        titulo: "A madrugada no portão",

        texto:
            "Me lembrou de todos os dias em que eu ia de noite te ver no portão, mas dessa vez com uma enorme tristeza e um sentimento de esperança."
    }

];


/* ======================================================
   INTRODUÇÃO
   ====================================================== */

const introducao = [

    {
        texto:
            "Nem tudo que eu lembro de nós aconteceu em um dia importante.",

        tempo: 4000
    },

    {
        texto:
            "Algumas coisas ficaram porque eram pequenas demais para serem esquecidas.",

        tempo: 4500
    }

];


/* ======================================================
   ESPERA
   ====================================================== */

function esperar(tempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tempo);

    });

}


/* ======================================================
   INTRODUÇÃO
   ====================================================== */

async function mostrarIntroducao() {

    for (const item of introducao) {

        frase.textContent =
            item.texto;

        frase.classList.remove(
            "saindo"
        );

        frase.classList.add(
            "visivel"
        );


        await esperar(
            item.tempo
        );


        frase.classList.remove(
            "visivel"
        );

        frase.classList.add(
            "saindo"
        );


        await esperar(2000);

    }

}


/* ======================================================
   INDICADORES
   ====================================================== */

function criarIndicadores() {

    historias.forEach(
        (_, indice) => {

            const indicador =
                document.createElement("button");


            indicador.classList.add(
                "indicador"
            );


            indicador.setAttribute(
                "aria-label",
                `Ir para história ${indice + 1}`
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


/* ======================================================
   MOSTRAR HISTÓRIA
   ====================================================== */

async function mostrarHistoria(
    indice
) {

    historia.classList.remove(
        "visivel"
    );


    await esperar(500);


    const item =
        historias[indice];


    numeroHistoria.textContent =
        String(indice + 1).padStart(
            2,
            "0"
        );


    tituloHistoria.textContent =
        item.titulo;


    textoHistoria.textContent =
        item.texto;


    contador.textContent =
        `${String(indice + 1).padStart(2, "0")} / ${String(historias.length).padStart(2, "0")}`;


    historia.classList.add(
        "visivel"
    );


    atualizarIndicadores();

}


/* ======================================================
   INDICADORES ATIVOS
   ====================================================== */

function atualizarIndicadores() {

    const pontos =
        document.querySelectorAll(
            ".indicador"
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


/* ======================================================
   IR PARA
   ====================================================== */

let indiceAtual = 0;

let transicaoFinal = false;


async function irPara(indice) {

    if (
        transicaoFinal ||
        indice < 0 ||
        indice >= historias.length ||
        indice === indiceAtual
    ) {

        return;

    }


    indiceAtual =
        indice;


    await mostrarHistoria(
        indiceAtual
    );

}


/* ======================================================
   PRÓXIMA
   ====================================================== */

async function proximaHistoria() {

    if (transicaoFinal) {

        return;

    }


    if (
        indiceAtual <
        historias.length - 1
    ) {

        indiceAtual++;

        await mostrarHistoria(
            indiceAtual
        );

        return;

    }


    iniciarFinal();

}


/* ======================================================
   ANTERIOR
   ====================================================== */

async function historiaAnterior() {

    if (
        transicaoFinal ||
        indiceAtual === 0
    ) {

        return;

    }


    indiceAtual--;


    await mostrarHistoria(
        indiceAtual
    );

}


/* ======================================================
   BOTÕES
   ====================================================== */

botaoProximo.addEventListener(
    "click",
    proximaHistoria
);


botaoAnterior.addEventListener(
    "click",
    historiaAnterior
);


/* ======================================================
   TECLADO
   ====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "ArrowRight"
        ) {

            proximaHistoria();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            historiaAnterior();

        }

    }
);


/* ======================================================
   FINAL
   ====================================================== */

async function iniciarFinal() {

    if (transicaoFinal) {

        return;

    }


    transicaoFinal = true;


    historia.classList.remove(
        "visivel"
    );


    botaoAnterior.style.opacity =
        "0";

    botaoProximo.style.opacity =
        "0";

    contador.style.opacity =
        "0";

    indicadores.style.opacity =
        "0";


    await esperar(1800);


    fraseFinal.textContent =
        "Talvez seja isso que torna uma história nossa.";


    final.classList.add(
        "visivel"
    );


    await esperar(4000);


    fraseFinal.textContent =
        "Não apenas aquilo que aconteceu.";


    await esperar(3500);


    fraseFinal.textContent =
        "Mas tudo aquilo que ninguém além de nós teria entendido.";


    await esperar(5000);


    document.body.style.transition =
        "opacity 2s ease";

    document.body.style.opacity =
        "0";


    await esperar(2000);


    window.location.href =
        "a-ultima-porta.html";

}


/* ======================================================
   INICIAR
   ====================================================== */

async function iniciarPagina() {

    await esperar(1000);


    await mostrarIntroducao();


    criarIndicadores();


    historiasSection.classList.add(
        "visivel"
    );


    await mostrarHistoria(
        0
    );

}


iniciarPagina();
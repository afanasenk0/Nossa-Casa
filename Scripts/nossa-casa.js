import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/* =========================================================
   CENA
========================================================= */

const cena = new THREE.Scene();

cena.background =
    new THREE.Color(0x050505);


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth /
            window.innerHeight,
        0.1,
        100
    );

const cameraInicial =
    new THREE.Vector3(
        9,
        8,
        10
    );

const alvoInicial =
    new THREE.Vector3(
        0,
        1,
        0
    );

camera.position.copy(
    cameraInicial
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


/* =========================================================
   CONTROLES
========================================================= */

const controles =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controles.enableDamping =
    true;

controles.dampingFactor =
    0.05;

controles.enablePan =
    false;

controles.minDistance =
    6;

controles.maxDistance =
    15;

controles.minPolarAngle =
    Math.PI * 0.25;

controles.maxPolarAngle =
    Math.PI * 0.48;

controles.target.copy(
    alvoInicial
);


/* =========================================================
   ILUMINAÇÃO
========================================================= */

const luzAmbiente =
    new THREE.HemisphereLight(
        0xfff4df,
        0x111111,
        1.4
    );

cena.add(luzAmbiente);


const luzPrincipal =
    new THREE.DirectionalLight(
        0xffe8c7,
        2.2
    );

luzPrincipal.position.set(
    4,
    8,
    5
);

luzPrincipal.castShadow =
    true;

luzPrincipal.shadow.mapSize.width =
    2048;

luzPrincipal.shadow.mapSize.height =
    2048;

luzPrincipal.shadow.camera.left =
    -10;

luzPrincipal.shadow.camera.right =
    10;

luzPrincipal.shadow.camera.top =
    10;

luzPrincipal.shadow.camera.bottom =
    -10;

cena.add(luzPrincipal);


/* =========================================================
   MATERIAIS
========================================================= */

function material(
    cor,
    rugosidade = 0.8
) {

    return new THREE.MeshStandardMaterial({
        color: cor,
        roughness: rugosidade
    });

}

const madeira =
    material(0x4a3428);

const madeiraEscura =
    material(0x2c211b);

const parede =
    material(0x171616);

const tecido =
    material(0x56504b);

const tecidoClaro =
    material(0x777069);

const metal =
    material(
        0x303030,
        0.4
    );

const tapeteMaterial =
    material(0x393330);


/* =========================================================
   FUNÇÃO DE OBJETO
========================================================= */

function adicionarObjeto(
    geometria,
    materialObjeto,
    posicao,
    sombras = true
) {

    const objeto =
        new THREE.Mesh(
            geometria,
            materialObjeto
        );

    objeto.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    if (sombras) {

        objeto.castShadow =
            true;

        objeto.receiveShadow =
            true;

    }

    cena.add(objeto);

    return objeto;

}


/* =========================================================
   PISO
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        10,
        0.25,
        8
    ),
    material(0x292522),
    {
        x: 0,
        y: -0.125,
        z: 0
    }
);


/* =========================================================
   PAREDES
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        10,
        4,
        0.2
    ),
    parede,
    {
        x: 0,
        y: 2,
        z: -4
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.2,
        4,
        8
    ),
    material(0x1b1a19),
    {
        x: -5,
        y: 2,
        z: 0
    }
);


/* =========================================================
   JANELA
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        3,
        2,
        0.08
    ),
    new THREE.MeshStandardMaterial({
        color: 0x202832,
        roughness: 0.2,
        metalness: 0.1
    }),
    {
        x: 1.5,
        y: 2.3,
        z: -3.87
    },
    false
);


const luzJanela =
    new THREE.PointLight(
        0xc7d9ff,
        2,
        8
    );

luzJanela.position.set(
    1.5,
    2.5,
    -2.8
);

cena.add(luzJanela);


/* =========================================================
   CAMA
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        2.25,
        0.45,
        4.2
    ),
    madeiraEscura,
    {
        x: -3.65,
        y: 0.35,
        z: -1.85
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        2.1,
        0.38,
        4.05
    ),
    tecidoClaro,
    {
        x: -3.65,
        y: 0.76,
        z: -1.85
    }
);


/* =========================================================
   CABECEIRA
========================================================= */

const cabeceira =
    adicionarObjeto(
        new THREE.BoxGeometry(
            0.18,
            1.5,
            2.20
        ),
        madeira,
        {
            x: -3.65,
            y: 1.25,
            z: -3.85
        }
    );

cabeceira.rotation.y =
    Math.PI / 2;


/* =========================================================
   TRAVESSEIROS
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        1.25,
        0.18,
        0.7
    ),
    tecido,
    {
        x: -4.05,
        y: 1.02,
        z: -3.25
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        1.25,
        0.18,
        0.7
    ),
    tecido,
    {
        x: -3.25,
        y: 1.02,
        z: -3.25
    }
);


/* =========================================================
   ESCRIVANINHA
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        0.85,
        0.18,
        2.6
    ),
    madeira,
    {
        x: -4.0,
        y: 1.35,
        z: 1.85
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.14,
        1.35,
        0.14
    ),
    madeiraEscura,
    {
        x: -4.0,
        y: 0.68,
        z: 0.8
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.14,
        1.35,
        0.14
    ),
    madeiraEscura,
    {
        x: -4.0,
        y: 0.68,
        z: 2.9
    }
);


/* =========================================================
   CADEIRA
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        0.9,
        0.15,
        0.9
    ),
    madeira,
    {
        x: -2.9,
        y: 0.8,
        z: 1.85
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.15,
        1.1,
        0.9
    ),
    madeira,
    {
        x: -2.45,
        y: 1.25,
        z: 1.85
    }
);


[
    [-3.2, 1.5],
    [-3.2, 2.2],
    [-2.7, 1.5],
    [-2.7, 2.2]
].forEach(
    ([x, z]) => {

        adicionarObjeto(
            new THREE.BoxGeometry(
                0.1,
                0.8,
                0.1
            ),
            madeiraEscura,
            {
                x,
                y: 0.4,
                z
            }
        );

    }
);


/* =========================================================
   CÔMODA / TV
========================================================= */

const comodaX = 2.9;
const comodaZ = -3.35;


adicionarObjeto(
    new THREE.BoxGeometry(
        2.5,
        1.15,
        0.7
    ),
    madeira,
    {
        x: comodaX,
        y: 0.7,
        z: comodaZ
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        2.65,
        0.14,
        0.8
    ),
    madeiraEscura,
    {
        x: comodaX,
        y: 1.34,
        z: comodaZ
    }
);


for (let i = 0; i < 4; i++) {

    adicionarObjeto(
        new THREE.BoxGeometry(
            0.48,
            0.22,
            0.05
        ),
        material(0x241a15),
        {
            x:
                comodaX -
                0.75 +
                (i % 2) * 0.9,

            y:
                0.55 +
                Math.floor(i / 2) *
                0.38,

            z:
                comodaZ -
                0.37
        }
    );

}


adicionarObjeto(
    new THREE.BoxGeometry(
        0.12,
        0.3,
        0.12
    ),
    metal,
    {
        x: 2.0,
        y: 0.15,
        z: -3.65
    }
);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.12,
        0.3,
        0.12
    ),
    metal,
    {
        x: 3.8,
        y: 0.15,
        z: -3.65
    }
);


/* =========================================================
   TV
========================================================= */

const telaTV =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            2.1,
            1.2,
            0.08
        ),
        new THREE.MeshStandardMaterial({
            color: 0x050505,
            roughness: 0.25,
            metalness: 0.4
        })
    );

telaTV.position.set(
    comodaX,
    2.05,
    comodaZ
);

telaTV.castShadow = true;

cena.add(telaTV);


adicionarObjeto(
    new THREE.BoxGeometry(
        0.8,
        0.08,
        0.35
    ),
    metal,
    {
        x: comodaX,
        y: 1.42,
        z: comodaZ
    }
);


/* =========================================================
   TAPETE
========================================================= */

adicionarObjeto(
    new THREE.BoxGeometry(
        5.4,
        0.08,
        3.7
    ),
    tapeteMaterial,
    {
        x: 0.65,
        y: 0.04,
        z: 0.8
    }
);


/* =========================================================
   MESA CENTRAL
========================================================= */

adicionarObjeto(
    new THREE.CylinderGeometry(
        0.65,
        0.65,
        0.12,
        32
    ),
    madeira,
    {
        x: 0.65,
        y: 0.75,
        z: 0.8
    }
);


adicionarObjeto(
    new THREE.CylinderGeometry(
        0.12,
        0.18,
        0.7,
        16
    ),
    metal,
    {
        x: 0.65,
        y: 0.4,
        z: 0.8
    }
);


adicionarObjeto(
    new THREE.CylinderGeometry(
        0.45,
        0.45,
        0.08,
        16
    ),
    metal,
    {
        x: 0.65,
        y: 0.06,
        z: 0.8
    }
);




/* =========================================================
   OBJETOS INTERATIVOS
========================================================= */

const objetosInterativos = [];

const objetosVisitados = new Set();

let casaConcluida = false;
let transicaoParaLivro = false;


/* =========================================================
   BUQUÊ
========================================================= */

const grupoBuque =
    new THREE.Group();

grupoBuque.position.set(
    0.65,
    0,
    0.8
);

cena.add(grupoBuque);


const vaso =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.16,
            0.13,
            0.3,
            16
        ),
        material(0xddd6c8)
    );

vaso.position.y = 0.96;

vaso.castShadow = true;
vaso.receiveShadow = true;

grupoBuque.add(vaso);


for (let i = 0; i < 5; i++) {

    const angulo =
        (Math.PI * 2 / 5) * i;

    const haste =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.025,
                0.025,
                0.45,
                8
            ),
            material(0x405238)
        );

    haste.position.set(
        Math.cos(angulo) * 0.08,
        1.28,
        Math.sin(angulo) * 0.08
    );

    grupoBuque.add(haste);


    const flor =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.13,
                12,
                12
            ),
            material(0xb58c91)
        );

    flor.position.set(
        Math.cos(angulo) * 0.15,
        1.52 +
            (i % 2) * 0.05,
        Math.sin(angulo) * 0.15
    );

    flor.castShadow = true;

    grupoBuque.add(flor);

}


grupoBuque.userData.interativo =
    true;

grupoBuque.userData.nome =
    "O primeiro buquê";

grupoBuque.userData.descricao =
    "Lembra do primeiro buquê real que eu te dei? Elas eram lindas. Fui com o Guilherme buscar elas e voltei o caminho todo pensando em qual seria a sua reação. Se não me engano, eu levei uma torta de morango junto e foi a primeira conversa que tive com o seu pai, certo?";

objetosInterativos.push(
    grupoBuque
);


/* =========================================================
   ALIANÇAS
========================================================= */

const grupoAliancas =
    new THREE.Group();

cena.add(grupoAliancas);


const caixaAliancas =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.45,
            0.16,
            0.35
        ),
        material(0x5a3c32)
    );

caixaAliancas.position.set(
    -3.95,
    1.55,
    1.85
);

caixaAliancas.castShadow = true;

grupoAliancas.add(
    caixaAliancas
);


const tampaAliancas =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.45,
            0.06,
            0.35
        ),
        material(0x704b3d)
    );

tampaAliancas.position.set(
    -3.95,
    1.66,
    1.85
);

tampaAliancas.castShadow = true;

grupoAliancas.add(
    tampaAliancas
);


grupoAliancas.userData.interativo =
    true;

grupoAliancas.userData.nome =
    "Nossas alianças";

grupoAliancas.userData.descricao =
    "Ainda sinto falta delas, tanto das primeiras de promessa quanto da de namoro. Lembra o que eu te disse? \"As alianças servem como uma proteção para o casal. O desgaste natural é, na verdade, tudo de ruim que poderia nos acontecer. Ela nos protege disso e desgasta no processo.\"";

objetosInterativos.push(
    grupoAliancas
);


/* =========================================================
   FOTOGRAFIA
========================================================= */

const grupoFoto =
    new THREE.Group();

cena.add(grupoFoto);


const carregadorTextura =
    new THREE.TextureLoader();

const texturaFoto =
    carregadorTextura.load(
        "Assets/foto13.jpg"
    );

texturaFoto.colorSpace =
    THREE.SRGBColorSpace;


const molduraFoto =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            1.15,
            1.25,
            0.08
        ),
        madeiraEscura
    );

molduraFoto.position.set(
    4.25,
    2.05,
    -3.87
);

molduraFoto.castShadow = true;

grupoFoto.add(
    molduraFoto
);


const fotoMaterial =
    new THREE.MeshStandardMaterial({
        map: texturaFoto,
        roughness: 0.8
    });


const fotoInterna =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.95,
            1.05,
            0.035
        ),
        fotoMaterial
    );

fotoInterna.position.set(
    4.25,
    2.05,
    -3.82
);

grupoFoto.add(
    fotoInterna
);


grupoFoto.userData.interativo =
    true;

grupoFoto.userData.nome =
    "Uma fotografia nossa";

grupoFoto.userData.descricao =
    "Essa é definitivamente uma das fotos mais bonitas que tirei ao seu lado. Você é deslumbrante, realmente.";

objetosInterativos.push(
    grupoFoto
);


/* =========================================================
   GUITARRA
========================================================= */

const grupoGuitarra =
    new THREE.Group();

cena.add(grupoGuitarra);


const guitarraPreta =
    material(
        0x111111,
        0.35
    );


const guitarraCorpo =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.38,
            20,
            20
        ),
        guitarraPreta
    );

guitarraCorpo.position.set(
    -2.25,
    0.65,
    -3.72
);

guitarraCorpo.scale.set(
    0.7,
    1,
    0.45
);

guitarraCorpo.castShadow = true;

grupoGuitarra.add(
    guitarraCorpo
);


const guitarraBraco =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.12,
            1.8,
            0.12
        ),
        guitarraPreta
    );

guitarraBraco.position.set(
    -2.25,
    1.55,
    -3.72
);

guitarraBraco.rotation.z =
    -0.08;

guitarraBraco.castShadow = true;

grupoGuitarra.add(
    guitarraBraco
);


const guitarraCabeca =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.18,
            0.35,
            0.12
        ),
        guitarraPreta
    );

guitarraCabeca.position.set(
    -2.25,
    2.45,
    -3.72
);

guitarraCabeca.castShadow = true;

grupoGuitarra.add(
    guitarraCabeca
);


grupoGuitarra.userData.interativo =
    true;

grupoGuitarra.userData.nome =
    "A Electra";

grupoGuitarra.userData.descricao =
    "Essa aqui é uma das minhas memórias favoritas. Eu amava tocar ela e aprender aos poucos. Sempre sonhei em te dedicar algo nela.";

objetosInterativos.push(
    grupoGuitarra
);


/* =========================================================
   PELÚCIA
========================================================= */

const grupoPelucia =
    new THREE.Group();

cena.add(grupoPelucia);


const corpoPelucia =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.38,
            20,
            20
        ),
        material(0x8a7061)
    );

corpoPelucia.position.set(
    -3.65,
    1.18,
    -1.45
);

corpoPelucia.castShadow = true;

grupoPelucia.add(
    corpoPelucia
);


const cabecaPelucia =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.32,
            20,
            20
        ),
        material(0x9a7c6a)
    );

cabecaPelucia.position.set(
    -3.65,
    1.52,
    -1.45
);

cabecaPelucia.castShadow = true;

grupoPelucia.add(
    cabecaPelucia
);


const orelhaEsquerda =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.12,
            12,
            12
        ),
        material(0x9a7c6a)
    );

orelhaEsquerda.position.set(
    -3.88,
    1.73,
    -1.45
);

grupoPelucia.add(
    orelhaEsquerda
);


const orelhaDireita =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.12,
            12,
            12
        ),
        material(0x9a7c6a)
    );

orelhaDireita.position.set(
    -3.42,
    1.73,
    -1.45
);

grupoPelucia.add(
    orelhaDireita
);


grupoPelucia.userData.interativo =
    true;

grupoPelucia.userData.nome =
    "Um de nossos filhos";

grupoPelucia.userData.descricao =
    "Acho que isso vai virar uma tradição: de tempos em tempos, comprar uma pelúcia pro outro. Sempre durmo com os meus para lembrar de ti: Amburana, Sol e Kuromi.";

objetosInterativos.push(
    grupoPelucia
);


/* =========================================================
   RAYCASTER
========================================================= */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

let objetoHover = null;
let objetoSelecionado = null;


/* =========================================================
   HIGHLIGHT
========================================================= */

const materiaisOriginais =
    new Map();


function prepararMateriais(grupo) {

    grupo.traverse(
        objeto => {

            if (!objeto.isMesh) {
                return;
            }

            materiaisOriginais.set(
                objeto,
                objeto.material
            );

        }
    );

}


objetosInterativos.forEach(
    prepararMateriais
);


function aplicarHighlight(grupo) {

    if (!grupo) {
        return;
    }

    grupo.traverse(
        objeto => {

            if (!objeto.isMesh) {
                return;
            }

            const original =
                materiaisOriginais.get(
                    objeto
                );

            if (!original) {
                return;
            }

            const destaque =
                original.clone();

            destaque.emissive =
                new THREE.Color(
                    0x555555
                );

            destaque.emissiveIntensity =
                0.55;

            objeto.material =
                destaque;

        }
    );

}


function removerHighlight(grupo) {

    if (!grupo) {
        return;
    }

    grupo.traverse(
        objeto => {

            if (!objeto.isMesh) {
                return;
            }

            const original =
                materiaisOriginais.get(
                    objeto
                );

            if (original) {

                objeto.material =
                    original;

            }

        }
    );

}


/* =========================================================
   ENCONTRAR INTERATIVO
========================================================= */

function encontrarInterativo(
    objeto
) {

    let atual = objeto;

    while (atual) {

        if (
            atual.userData &&
            atual.userData.interativo
        ) {

            return atual;

        }

        atual =
            atual.parent;

    }

    return null;

}


/* =========================================================
   MOUSE
========================================================= */

renderer.domElement.addEventListener(
    "mousemove",
    event => {

        if (objetoSelecionado) {
            return;
        }

        const rect =
            renderer.domElement
                .getBoundingClientRect();

        mouse.x =
            ((event.clientX -
                rect.left) /
                rect.width) * 2 - 1;

        mouse.y =
            -((event.clientY -
                rect.top) /
                rect.height) * 2 + 1;

        raycaster.setFromCamera(
            mouse,
            camera
        );

        const intersecoes =
            raycaster.intersectObjects(
                objetosInterativos,
                true
            );

        let novoHover = null;

        if (intersecoes.length) {

            novoHover =
                encontrarInterativo(
                    intersecoes[0].object
                );

        }

        if (
            novoHover !==
            objetoHover
        ) {

            if (objetoHover) {

                removerHighlight(
                    objetoHover
                );

            }

            objetoHover =
                novoHover;

            if (objetoHover) {

                aplicarHighlight(
                    objetoHover
                );

                renderer.domElement.style.cursor =
                    "pointer";

            } else {

                renderer.domElement.style.cursor =
                    "grab";

            }

        }

    }
);


/* =========================================================
   POSIÇÕES DE CÂMERA
========================================================= */

const posicoesCamera = {

    buque: {

        posicao:
            new THREE.Vector3(
                2.8,
                4.0,
                5.0
            ),

        alvo:
            new THREE.Vector3(
                0.65,
                1.25,
                0.8
            )

    },

    aliancas: {

        posicao:
            new THREE.Vector3(
                -2.8,
                3.0,
                4.5
            ),

        alvo:
            new THREE.Vector3(
                -3.95,
                1.55,
                1.85
            )

    },

    fotografia: {

        posicao:
            new THREE.Vector3(
                5.7,
                2.5,
                1.0
            ),

        alvo:
            new THREE.Vector3(
                4.25,
                2.05,
                -3.87
            )

    },

    guitarra: {

        posicao:
            new THREE.Vector3(
                -0.8,
                2.4,
                0.8
            ),

        alvo:
            new THREE.Vector3(
                -2.25,
                1.45,
                -3.72
            )

    },

    pelucia: {

        posicao:
            new THREE.Vector3(
                -0.8,
                3.0,
                2.5
            ),

        alvo:
            new THREE.Vector3(
                -3.65,
                1.4,
                -1.45
            )

    }

};


/* =========================================================
   IDENTIFICAR POSIÇÃO
========================================================= */

function obterCameraMemoria(
    objeto
) {

    if (objeto === grupoBuque) {
        return posicoesCamera.buque;
    }

    if (objeto === grupoAliancas) {
        return posicoesCamera.aliancas;
    }

    if (objeto === grupoFoto) {
        return posicoesCamera.fotografia;
    }

    if (objeto === grupoGuitarra) {
        return posicoesCamera.guitarra;
    }

    if (objeto === grupoPelucia) {
        return posicoesCamera.pelucia;
    }

    return null;

}


/* =========================================================
   ANIMAÇÃO DA CÂMERA
========================================================= */

let cameraAnimando = false;

let cameraInicioPosicao =
    new THREE.Vector3();

let cameraInicioAlvo =
    new THREE.Vector3();

let cameraDestinoPosicao =
    new THREE.Vector3();

let cameraDestinoAlvo =
    new THREE.Vector3();

let cameraAnimacaoInicio =
    0;

let cameraAnimacaoDuracao =
    1500;

let cameraAnimacaoRetorno =
    false;


function iniciarAnimacaoCamera(
    posicao,
    alvo,
    retorno = false
) {

    cameraInicioPosicao.copy(
        camera.position
    );

    cameraInicioAlvo.copy(
        controles.target
    );

    cameraDestinoPosicao.copy(
        posicao
    );

    cameraDestinoAlvo.copy(
        alvo
    );

    cameraAnimacaoInicio =
        performance.now();

    cameraAnimacaoDuracao =
        1500;

    cameraAnimando =
        true;

    cameraAnimacaoRetorno =
        retorno;

    controles.enabled =
        false;

}


/* =========================================================
   EASING
========================================================= */

function easeInOut(t) {

    return t < 0.5
        ? 2 * t * t
        : 1 -
          Math.pow(
              -2 * t + 2,
              2
          ) / 2;

}


/* =========================================================
   ATUALIZAR CÂMERA
========================================================= */

function atualizarCameraAnimacao() {

    if (!cameraAnimando) {
        return;
    }

    const agora =
        performance.now();

    let progresso =
        (agora -
            cameraAnimacaoInicio) /
        cameraAnimacaoDuracao;

    progresso =
        Math.min(
            1,
            progresso
        );

    const suavizado =
        easeInOut(progresso);

    camera.position.lerpVectors(
        cameraInicioPosicao,
        cameraDestinoPosicao,
        suavizado
    );

    controles.target.lerpVectors(
        cameraInicioAlvo,
        cameraDestinoAlvo,
        suavizado
    );

    camera.lookAt(
        controles.target
    );

    if (progresso >= 1) {

        cameraAnimando =
            false;

        if (
            cameraAnimacaoRetorno
        ) {

            controles.enabled =
                true;

        }

    }

}


/* =========================================================
   INTERFACE
========================================================= */

const memoria =
    document.getElementById(
        "memoria"
    );

const memoriaTitulo =
    document.getElementById(
        "memoria-titulo"
    );

const memoriaDescricao =
    document.getElementById(
        "memoria-descricao"
    );

const transicaoPagina =
    document.getElementById(
        "transicao-pagina"
    );

const instrucoes =
    document.getElementById(
        "instrucoes"
    );


/* =========================================================
   TRANSIÇÃO DE PÁGINA
========================================================= */

function executarTransicaoEntrada() {

    return new Promise(
        resolve => {

            transicaoPagina.classList.add(
                "entrando"
            );

            setTimeout(
                () => {

                    transicaoPagina.classList.remove(
                        "entrando"
                    );

                    transicaoPagina.classList.add(
                        "saindo"
                    );

                    setTimeout(
                        () => {

                            transicaoPagina.classList.remove(
                                "saindo"
                            );

                            resolve();

                        },
                        1100
                    );

                },
                250
            );

        }
    );

}


/* =========================================================
   REGISTRAR VISITA
========================================================= */

function registrarVisita(
    objeto
) {

    objetosVisitados.add(
        objeto
    );

    if (
        objetosVisitados.size >=
        objetosInterativos.length &&
        !casaConcluida
    ) {

        casaConcluida =
            true;

        setTimeout(
            concluirCasa,
            2500
        );

    }

}


/* =========================================================
   ABRIR MEMÓRIA
========================================================= */

async function abrirMemoria(
    objeto
) {

    objetoSelecionado =
        objeto;

    registrarVisita(
        objeto
    );

    if (objetoHover) {

        removerHighlight(
            objetoHover
        );

    }

    objetoHover = null;

    renderer.domElement.style.cursor =
        "default";

    const dados =
        objeto.userData;

    memoriaTitulo.textContent =
        dados.nome;

    memoriaDescricao.textContent =
        dados.descricao;

    await executarTransicaoEntrada();

    memoria.classList.add(
        "visivel"
    );

    memoria.setAttribute(
        "aria-hidden",
        "false"
    );

    instrucoes.style.opacity =
        "0";

    const cameraMemoria =
        obterCameraMemoria(
            objeto
        );

    if (cameraMemoria) {

        iniciarAnimacaoCamera(
            cameraMemoria.posicao,
            cameraMemoria.alvo
        );

    }

}


/* =========================================================
   CONCLUIR CASA
========================================================= */

async function concluirCasa() {

    if (transicaoParaLivro) {
        return;
    }

    transicaoParaLivro =
        true;

    instrucoes.style.opacity =
        "0";

    memoria.classList.remove(
        "visivel"
    );

    memoria.setAttribute(
        "aria-hidden",
        "true"
    );

    objetoSelecionado =
        null;

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                1200
            )
    );

    iniciarAnimacaoCamera(
        cameraInicial,
        alvoInicial,
        true
    );

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                1700
            )
    );

    transicaoPagina.classList.add(
        "entrando"
    );

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                1200
            )
    );

    window.location.href =
        "nosso-livro.html";

}


/* =========================================================
   FECHAR MEMÓRIA
========================================================= */

function fecharMemoria() {

    if (!objetoSelecionado) {
        return;
    }

    if (casaConcluida) {
        return;
    }

    memoria.classList.remove(
        "visivel"
    );

    memoria.setAttribute(
        "aria-hidden",
        "true"
    );

    instrucoes.style.opacity =
        "";

    iniciarAnimacaoCamera(
        cameraInicial,
        alvoInicial,
        true
    );

    objetoSelecionado =
        null;

}


/* =========================================================
   CLIQUE
========================================================= */

renderer.domElement.addEventListener(
    "click",
    event => {

        if (objetoSelecionado) {
            return;
        }

        if (transicaoParaLivro) {
            return;
        }

        const rect =
            renderer.domElement
                .getBoundingClientRect();

        mouse.x =
            ((event.clientX -
                rect.left) /
                rect.width) * 2 - 1;

        mouse.y =
            -((event.clientY -
                rect.top) /
                rect.height) * 2 + 1;

        raycaster.setFromCamera(
            mouse,
            camera
        );

        const intersecoes =
            raycaster.intersectObjects(
                objetosInterativos,
                true
            );

        if (!intersecoes.length) {
            return;
        }

        const objeto =
            encontrarInterativo(
                intersecoes[0].object
            );

        if (!objeto) {
            return;
        }

        abrirMemoria(
            objeto
        );

    }
);


/* =========================================================
   CLIQUE FORA
========================================================= */

memoria.addEventListener(
    "click",
    event => {

        if (
            event.target === memoria
        ) {

            fecharMemoria();

        }

    }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            objetoSelecionado
        ) {

            fecharMemoria();

        }

    }
);


/* =========================================================
   ANIMAÇÃO
========================================================= */

function animar() {

    requestAnimationFrame(
        animar
    );

    atualizarCameraAnimacao();

    if (!cameraAnimando) {
        controles.update();
    }

    renderer.render(
        cena,
        camera
    );

}

animar();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);
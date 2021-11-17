console.log('[Felipe] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// [Plano de Fundo]

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha () {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.width);


        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    }
}

// [Chão]
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
        desenha () {
            contexto.drawImage(
                sprites, 
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites, 
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        }
    }
    return chao;
}


//[FlappyBird]

function fazColisao(FlappyBird, chao) {
    const FlappyBirdY = FlappyBird.y + FlappyBird.altura;
    const chaoY = chao.y; 

    if(FlappyBirdY >= chaoY) {
        return true;
    }   

    return false;
}

function criaFlappyBird () {
    const FlappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log("Devo pular");
            FlappyBird.velocidade = - FlappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,  
        atualiza () {
            if (fazColisao(FlappyBird, globais.chao)) {
                console.log('Faz colisao');
                som_HIT.play();

                    mudaParaTela(telas.GAMER_OVER);       
                return;
            }
            FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0,}, // asa pra cima
            { spriteX: 0, spriteY: 26,}, // asa do meio
            { spriteX: 0, spriteY: 52,}, // asa pra baixo
            { spriteX: 0, spriteY: 26,}, // asa do meio
        ],
        frameAtual: 0,
        atualizarFrameAtual () {
            const intervaloDoFrames = 10;
            const passouOIntervalo = frames % intervaloDoFrames === 0;
            if(passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + FlappyBird.frameAtual;
                const baseRepeticao = FlappyBird.movimentos.length;
                FlappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha () {
            FlappyBird.atualizarFrameAtual();
            const { spriteX, spriteY } = FlappyBird.movimentos[FlappyBird.frameAtual];
            contexto.drawImage(
                sprites, 
                spriteX,spriteY, // SpriteX, SpriteY
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura,
            );
        }
    
    }
    return FlappyBird;
}



// [MensagemGetReady]

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha () {
        contexto.drawImage(
            sprites, 
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        );
    }
}

// [Mensagem Game Over]
const mensagemGamerOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha () {
        contexto.drawImage(
            sprites, 
            mensagemGamerOver.spriteX, mensagemGamerOver.spriteY,
            mensagemGamerOver.largura, mensagemGamerOver.altura,
            mensagemGamerOver.x, mensagemGamerOver.y,
            mensagemGamerOver.largura, mensagemGamerOver.altura,
        );
    }
}

//
// [Canos]
//

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha () {
            

            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                    // [Cano do Céu]
                contexto.drawImage (
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                // [Cano do Chão]
                contexto.drawImage (
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })  
        },
        temColisaoFlappyBird(par) {
            const cabecaDoFlappy = globais.FlappyBird.y;
            const peDoFlappy = globais.FlappyBird.y + globais.FlappyBird.altura;
            if ((globais.FlappyBird.x + globais.FlappyBird.largura) >= par.x) {
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }
                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
            
            return false;
        },
        pares: [],
        atualiza() {
            const passo100Frames = frames % 100 === 0;
            if(passo100Frames) {
                canos.pares.push({
                        x: canvas.width,
                        y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisaoFlappyBird(par)) {
                    som_HIT.play();
                    mudaParaTela(telas.GAMER_OVER);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });
        }
    }

    return canos;
}

function criaPlacar () {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
            
        },
        atualiza() {    
            const intervaloDoFrames = 25;
            const passouOIntervalo = frames % intervaloDoFrames === 0;
            
            if (passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }   
        }
    }
    return placar;
}

//
//  [Telas]
//

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
 
        telaAtiva.inicializa();
    }
}

const telas = {
    INICIO: {
        inicializa() {
            globais.FlappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.FlappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

telas.JOGO = {
    inicializa() {
      globais.placar = criaPlacar();  
    },
    desenha () {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.FlappyBird.desenha();
        globais.placar.desenha();
        globais.placar.atualiza();
    },
    click() {
        globais.FlappyBird.pula();
    },
    atualiza () {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.FlappyBird.atualiza();
        globais.placar.atualiza();
    }
};

telas.GAMER_OVER = {
    desenha() {
        mensagemGamerOver.desenha(); 
    },
    click() {
        mudaParaTela(telas.INICIO);
    },
    atualiza() {
        
    }
}

function loop () {

    telaAtiva.desenha();
    telaAtiva.atualiza();
    frames = frames + 1;
    requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(telas.INICIO);
loop ();
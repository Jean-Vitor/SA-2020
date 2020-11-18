import { CenaJogo } from "./cenaJogo.js";
import { TelaInicio } from "./telaInicio.js";
import { TelaCarregamento } from "./telaCarregamento.js";
import { gameOver } from "./gameOver.js";
import { CenaJogo2 } from "./cenaJogo2.js";
import { CenaJogo3 } from "./cenaJogo3.js";
import { Vitoria } from "./vitoria.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "jogo-numbers",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
    },
  },
  scene: [
    TelaCarregamento,
    TelaInicio,
    CenaJogo,
    gameOver,
    CenaJogo2,
    CenaJogo3,
    Vitoria,
  ],
};

var game = new Phaser.Game(config);

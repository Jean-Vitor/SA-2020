export class TelaCarregamento extends Phaser.Scene {
  constructor() {
    super({ key: "TelaCarregamento" });
  }

  preload() {
    const larguraJogo = this.sys.canvas.width;
    const barraDeProgresso = this.add.graphics();

    // registra evento de progresso para atualizar a barra de progresso
    const larguraBarra = 0.8 * larguraJogo;
    this.load.on("progress", (value) => {
      barraDeProgresso.clear();
      // barra branca preenchida
      barraDeProgresso.fillStyle(0xffffff, 1);
      barraDeProgresso.fillRect(
        (larguraJogo - larguraBarra) / 2,
        this.sys.game.config.height / 2,
        larguraBarra * value,
        20
      );
      // contorno amarelo
      barraDeProgresso.lineStyle(4, 0xffff00, 1);
      barraDeProgresso.strokeRect(
        (larguraJogo - larguraBarra) / 2,
        this.sys.game.config.height / 2,
        larguraBarra,
        20
      );
    });

    this.load.image("logo", "./images/Logomarca.png");

    this.load.image("tiles", "./assets/plataformas.png");
    this.load.image("coin", "./assets/moeda.png");
    this.load.image("bandeira", "./assets/BANDEIRAS.png");

    this.load.image("ex1", "./assets/Exercício1.png");
    this.load.image("ex2", "./assets/Exercício2.png");
    this.load.image("ex3", "./assets/Exercício3.png");

    this.load.audio("musica", "./assets/musica.mp3")
    
    this.load.tilemapTiledJSON("map", "./assets/mapa.json");
    this.load.tilemapTiledJSON("map2", "./assets/mapa2.json");
    this.load.tilemapTiledJSON("map3", "./assets/mapa3.json");
    this.load.image("fonte", "./assets/numbers.png");
    this.load.image("background", "./images/background.png");
    this.load.image("porta", "./assets/porta.png");

    this.load.spritesheet("player0", "./assets/personagens/person0.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player1", "./assets/personagens/person1.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player2", "./assets/personagens/person2.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player3", "./assets/personagens/person3.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player4", "./assets/personagens/person4.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player5", "./assets/personagens/person5.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player6", "./assets/personagens/person6.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player7", "./assets/personagens/person7.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player8", "./assets/personagens/person8.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.spritesheet("player9", "./assets/personagens/person9.png", {
      frameWidth: 32,
      frameWidth: 32,
    });

    this.load.spritesheet("enemy", "./assets/enemy.png", {
      frameWidth: 32,
      frameWidth: 32,
    });
    this.load.audio("coin-collect", "./assets/collect-coin.ogg");

    this.load.on("complete", () => {
      this.scene.start("TelaInicio");
    });
  }

  create() {}

  update() {}
}

export class CenaJogo2 extends Phaser.Scene {
  constructor() {
    super({ key: "CenaJogo2" });
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "map2" });
    const tilesetMap = map.addTilesetImage("plataformas", "tiles");
    const coinLayer = map.getObjectLayer("Moeda")["objects"];
    const doorLayer = map.getObjectLayer("Porta")["objects"];
    this.enemyLayer = map.getObjectLayer("Enemy")["objects"];
    const enemyLayer = this.enemyLayer;

    const musicaMoeda = this.sound.add("coin-collect");

    this.background = this.add.image(400, 300, "background");

    this.coinScoreAtual = parseFloat(sessionStorage.getItem("coinScore"))

    //vai indicar qual estado o player está. Ou seja, qual número ele é.
    this.estadoPlayer = 0;

    //definindo o tamanho do mapa
    this.physics.world.setBounds(0, 0, 3200, 640);

    //adquiro o spawnPoint do personagem.
    const spawnPoint = map.findObject(
      "Player",
      (objects) => objects.name === "spawnPoint"
    );

    const jogadorMorreu = () => {
      console.log("player morreu");
      this.registry.destroy(); // destrói os registros
      this.events.off(); // desabilita os eventos
      this.scene.start("gameOver");
    };

    this.player = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "player0"
    );
    //gravidade no player
    this.player.body.setGravityY(350);
    //o personagem colide aos limites do mapa.
    this.player.body.setCollideWorldBounds(true);
    this.player.setScale(1.5);
    //animações
    this.anims.create({
      key: "player0",
      frames: this.anims.generateFrameNumbers("player0"),
    });
    this.anims.create({
      key: "player1",
      frames: this.anims.generateFrameNumbers("player1"),
    });
    this.anims.create({
      key: "player2",
      frames: this.anims.generateFrameNumbers("player2"),
    });
    this.anims.create({
      key: "player3",
      frames: this.anims.generateFrameNumbers("player3"),
    });
    this.anims.create({
      key: "player4",
      frames: this.anims.generateFrameNumbers("player4"),
    });
    this.anims.create({
      key: "player5",
      frames: this.anims.generateFrameNumbers("player5"),
    });
    this.anims.create({
      key: "player6",
      frames: this.anims.generateFrameNumbers("player6"),
    });
    this.anims.create({
      key: "player7",
      frames: this.anims.generateFrameNumbers("player7"),
    });
    this.anims.create({
      key: "player8",
      frames: this.anims.generateFrameNumbers("player8"),
    });
    this.anims.create({
      key: "player9",
      frames: this.anims.generateFrameNumbers("player9"),
    });

    //moedas
    this.coin = this.physics.add.staticGroup();

    //é aqui que realmente renderizamos nosso objeto moeda com ativos de moeda que carregamos em nosso jogo na função de pré-carregamento
    coinLayer.forEach((object) => {
      let obj = this.coin.create(object.x, object.y - 60, "coin");
      obj.body.width = object.width;
      obj.body.height = object.height;
      obj.setScale(0.6);
      console.log("coin Iteration");
    });

    //SCORE
    //configuração do texto pixelado

    this.coinIcon = this.add.image(40, 30, "coin");
    this.coinIcon.setScale(0.7);
    this.coinIcon.setScrollFactor(0);
    const NUMBERS_STR = "0123456789X ";
    var configText = {
      image: "fonte",
      width: 20,
      height: 26,
      chars: NUMBERS_STR,
      charsPerRow: 6,
    };
    this.cache.bitmapFont.add(
      "fonte",
      Phaser.GameObjects.RetroFont.Parse(this, configText)
    );
    const coinFont = this.add.bitmapText(65, 15, "fonte", "PHASER 3");
    coinFont.text = `X${this.coinScoreAtual}`;
    coinFont.setScrollFactor(0);

    //colisão moeda
    this.physics.add.overlap(
      this.player,
      this.coin,
      (player, coin) => {
        console.log("pegou uma moeda");
        coin.destroy(coin.x, coin.y); // removendo a moeda
        this.coinScoreAtual++;
        musicaMoeda.play("", 0, 1, false);
        coinFont.text = `X${this.coinScoreAtual}`; // muda o texto para adicionar o mudança de score
        return false;
      },
      null,
      this
    );

    //camera
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //plataforma móvel
    this.movelPlataforma = map.createStaticLayer(
      "movelplataformas",
      tilesetMap,
      0,
      0
    );
    const movelPlataforma = this.movelPlataforma;
    this.tweens.add({
      targets: movelPlataforma,
      y: "-=190",
      delay: 20,
      duration: 5000,
      yoyo: true,
      repeat: -1,
    });

    const blockEnemy = map.createStaticLayer("blockEnemy", tilesetMap, 0, 0);
    this.plataforma = map.createStaticLayer("plataformas", tilesetMap, 0, 0);
    const plataforma = this.plataforma;

    plataforma.setCollisionByProperty({ collider: true });
    blockEnemy.setCollisionByProperty({ collider: true });
    movelPlataforma.setCollisionByProperty({ collider: true });

    this.physics.add.collider(this.player, plataforma, () => {
      this.naPlataforma = true;
    });
    this.physics.add.collider(this.player, movelPlataforma, () => {
      this.naPlataforma = true;
    });

    //deixo invisivel o bloco que não deixa o inimigo cair da plataforma
    blockEnemy.visible = false;
    //inimigos
    this.enemy = this.physics.add.group();
    //habilita o grupo de inimigos. Ou seja, podemos "bater" nele.
    this.physics.world.enable(this.enemy);

    enemyLayer.forEach((object) => {
      let obj = this.enemy.create(object.x, object.y, "enemy");
      obj.body.width = 32;
      obj.body.height = 32;
      obj.body.setGravityY(100);
      obj.setScale(1.5);
      //inimigo começa se movendo pra direita
      obj.setVelocityX(-100);
      //inicio a gravidade no eixo y dos inimigos
      console.log("enemy Iteration");
    });

    this.physics.add.collider(this.enemy, plataforma);

    //se o inimigo colidir com a plataforma que bloqueia sua queda ele vai virar pro lado contrário que estava andando
    this.physics.add.collider(this.enemy, blockEnemy, (inimigo) => {
      //MOVIMENTAÇÃO DO INIMIGO
      if (inimigo.body.blocked.right) {
        inimigo.setVelocityX(-140).setFlipX(true);
      } else if (inimigo.body.blocked.left) {
        inimigo.setVelocityX(140).setFlipX(false);
      }
    });

    this.physics.add.overlap(this.player, this.enemy, (jogador, inimigo) => {
      if (
        jogador.body.velocity.y > 0 &&
        inimigo.body.touching.up &&
        jogador.body.touching.down
      ) {
        // mata o inimigo quando o jogador está caindo
        // Mata inimigo
        console.log("matou inimigo");
        inimigo.destroy();
        //faz o player pular ao matar o inimigo
        jogador.body.velocity.y = -150;

        //você ganha 5 moedas ao matar o inimigo.
        this.coinScoreAtual += 5;
        coinFont.text = `X${this.coinScoreAtual}`;
      } else {
        jogadorMorreu();
      }
    });

    //paralax do background

    this.background.setScrollFactor(0);
    this.background.tilePositionX = camera.scrollX * 0.3;

    //player morrer ao cair das plataformas
    const worldLimits = map.createStaticLayer("worldLimits", tilesetMap, 0, 0);
    worldLimits.setCollisionByProperty({ collider: true });
    // worldLimits.visible = false;
    this.physics.add.collider(this.player, worldLimits, jogadorMorreu);

    this.porta = this.physics.add.staticGroup();
    doorLayer.forEach((object) => {
      let obj = this.porta.create(object.x, object.y - 65, "porta");
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    const cordPergunta = map.findObject(
      "Pergunta",
      (objects) => objects.name === "cordPergunta"
    );

    this.add.sprite(cordPergunta.x, cordPergunta.y, "ex2");

    this.physics.add.overlap(this.player, this.porta, () => {
      if (this.estadoPlayer == 9) {
        sessionStorage.setItem("coinScore", this.coinScoreAtual);
        sessionStorage.setItem("faseAtual", "fase3");
        this.scene.start("CenaJogo3");
      } else {
        jogadorMorreu();
      }
    });
  }

  update() {
    const jogador = this.player;
    // const inimigo = this.enemy
    const cursors = this.input.keyboard.createCursorKeys();
    //teclas para trocar o personagem
    const keys = this.input.keyboard.addKeys({
      zero: "zero",
      one: "one",
      two: "two",
      three: "three",
      four: "four",
      five: "five",
      six: "six",
      seven: "seven",
      eight: "eight",
      nine: "nine",
      w: "w",
      a: "a",
      d: "d",
    });
    console.log(keys.w.isDown);

    if (cursors.left.isDown || keys.a.isDown) {
      jogador.setVelocityX(-160, true).setFlipX(true);
    } else if (cursors.right.isDown || keys.d.isDown) {
      jogador.setVelocityX(160, true).setFlipX(false);
    } else {
      jogador.setVelocityX(0);
    }

    console.log();
    //se a tecla pra subir for pressionada o jogador estiver na plataforma e estiver tocando na parte inferior ele vai pular.
    //Se o personagem for diferente de zero ele pode pular, se ele for zero não conseguirá pular
    if (
      (cursors.up.isDown &&
        this.naPlataforma &&
        this.estadoPlayer != 0 &&
        jogador.body.onFloor()) ||
      (keys.w.isDown &&
        this.naPlataforma &&
        this.estadoPlayer != 0 &&
        jogador.body.onFloor())
    ) {
      jogador.setVelocityY(-360);
    }

    this.naPlataforma = false;
    //metamorfose do personagem
    if (keys.zero.isDown) {
      jogador.anims.play("player0");
      this.estadoPlayer = 0;
    }
    if (keys.one.isDown) {
      jogador.anims.play("player1");
      this.estadoPlayer = 1;
    }
    if (keys.two.isDown) {
      jogador.anims.play("player2");
      this.estadoPlayer = 2;
    }
    if (keys.three.isDown) {
      jogador.anims.play("player3");
      this.estadoPlayer = 3;
    }
    if (keys.four.isDown) {
      jogador.anims.play("player4");
      this.estadoPlayer = 4;
    }
    if (keys.five.isDown) {
      jogador.anims.play("player5");
      this.estadoPlayer = 5;
    }
    if (keys.six.isDown) {
      jogador.anims.play("player6");
      this.estadoPlayer = 6;
    }
    if (keys.seven.isDown) {
      jogador.anims.play("player7");
      this.estadoPlayer = 7;
    }
    if (keys.eight.isDown) {
      jogador.anims.play("player8");
      this.estadoPlayer = 8;
    }
    if (keys.nine.isDown) {
      jogador.anims.play("player9");
      this.estadoPlayer = 9;
    }
  }
}

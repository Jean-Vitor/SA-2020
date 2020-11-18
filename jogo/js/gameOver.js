export class gameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" });
  }

  preload() {}

  create() {
    console.log("tela de game over");
    this.textoMorreu = this.add
      .text(400, 250, "Você morreu :(", {
        fontFamily: "PIXELFONT",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonRecomecar = this.add
      .text(400, 300, "Voltar ao último checkpoint", {
        fontFamily: "PIXELFONT",
        fontSize: "25px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonVoltar = this.add
      .text(400, 350, "Reiniciar o Jogo", {
        fontFamily: "PIXELFONT",
        fontSize: "25px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonRecomecar.setInteractive();
    this.buttonVoltar.setInteractive();

    this.buttonRecomecar.setStyle({ fontFamily: "PIXELFONT" });
    this.buttonVoltar.setStyle({ fontFamily: "PIXELFONT" });
    this.textoMorreu.setStyle({ fontFamily: "PIXELFONT" });

    //listener que fica escutando o click do mouse no botão recomeçar
    this.buttonRecomecar.on("pointerdown", () => {
      if (sessionStorage.getItem("faseAtual") == "fase1") {
        this.scene.start("CenaJogo");
      } else if (sessionStorage.getItem("faseAtual") == "fase2") {
        this.scene.start("CenaJogo2");
      } else {
        this.scene.start("CenaJogo3");
      }
    });

    this.buttonVoltar.on("pointerdown", () => {
      this.scene.start("TelaInicio");
    });

    this.buttonVoltar
      .on("pointerover", () => this.buttonVoltar.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.buttonVoltar.setStyle({ fill: "#fff" }));

    this.buttonRecomecar
      .on("pointerover", () => this.buttonRecomecar.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.buttonRecomecar.setStyle({ fill: "#fff" }));
  }

  update() {}
}

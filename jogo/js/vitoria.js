export class Vitoria extends Phaser.Scene {
  constructor() {
    super({ key: "Vitoria" });
  }

  preload() {}

  create() {
    let nomeJogador = sessionStorage.getItem("Username");
    console.log(sessionStorage.getItem("coinScore"))
    let pontos = sessionStorage.getItem("coinScore");

    this.textoVenceu = this.add
      .text(400, 200, `Parabéns, ${nomeJogador}.`, {
        fontFamily: "PIXELFONT",
        fontSize: "50px",
        color: "#fff",
        align: "center",
        wordWrap: { width: 750 },
      })
      .setOrigin(0.5);

    this.textoVenceu = this.add
      .text(400, 300, `Você conquistou o total de ${pontos} pontos.`, {
        fontFamily: "PIXELFONT",
        fontSize: "50px",
        color: "#fff",
        align: "center",
        wordWrap: { width: 500 },
      })
      .setOrigin(0.5);

    this.buttonVoltar = this.add
      .text(400, 400, "Reiniciar o Jogo", {
        fontFamily: "PIXELFONT",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonRanking = this.add
      .text(400, 450, "Acessar o ranking!", {
        fontFamily: "PIXELFONT",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonPagina = this.add
      .text(400, 500, "Voltar para página inicial", {
        fontFamily: "PIXELFONT",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    this.buttonRanking.setInteractive();
    this.buttonVoltar.setInteractive();
    this.buttonPagina.setInteractive();

    this.buttonVoltar.on("pointerdown", () => {
      this.scene.start("TelaInicio");
    }); 
    this.buttonRanking.on("pointerdown", () => {
      window.open('./../site/ranking.html')
    });
    this.buttonPagina.on("pointerdown", () => {
      window.open('./../site/inicio.html')
    });

    this.buttonVoltar
      .on("pointerover", () => this.buttonVoltar.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.buttonVoltar.setStyle({ fill: "#fff" }));
    this.buttonRanking
      .on("pointerover", () => this.buttonRanking.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.buttonRanking.setStyle({ fill: "#fff" }));
    this.buttonPagina
      .on("pointerover", () => this.buttonPagina.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.buttonPagina.setStyle({ fill: "#fff" }));
  }

  update() {}
}

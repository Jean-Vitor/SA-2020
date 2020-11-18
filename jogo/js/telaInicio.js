export class TelaInicio extends Phaser.Scene {
  constructor() {
    super({ key: "TelaInicio" });
  }

  preload() {}

  create() {
    //adiciona a logo a tela
    const logo = this.add.image(400, 150, "logo");
    //configura o tamanho da logo
    logo.setDisplaySize(600, 600);

    //animação yoyo da logo
    this.tweens.add({
      //o alvo é a constante logo
      targets: logo,
      y: 450,
      duration: 2000,
      yoyo: true,
      loop: -1,
    });

    //se o usuario clicar na tela, vai passar para a próxima cena
    this.input.on("pointerdown", () => {
      this.scene.start("CenaJogo");
    });
  }

  update() {}
}

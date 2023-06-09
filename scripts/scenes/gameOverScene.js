class gameOverScene extends Phaser.Scene{
    constructor(){
        super("endScene");

    }
    preload(){
     
        this.load.image('reset','assets/misc/playAgain.png');
        this.load.image('return','assets/misc/exit.png');
        this.load.image('gameOverBg', 'assets/background/bg.png');
        
    }
    create() {
        const playerScore = score;
        const playerBoxCollected = boxCollected;

        this.add.image(400, 300, 'gameOverBg');
        const gameOverText = this.add.text(400, 200, 'Game Over!\nScore:'+ playerScore + '\nBox Collected:' + playerBoxCollected, {
            fontFamily: 'Arial',
            fontSize: '32px',
            fill: '#fff'
        });
        gameOverText.setOrigin(0.5);

        const resetButton = this.add.image(300,400,'reset').setScale(.4);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {this.scene.start('level1');
        score = 0;
        boxCollected = 0;});
        const returnMainMenu = this.add.image(500,400,'return').setScale(.4);
        returnMainMenu.setInteractive();
        returnMainMenu.on('pointerdown', () => {this.scene.start('menuScene')});
    }
    update(){
        
    }
}

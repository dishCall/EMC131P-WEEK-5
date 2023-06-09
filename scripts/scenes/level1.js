var player;
var box;
var bombs;
var platforms;
var cursors;
var score = 0;
var scoreText;
var boxCollected = 0;
var boxScoreText;
var colors = [0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x4b0082, 0xee82ee];
var currentColorIndex = 0;

class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }


preload ()
{
    this.load.image('bg', 'assets/background/bg.png');
    this.load.image('ground', 'assets/misc/platform.png');
    this.load.image('box', 'assets/misc/boxDrop.png');
    this.load.image('bomb', 'assets/misc/boxBomb.png');
    this.load.spritesheet('dude', 'assets/spritesheet/dude.png', { frameWidth: 32, frameHeight: 48 });
}

create ()
{
    this.add.image(400, 300, 'bg');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.setTint(0xff4500);
    
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    box = this.physics.add.group({
        key: 'box',
        repeat: 0,
        setXY: { x: game.config.width * Math.random() - Math.random(80), y: Math.random() * game.config.height - 70, stepX: 40 }
    });
    box.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    boxScoreText = this.add.text(420, 16, 'Box Collected: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(box, platforms);
    this.physics.add.collider(bombs, platforms);
 
    this.physics.add.overlap(player, box, collectStar, playerColors, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}


}

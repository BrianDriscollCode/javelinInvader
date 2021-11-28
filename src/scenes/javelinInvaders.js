import Phaser from "phaser";
import WebFontFile from '../WebFontFile';



class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    
        this.background = null;
        this.backgroundBuildings = null;
        this.foreground = null;
        this.sun = null;
        this.clouds = null;
        this.brightness = null;
        this.player = null;
        this.ground = null;

        this.playerAnimation = null;
        this.playerVersion2 = null;
        
        //controls
        this.cursors = null;

        //playerDamage Group
        this.playerDamageGroup = null;
        this.javelin = null;
    
        

        //score
        this.score = null;
        this.scoreText = null;

        //font
        this.fonts = null;

        //UI
        this.topUI = null;

        //camera position
        this.screenCenterX = null;
        this.screenCenterY = null;
    }

    

    //Phaser Functions
    preload() {
        
    }

    create() {
        this.music = this.sound.add('theme', {volume: 0.2});
        //this.music.play();
        this.createBackground();
        this.createPlayer();
        this.createJavelin();
        this.createCursorAndKeyUpKeyDown();

        //UI
        //this.topUI = this.add.image(0, 360, 'topUI').setOrigin(0, 0.5);

        //create screen positions
        this.screenCenterX = (this.cameras.main.worldView.x + this.cameras.main.width / 2) - 13;
        this.screenCenterY = this.cameras.main.worldView.y + 20;
        this.scoreText = this.add.text(this.screenCenterX, this.screenCenterY, '0', { fontSize: '40px', fill: 'white' }); 
    }

    update() {
        this.background.y -= 0;
        this.setControls();
        
        if (this.javelin) {
            this.javelin.x = this.player.x + 30;
            this.javelin.y = this.player.y;
        }
        
    }
 

    //Game Functions for Phaser function "create"
    createPlayer() {

        const {width, height} = this.sys.game.canvas;

        this.playerDamageGroup = this.physics.add.group();

        this.playerAnimation = {
            key: 'playerStandAnimation',
            frames: this.anims.generateFrameNumbers('playerVersion2', {start: 0, end: 6, first: 0}),
            frameRate: 2,
            repeat: -1
        }

        this.anims.create(this.playerAnimation);

        this.player = this.playerDamageGroup.create(width/2, height/1.2, 'playerAnimation').play('playerStandAnimation');
        this.player.setFrame(1);
        this.player.setScale(1.1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(120,45);
        this.player.body.x += 20;

    }

    createJavelin() {
        this.javelin = this.playerDamageGroup.create(this.player.x + 30, this.player.y, 'javelin');
        this.javelin.setScale(1);
    }

    createBackground() {
    

        // this.sun = this.add.tileSprite(422, 238, 1200, 600, 'sun');
        // this.sun.setScale(4);

        this.background = this.add.tileSprite(0,-1440, 550, 2160, 'backgroundBuildings').setOrigin(0,0);
        this.background.setScale(1);
        this.background.setAlpha(0.95);
        // this.dunes = this.add.tileSprite(1050, 220, 2540, 720, 'dunes');
        // this.dunes.setScale(1.4);
        
        // this.brightness = this.add.tileSprite(1250, 360, 2540, 720, 'brightness');
        // this.brightness.setAlpha(0.6);
        // this.clouds = this.add.tileSprite(1250, 360, 2540, 720, 'clouds');
        // this.ground = this.add.tileSprite(1500, 720, -1780,-500, 'ground').setOrigin(0,0);    
    }
    
    //Cursors
    createCursorAndKeyUpKeyDown() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    } 


    //---------------------------create only 1 horeth ball---------------------------//
    
    

    //Game Function for Phaser function "update"
    setControls() {
        const {left, right} = this.cursors;

        let velocityStopper = false;

        if (left.isDown) {
            this.player.x -= 6.5;
        
            velocityStopper = true;

            
        }
        else if (right.isDown) {
            this.player.x += 6.5;
                     
        } 
    }

    resetVariables() {
      console.log('reset variables');
    }

    endScreen() {

        this.resetVariables();
        
        const { width, height } = this.sys.game.canvas;

        this.add.text(width / 2, height / 2 - 150, 'Your Score: ' + this.score, 
        { fill: '#000000', fontSize: '60px'})
            .setInteractive()
            .setOrigin(.5, 0);

        this.add.text(width / 2, height / 2, 'PLAY AGAIN BUTTON IMAGE', 
        { fill: '#000000', fontSize: '30px'})
            .setInteractive()
            .setOrigin(.5, 0)
            .on('pointerdown', () => this.restart(), this);
    }

    restart(event) {
        this.score = 0;
        this.scene.restart();
    }

}

export default PlayScene;
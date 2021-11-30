import Phaser, { Game } from "phaser";
import TitleScene from "./scenes/titleScene";
import javelinInvaders from './scenes/javelinInvaders';
import PreloadScene from "./scenes/preloader";

const titleScene = new TitleScene();
const playScene = new javelinInvaders();
const preloadScene = new PreloadScene();

const config = {
    type: Phaser.AUTO,
    width: 550,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
            // gravity: { y: 200 }
        }
    },
};

const game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('PlayScene', playScene);
game.scene.add('PreloadScene', preloadScene);

game.scene.start('preloadScene');

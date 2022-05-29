import * as PIXI from 'pixi.js'


export class Burger1 extends PIXI.Sprite {

interact = false

    constructor(texture:PIXI.Texture) {
        super(texture);

        this.x = 200
        this.y = 100
    }

    heroNear() {
        if (this.interact == false) {
        console.log("help!")
        }
        else {
        console.log("thanks!")
        }
    }

    interacted() {
    this.interact = true
    }
}
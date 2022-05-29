import * as PIXI from 'pixi.js'
import burgerTexture1 from './img/burger1.png'
import burgerTexture2 from './img/burger2.png'
import backgroundTexture from './img/background.png'
import heroTexture from './img/hero.png'
import { Burger1 } from "./classes/burger1"
import { Background } from "./classes/background"
import { Hero } from "./classes/hero"

class Game {
//    array cluster
    burger1 : PIXI.Sprite
    burgers1 : Burger1[] = []
    burger2 : Burger1
    hero : Hero
    pixi : PIXI.Application
    loader : PIXI.Loader
    background : Background

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450})
        document.body.appendChild(this.pixi.view)
        // textures
        this.loader = new PIXI.Loader()
        this.loader.add('burgerTexture1', burgerTexture1)
        this.loader.add('burgerTexture2', burgerTexture2)
        this.loader.add('backgroundTexture', backgroundTexture)
        this.loader.add('heroTexture', heroTexture)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        this.pixi.ticker.add((delta) => this.update(delta))
        //    background
        this.background = new Background(this.loader.resources['backgroundTexture'].texture!)
        this.pixi.stage.addChild(this.background)
    //    hero
        this.hero = new Hero(this.loader.resources['heroTexture'].texture!)
        this.pixi.stage.addChild(this.hero)
    //    burger1
        for (let i = 0; i < 1; i++) {
            this.burger1 = new Burger1(this.loader.resources["burgerTexture1"].texture!)
            this.pixi.stage.addChild(this.burger1)
        }
    //    burger 2
        this.burger2 = new Burger1(this.loader.resources["burgerTexure2"].texture!)
        this.pixi.stage.addChild(this.burger2)


    }

    update(delta: number) {
    this.hero.walk()
        for (let burger1 of this.burgers1) {
            if (this.collision(this.hero, burger1)) {
                burger1.interacted()
                this.burger1 = this.burger2

            }
        }
    }

    private collision(sprite1: PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y
    }

//    end
}

let g = new Game()
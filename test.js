const platform1 = document.getElementById('platform')
platform1.style.display ='none'
const hills = document.getElementById('hills')
hills.style.display ='none'
const background = document.getElementById('background')
background.style.display ='none'
const platformSmallTall = document.getElementById('platformsmall')
platformSmallTall.style.display ='none'

const spriteRunLeft = document.getElementById('runleft')
spriteRunLeft.style.display ='none'
const spriteRunRight = document.getElementById('runright')
spriteRunRight.style.display ='none'
const spriteStandLeft = document.getElementById('standleft')
spriteStandLeft.style.display ='none'
const spriteStandRight = document.getElementById('standright')
spriteStandRight.style.display ='none'
const backGround1 = document.getElementById('background1')
backGround1.style.display ='none'
const stage = document.getElementById('stage')
stage.style.display ='none'


const backgroundsong = document.getElementById('song')
backgroundsong.style.display ='none'
const mj = document.getElementById('mj')
mj.style.display ='none'
const jump = document.getElementById('jump')
jump.style.display ='none'



let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576


const gravity = 0.5;
class PLayer{
    constructor(){
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 66;
        this.height = 150;
        this.frame = 0
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 341,
                width: 127.875
            }
        }
        //Khai báo cho hình ảnh ban đầu cho player đứng yên phải
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw(){
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400,
            this.position.x, 
            this.position.y,
            this.width,
            this.height)
    }
    
    update(){   
        this.frame++
        if(this.frame > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)){
            this.frame = 0
        }else
        if(this.frame > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)){
            this.frame = 0
        }   
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
        this.velocity.y += gravity
        }
    }
}

class Platform{
    constructor({x,y, image}){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
        
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject{
    constructor({x,y, image}){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
        
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc){
let image = imageSrc;
return image;
}

let platformImage = createImage(platform1)
let platformSmallTallImage = createImage(platformSmallTall)

let player = new PLayer()
let platforms = []
let genericObjects = []
let lastKey

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    },
}

let scrollOffset = 0



function init(){
platformImage = createImage(platform1)

player = new PLayer()
platforms = [
    new Platform({
        x:-1, 
        y:470,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width - 3,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*2 + 100,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*3 + 300,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
        y:270,
        image: platformSmallTallImage
    }),
    new Platform({
        x:platformImage.width*4 + 300 - 2,
        y:470,
        image: platformImage
    }),
        new Platform({
        x:platformImage.width*6 + 600 - 8,
        y:0,
        image: createImage(stage)
    }),
    new Platform({
        x:platformImage.width*5 + 600 - 2,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*6 + 600 - 4,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*7 + 600 - 6,
        y:470,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width*8 + 600 - 8,
        y:470,
        image: platformImage
    })
    

]

genericObjects = [
    new GenericObject({
        x:-1,
        y:-1,
        image: createImage(background)
    }),
    new GenericObject({
        x:-1,
        y:-1,
        image: createImage(hills)
    })
]
scrollOffset = 0
}

function animate(){
    requestAnimationFrame(animate)
    
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    console.log(scrollOffset)
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x =  player.speed
    }else
    if((keys.left.pressed && player.position.x > 200)|| keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
        player.velocity.x = - player.speed
    }else{
        player.velocity.x = 0

        if(keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed;
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66
            })            
        }else 
        if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed;
        })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66
        })
        }
    }


    platforms.forEach((platform) => {
    if(player.position.y + player.height 
        <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x <= platform.position.x + platform.width
        && player.position.x + player.width >= platform.position.x
        ){
        player.velocity.y = 0
    }
    })

    if( keys.right.pressed
        && lastKey === 'right' 
        && player.currentSprite !== player.sprites.run.right){
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }else
    if( keys.left.pressed
        && lastKey === 'left' 
        && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }else
    if( !keys.left.pressed
        && lastKey === 'left' 
        && player.currentSprite !== player.sprites.stand.left){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else
    if( !keys.right.pressed
        && lastKey === 'right' 
        && player.currentSprite !== player.sprites.stand.right){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }

   

    if(scrollOffset > platformImage.width*5 + 100 - 2){
        console.log ('You Win')
    }
    
    if(player.position.y > canvas.height){
        console.log ('You Lose')
        init()
    }

}

c.drawImage(createImage(backGround1),0,0)

function startGame1(){
    c.clearRect(0,0,1100,1100)
    init()
    animate()
}

const keyupcontrol = {
    pressed : false
}

//Nhấn phím - keydown
addEventListener('keydown',({keyCode})=>{

    switch(keyCode){
        case 65:
            // console.log('left')
            keys.left.pressed = true
            lastKey = 'left'
            break;
        case 68:
            // console.log('right')
            keys.right.pressed = true
            lastKey = 'right'                       
            break;
        case 87:
            // console.log('up')
            if(!keyupcontrol.pressed){
                player.velocity.y -= 15;
                jump.play()
                keyupcontrol.pressed = true
            } 

            break;
        case 83:
            // console.log('down')
            break;
        case 77:
            backgroundsong.play()
            break;
        case 78:
            backgroundsong.pause()
            mj.play()
            break;
        case 66:
            backgroundsong.currentTime = 0;
            backgroundsong.pause()
            mj.currentTime = 0;
            mj.pause()
            break;
        case 80:
            startGame1()
    }
})

//Nhả phím - keyup
addEventListener('keyup',({keyCode})=>{

        switch(keyCode){
            case 65:
                // console.log('left')
                keys.left.pressed = false
                break;
            case 68:
                // console.log('right')
                keys.right.pressed = false
                break;
            case 87:
                keyupcontrol.pressed = false
                // console.log('up')
                break;
            case 83:
                // console.log('down')
        }
    })
// a:65, s:83, d:68, w:87


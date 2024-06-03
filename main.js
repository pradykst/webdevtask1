const table_size = 8
var gameState = []
for (var i = 0; i < table_size; i++) {
    gameState[i] = []
    for (var j = 0; j < table_size; j++) {
        gameState[i][j] = ''
    }
}



let currentPlayer = 1
let currentPawn = null
let movePos = null
let canon_1=null
let canon_2=null
let bullet_hit=false
let rotate=false //false is right and true is left absoulte from the board
let ricochet=false


const startingTime=2
let time = startingTime*60




function countfxn(){
    console.log('time')
    const min=Math.floor(time/60)
    let sec=time%60
    sec=sec<10?'0'+sec:sec

    const countdownEl=document.getElementById('countdown')

    countdownEl.innerText=`${min}:${sec}`
    time--

}


function rotateLeft(){
    rotate=true
    clearMovesColor()


}

function rotateRight(){
    rotate=false
    clearMovesColor()
    
}

document.getElementById('b')



function startgame() {
    //alert("game is starting")

    document.getElementById('startgameButton').setAttribute('hidden', 'hidden')



    //grid of 8*8
    document.getElementById('currentPlayer').innerText=`next turn is player ${((currentPlayer)%2)+1}'s `

    createboard(table_size)
    setInterval(countfxn,1000)


    


    //5 pawns with different properties
    const tank1 = new Tank(1, [1, 6])
    const canon1 = new Canon(1, [0, 2])
    const titan1 = new Titan(1, [1, 3])
    const ricochets1 = new Ricochets(1, [1, 5])
    const semiricochets1 = new Semiricochets(1, [1, 4])


    const tank2 = new Tank(2, [5, 1])
    const canon2 = new Canon(2, [7, 5])
    const titan2 = new Titan(2, [6, 4])
    const ricochets2 = new Ricochets(2, [7, 1])
    const semiricochets2 = new Semiricochets(2, [7, 0])

    canon_1=canon1
    canon_2=canon2



    //player 1 plays first










    //tank1.identify()
    // tank2.identify()
    //console.log("game state:", gameState)

    //spawn at different locations on both sides, except canon only on extreme rows
    //randomise player 1 and 2 to start playing



    //start timer for player
    //wait until clicked
    //show possible movements for the clicked pawn
    //wait for click , when clicked move pawn to that location
    //shoot a bullet from the canon, if hit , then react as the properties of each pawn
    //change turn to other player
    //repeat until bullet hits the titan
    //display player() wins,
    //reset game

    //extras
    //modes
    //settings page


}



function playGame() {
    //currentPlayer clicks on a pawn=currentPawn
    //currentPlayer clicks on a green cell=movePos 
    //currentPos=movePos
    //shoot bullet from canon
    //reflect and check if hit titan
    //hit=currentPlayer wins else
    //switch currentPlayer
    //repeat



}

function clearMovesColor() {
    for (var i = 0; i < table_size; i++) {
        for (var j = 0; j < table_size; j++) {
            if (document.getElementById(parseInt(i) + '_' + parseInt(j)).className == 'green') {
                document.getElementById(parseInt(i) + '_' + parseInt(j)).className = ''
                if(document.getElementById(parseInt(i) + '_' + parseInt(j)).innerText==''){
                    document.getElementById(parseInt(i) + '_' + parseInt(j)).onclick = null

                }
                


            }

        }
    }
}
function createboard(table_size) {
    var board = document.getElementById("gameboard");
    for (var i = 0; i < table_size; i++) {
        var row = document.createElement("tr")
        for (var j = 0; j < table_size; j++) {
            var cell = document.createElement("td")
            cell.id = i + '_' + j
            row.appendChild(cell)

        }
        board.appendChild(row)


    }
}

class Pawn {
    name
    pos
    constructor(name, pos) {
        this.name = name
        this.pos = pos
        
        if (name!= 'Bullet'){
            gameState[pos[0]][pos[1]] = this
            document.getElementById(pos[0] + '_' + pos[1]).innerText = name
        }
        
        document.getElementById(pos[0] + '_' + pos[1]).onclick = function () {
            //@todo: make only currentPlayers pawn clickable
            clearMovesColor()
            showMoves(this)
                  

        }




    }
    identify() {
        console.log(`My name is ${this.name} at position ${this.pos}`)
    }
    move() {


    }
    show() {

    }



}

//@todo: bullet to move up and down after hitting ricochets


class Canon extends Pawn {
    bullet

    constructor(i, pos) {
        super('Canon' + '_' + i, pos)
        let bul_pos=[null,pos[1]]
        if(pos[0]==0){
            bul_pos[0]=parseInt(pos[0])+1

        }
        else{
            bul_pos[0]=parseInt(pos[0])-1
        }

    
        this.bullet = new Bullet(bul_pos)

    }
    shoot() {
        console.log('shooting from pos ', this.pos)
        console.log('bullet pos is ', this.bullet.pos)

        if (!ricochet){
            if (this.pos[0] == table_size-1) {
                //showbullet
                this.bullet.show([this.bullet.pos[0],this.bullet.pos[1]])
                var counter=1
    
                while(this.bullet.pos[0]>0){
                    this.bullet.delayedHide([this.bullet.pos[0],this.bullet.pos[1]], counter * 500 )
                    this.bullet.pos[0] = parseInt(this.bullet.pos[0])-1
                    this.bullet.delayedShow([this.bullet.pos[0],this.bullet.pos[1]], counter * 500)
                    counter++
    
                }
                this.bullet.delayedHide([this.bullet.pos[0],this.bullet.pos[1]], counter * 500 )
    
                
            }
    
            else{
                console.log('show bullet 1',this.bullet.pos)
                this.bullet.show([this.bullet.pos[0],this.bullet.pos[1]])
                var counter = 1
                while(this.bullet.pos[0]<table_size-1){
                        this.bullet.delayedHide([this.bullet.pos[0],this.bullet.pos[1]], counter * 500)
                        this.bullet.pos[0] = parseInt(this.bullet.pos[0])+1
                        this.bullet.delayedShow([this.bullet.pos[0],this.bullet.pos[1]], counter * 500)
                        counter ++
                }
                this.bullet.delayedHide([this.bullet.pos[0],this.bullet.pos[1]], counter * 500 )
    
                
            }
    
            
        }



    }
    resetBulletPos(){
        bullet_hit=false
        let bul_pos=[null,this.pos[1]]
        if(this.pos[0]==0){
            bul_pos[0]=parseInt(this.pos[0])+1

        }
        else{
            bul_pos[0]=parseInt(this.pos[0])-1
        }

        this.bullet.pos = bul_pos

    }

}

class Titan extends Pawn {
    constructor(i, pos) {
        super('Titan' + '_' + i, pos)

    }
}

class Tank extends Pawn {
    constructor(i, pos) {
        super('Tank' + '_' + i, pos)

    }


}

class Ricochets extends Pawn {
    constructor(i, pos) {
        super('Ricochets' + '_' + i, pos)

    }
    rotate() {
        console.log('rotate')
        if (rotate){
            //j--
            console.log('bullet to move left')

        }
        else{
            console.log('bullet to move right')
            //j++
        }
        


    }
}

class Semiricochets extends Pawn {
    constructor(i, pos) {
        super('Semiricochets' + '_' + i, pos)

    }

    rotate() {
        console.log('ricochets from semi')
        if (rotate){
            console.log('bullet to move left')
            
            //j--
            
        }
        else{
            console.log('bullet to move right')
            //j++
        }
        
    }

}

class Bullet extends Pawn {
    constructor(pos) {
        super('Bullet', pos)
    }

    delayedHide(pos, timeout){
        setTimeout(this.hide,timeout,pos)
    }

    delayedShow(pos, timeout){
        setTimeout(this.show,timeout,pos)
    }

    show(pos) {

        if (!bullet_hit){
        //@TODO:  if bullet is in last box or has hit something
        //@todo:remove bullet
        //@todo:change player
        //@todo:reset timer
        //@todo:timer started

        if (document.getElementById(pos[0] + '_' + pos[1]).innerText == '') {
            document.getElementById(pos[0] + '_' + pos[1]).innerText = 'O'

        }
        else{
            let obj = gameState[pos[0]][pos[1]]
            console.log('bullet hit  ')
            obj.identify()
            bullet_hit=true
            

            if(obj  instanceof Titan ){
                console.log(obj)
                console.log(`player ${((currentPlayer-1)%2)+1} wins`)
            }
            //@todo:bullet physics

            if (obj instanceof Ricochets || obj instanceof Semiricochets){
                ricochet=true
                obj.rotate()

            }
            
        
        }

    }


    }


    hide(pos) {

        if (!bullet_hit){

        
        console.log("hiding at pos..",pos)
        document.getElementById(pos[0] + '_' + pos[1]).innerText = ''

        }
    }


}





class Player {
    name
    score
    color
    moves
    constructor(name, color) {
        this.name = name
        this.color = color
        this.score = 0
        this.moves = []


    }
}




function showMoves(element) {
    console.log(element.id + " clicked!!")
    var pos = element.id.split('_')
    var pawn = gameState[pos[0]][pos[1]]
    pawn.identify()

    if( pawn instanceof Ricochets){
        document.getElementById('rotate_left').style.display = 'block'
        document.getElementById('rotate_right').style.display = 'block'

    }
    if( pawn  instanceof Semiricochets){
        document.getElementById('rotate_left').style.display = 'block'
        document.getElementById('rotate_right').style.display = 'block'


    }

    let isCanon = false
    if (pawn instanceof Canon) {
        isCanon = true
    }

    let i = parseInt(pos[0])
    let j = parseInt(pos[1])

    if (!isCanon) {
        if (i + 1 < table_size) {
            if (gameState[i + 1][j] == '') {
                //css
                document.getElementById(parseInt(i + 1) + '_' + parseInt(j)).className = 'green'
                document.getElementById(parseInt(i + 1) + '_' + parseInt(j)).onclick = function () {
                    move(pawn, [i + 1, j])
                    clearMovesColor()
                }




            }

            if (j + 1 < table_size) {
                if (gameState[i + 1][j + 1] == '') {
                    //css
                    document.getElementById(parseInt(i + 1) + '_' + parseInt(j + 1)).className = 'green'
                    document.getElementById(parseInt(i + 1) + '_' + parseInt(j + 1)).onclick = function () {
                        move(pawn, [i + 1, j + 1])
                        clearMovesColor()
                    }




                }

            }

            if (j - 1 > -1) {
                if (gameState[i + 1][j - 1] == '') {
                    //css
                    document.getElementById(parseInt(i + 1) + '_' + parseInt(j - 1)).className = 'green'
                    document.getElementById(parseInt(i + 1) + '_' + parseInt(j - 1)).onclick = function () {
                        move(pawn, [i + 1, j - 1])
                        clearMovesColor()
                    }

                }

            }

        }

        if (i - 1 > -1) {
            if (gameState[i - 1][j] == '') {
                //css
                document.getElementById(parseInt(i - 1) + '_' + parseInt(j)).className = 'green'
                document.getElementById(parseInt(i - 1) + '_' + parseInt(j)).onclick = function () {
                    move(pawn, [i - 1, j])
                    clearMovesColor()
                }

            }

            if (j + 1 < table_size) {
                if (gameState[i - 1][j + 1] == '') {
                    //css
                    document.getElementById(parseInt(i - 1) + '_' + parseInt(j + 1)).className = 'green'
                    document.getElementById(parseInt(i - 1) + '_' + parseInt(j + 1)).onclick = function () {
                        move(pawn, [i - 1, j + 1])
                        clearMovesColor()
                    }

                }

            }

            if (j - 1 > -1) {
                if (gameState[i - 1][j - 1] == '') {
                    //css
                    document.getElementById(parseInt(i - 1) + '_' + parseInt(j - 1)).className = 'green'
                    document.getElementById(parseInt(i - 1) + '_' + parseInt(j - 1)).onclick = function () {
                        move(pawn, [i - 1, j - 1])
                        clearMovesColor()
                    }

                }


            }
        }


        if (j - 1 > -1) {
            if (gameState[i][j - 1] == '') {
                document.getElementById(parseInt(i) + '_' + parseInt(j - 1)).className = 'green'
                document.getElementById(parseInt(i) + '_' + parseInt(j - 1)).onclick = function () {
                    move(pawn, [i, j - 1])
                    clearMovesColor()
                }



            }
        }

        if (j + 1 < table_size) {
            if (gameState[i][j + 1] == '') {
                document.getElementById(parseInt(i) + '_' + parseInt(j + 1)).className = 'green'
                document.getElementById(parseInt(i) + '_' + parseInt(j + 1)).onclick = function () {
                    move(pawn, [i, j + 1])
                    clearMovesColor()
                }



            }
        }
    }
    else {
        if (j - 1 > -1) {
            if (gameState[i][j - 1] == '') {
                document.getElementById(parseInt(i) + '_' + parseInt(j - 1)).className = 'green'
                document.getElementById(parseInt(i) + '_' + parseInt(j - 1)).onclick = function () {
                    move(pawn, [i, j - 1])
                    clearMovesColor()
                }



            }
        }

        if (j + 1 < table_size) {
            if (gameState[i][j + 1] == '') {
                document.getElementById(parseInt(i) + '_' + parseInt(j + 1)).className = 'green'
                document.getElementById(parseInt(i) + '_' + parseInt(j + 1)).onclick = function () {
                    move(pawn, [i, j + 1])
                    clearMovesColor()
                }



            }
        }

    }


}


function move(pawn, des_pos) {
    clearMovesColor()
    canon_1.resetBulletPos()
    canon_2.resetBulletPos()


    let pos = pawn.pos
    document.getElementById(pos[0] + '_' + pos[1]).innerText = ''
    pawn.pos = des_pos
    if (pawn instanceof Canon){
        if(pawn.pos[0]==0){
            pawn.bullet.pos[0]=parseInt(pawn.pos[0])+1
            pawn.bullet.pos[1]=pawn.pos[1]

        }
        else{
            pawn.bullet.pos[0]=parseInt(pawn.pos[0])-1
            pawn.bullet.pos[1]=pawn.pos[1]
        }


    }
    document.getElementById(des_pos[0] + '_' + des_pos[1]).innerText = pawn.name
    document.getElementById(pos[0] + '_' + pos[1]).onclick = null
    gameState[pos[0]][pos[1]] = ''
    gameState[des_pos[0]][des_pos[1]] = pawn
    console.log(des_pos)
    document.getElementById(des_pos[0] + '_' + des_pos[1]).onclick = function () {
        clearMovesColor()
        showMoves(this)

        //@todo: single method for  onclick in this and pawn class

    }

    

    //shoot bullet

    if (currentPlayer%2!=0){
        canon_1.shoot()
    
    }
    else{
        canon_2.shoot()
        
    }
    currentPlayer++
    document.getElementById('currentPlayer').innerText=`next turn is player ${((currentPlayer)%2)+1}'s `

    


    
}


const table_size = 8
var gameState = []
for (var i = 0; i < table_size; i++) {
    gameState[i] = []
    for (var j = 0; j < table_size; j++) {
        gameState[i][j] = ''
    }
}



let currentPlayer = 0
let currentPawn = null
let movePos = null


function startgame() {
    //alert("game is starting")
    document.getElementById('startgameButton').setAttribute('hidden','hidden')

    
    
    //grid of 8*8

    createboard(table_size)
    

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



function playGame(){
    //currentPlayer clicks on a pawn=currentPawn
    //currentPlayer clicks on a green cell=movePos 
    //currentPos=movePos
    //shoot bullet from canon
    //reflect and check if hit titan
    //hit=currentPlayer wins else
    //switch currentPlayer
    //repeat
    


}

function clearMovesColor(){
    for(var i=0;i<table_size;i++){
        for(var j=0;j<table_size;j++){
            if (document.getElementById(parseInt(i)+'_'+parseInt(j)).className == 'green'){
                document.getElementById(parseInt(i)+'_'+parseInt(j)).className = ''

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
        gameState[pos[0]][pos[1]] = this
        document.getElementById(pos[0] + '_' + pos[1]).innerText = name
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

class Canon extends Pawn {

    constructor(i, pos) {
        super('Canon' + '_' + i, pos)

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

    }
}

class Semiricochets extends Pawn {
    constructor(i, pos) {
        super('Semiricochets' + '_' + i, pos)

    }

    rotate() {
        console.log('ricochets from semi')
    }

}

class Bullet extends Pawn {
    constructor(i, pos) {
        super('Bullet' + '_' + i, pos)
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
    let isCanon = false
    if (pawn instanceof Canon){
        isCanon = true
    }

    let i = parseInt(pos[0])
    let j = parseInt(pos[1])

    if (! isCanon){
        if (i+1<table_size){
            if (gameState[i+1][j] == ''){
                //css
                document.getElementById(parseInt(i+1)+'_'+parseInt(j)).className = 'green'
                document.getElementById(parseInt(i+1)+'_'+parseInt(j)).onclick=function(){
                    move(pawn,[i+1,j])
                    clearMovesColor()
                }

            
                

            }

            if (j+1<table_size){
                if (gameState[i+1][j+1] == ''){
                    //css
                    document.getElementById(parseInt(i+1)+'_'+parseInt(j+1)).className = 'green'
                    document.getElementById(parseInt(i+1)+'_'+parseInt(j+1)).onclick=function(){
                        move(pawn,[i+1,j+1])
                        clearMovesColor()
                    }
    
                    
                    

                }

            }

            if (j-1>-1){
                if (gameState[i+1][j-1] == ''){
                    //css
                    document.getElementById(parseInt(i+1)+'_'+parseInt(j-1)).className = 'green'
                    document.getElementById(parseInt(i+1)+'_'+parseInt(j-1)).onclick=function(){
                        move(pawn,[i+1,j-1])
                        clearMovesColor()
                    }
    
                }

            }

        }

        if (i-1>-1){
            if (gameState[i-1][j] == ''){
                //css
                document.getElementById(parseInt(i-1)+'_'+parseInt(j)).className = 'green'
                document.getElementById(parseInt(i-1)+'_'+parseInt(j)).onclick=function(){
                    move(pawn,[i-1,j])
                    clearMovesColor()
                }

            }

            if (j+1<table_size){
                if (gameState[i-1][j+1] == ''){
                    //css
                    document.getElementById(parseInt(i-1)+'_'+parseInt(j+1)).className = 'green'
                    document.getElementById(parseInt(i-1)+'_'+parseInt(j+1)).onclick=function(){
                        move(pawn,[i-1,j+1])
                        clearMovesColor()
                    }
    
                }

            }

            if(j-1>-1){
                if (gameState[i-1][j-1] == ''){
                    //css
                    document.getElementById(parseInt(i-1)+'_'+parseInt(j-1)).className = 'green'
                    document.getElementById(parseInt(i-1)+'_'+parseInt(j-1)).onclick=function(){
                        move(pawn,[i-1,j-1])
                        clearMovesColor()
                    }
    
                }
                

            }
        }


    if (j-1>-1){
        if(gameState[i][j-1]==''){
            document.getElementById(parseInt(i)+'_'+parseInt(j-1)).className = 'green'
            document.getElementById(parseInt(i)+'_'+parseInt(j-1)).onclick=function(){
                move(pawn,[i,j-1])
                clearMovesColor()
            }



        }
    }

    if (j+1<table_size){
        if(gameState[i][j+1]==''){
            document.getElementById(parseInt(i)+'_'+parseInt(j+1)).className = 'green'
            document.getElementById(parseInt(i)+'_'+parseInt(j+1)).onclick=function(){
                move(pawn,[i,j+1])
                clearMovesColor()
            }



        }
    }
}
    else{
        if (j-1>-1){
            if(gameState[i][j-1]==''){
                document.getElementById(parseInt(i)+'_'+parseInt(j-1)).className = 'green'
                document.getElementById(parseInt(i)+'_'+parseInt(j-1)).onclick=function(){
                    move(pawn,[i,j-1])
                    clearMovesColor()
                }

    
    
            }
        }
    
        if (j+1<table_size){
            if(gameState[i][j+1]==''){
                document.getElementById(parseInt(i)+'_'+parseInt(j+1)).className = 'green'
                document.getElementById(parseInt(i)+'_'+parseInt(j+1)).onclick=function(){
                    move(pawn,[i,j+1])
                    clearMovesColor()
                }

    
    
            }
        }

    }


}


function move(pawn,des_pos){
    let pos = pawn.pos
    document.getElementById(pos[0] + '_' + pos[1]).innerText =''
    pawn.pos = des_pos
    document.getElementById(des_pos[0] + '_' + des_pos[1]).innerText = pawn.name
    document.getElementById(pos[0] + '_' + pos[1]).onclick = null
    document.getElementById(des_pos[0] + '_' + des_pos[1]).onclick = function () {
        clearMovesColor()
        showMoves(this)
    }


    
    
}




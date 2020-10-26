$(function() {
    // Insérer le code jQuery ici
getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
    }
let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
let player1 = new Soldat('soldat1', 100, 10, 0, 100, {x:0, y:0});
let player2 = new Soldat('soldat2', 100, 10, 0, 100, {x:0, y:0});
let players = [player1, player2];
const map = new Map('#map', 10, 10, 10, weapons, players);

let currentPlayer;
let currentPlayerNb = getRandomInt(players.length);
    if (currentPlayerNb === 0) {
        alert('Le soldat 1 commence')
    currentPlayer = map.players[0]
    }else{
        alert('Le soldat 2 commence')
        currentPlayer = map.players[1]
    }
displayMoves(currentPlayer, map);
listenMoves(map, currentPlayer);
});
function displayMoves(currentPlayer, map) {
    map.setMooveValable('right', currentPlayer, 3);
    map.setMooveValable('left', currentPlayer, 3);
    map.setMooveValable('top', currentPlayer, 3);
    map.setMooveValable('bottom', currentPlayer, 3);
}
function listenMoves(map, currentPlayer){
    let player 
    //let moveAvailableCases = document.getElementsByClassName('yellow');
    let moveAvailableCases = $('.yellow');
    Array.from(moveAvailableCases).forEach(moveCase => {
       moveCase.addEventListener('click', (event)=> {
           //$(moveCase).click(()=> {
             caseInfo = event.target.id.split('_')
            
            //currentPlayer.animate({left:'100px'}, 1000);
            console.log('case info'+ caseInfo)
            //currentPlayer.position = {x: caseInfo[1], y:0}
           
            if(currentPlayer === map.players[0]){
                player = map.players[0]
               

                console.log(currentPlayer.position);
            //$(currentPlayer).animate({left:'100px'}, 1000);

            }else{
                player = map.players[1]
                

                console.log(currentPlayer.position);

                //$(currentPlayer).animate({left:'100px'}, 1000);
                }
        displayMoves(player, map);
        })
    })
}function bouge(){
    currentPlayer.style.top = 100;
    requestAnimationFrame(bouge);
}






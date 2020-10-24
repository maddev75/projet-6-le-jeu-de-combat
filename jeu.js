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
    let moveAvailableCases = document.getElementsByClassName('yellow');
    Array.from(moveAvailableCases).forEach(moveCase => {
        moveCase.addEventListener('click', (event)=> {
            caseInfo = event.target.id.split('_')
            console.log('case info'+caseInfo)
            currentPlayer.position = {x: caseInfo[1], y:0}
            console.log('curentplay'+currentPlayer);
        
        if(currentPlayer === map.players[0]){
            player = map.players[1]
        }else{
            player = map.players[0]
        }
    
        displayMoves(player, map);
        })
    })
}
    


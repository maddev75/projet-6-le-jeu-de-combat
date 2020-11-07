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
    
    moveAvailableCases.on('click', (event)=> {
           //$(moveCase).click(()=> {
            let caseInfo = event.target.id.split('_')
            console.log('case'+ caseInfo);
            let caseCliquee = $("#"+event.target.id);
            //console.log(caseCliquee);
            let currentPlayerCase = $('#col_'+currentPlayer.position.x+'_'+currentPlayer.position.y);
            let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
            let classesCliquee = caseCliquee.attr("class").split(/\s+/);
            

            console.log('joueur'+classesJoueur)
            console.log('cliquee'+classesCliquee)
            let changeJoueur = classesJoueur.join(' ');
            let changeCliquee = classesCliquee.join(' ');
            caseCliquee.removeClass(changeCliquee);
            caseCliquee.addClass(changeJoueur);
         
        currentPlayerCase.removeClass(changeJoueur);
            currentPlayerCase.addClass(changeCliquee);
            console.log(currentPlayerCase);
            //actualise joueur
            currentPlayer.position.x = caseInfo[1];


            currentPlayer.position.y = caseInfo[2];
            //enleve jaune
            moveAvailableCases = $('.yellow');
            moveAvailableCases.off();
            moveAvailableCases.removeClass('yellow');

            if(currentPlayer === map.players[0]){
                currentPlayer = map.players[1]
                
            }else{
                currentPlayer = map.players[0]
                 }
                 displayMoves(currentPlayer, map);
                 listenMoves(map, currentPlayer);
                })
            }







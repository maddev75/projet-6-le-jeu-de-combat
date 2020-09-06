$(function() {
    // Insérer le code jQuery ici

let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
/*let player1 = new Soldat('player1', 100, 10, 0, 100, {x:0, y:0});
let player2 = new Soldat('player2', 100, 10, 0, 100, {x:0, y:0});*/
let players = ['soldat1', 'soldat2'];

const map = new Map('#map', 10, 10, 10, weapons, players);
});

let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
let players = ['soldat1', 'soldat2'];

class Map {
    constructor(container, columns, lines, walls, weapons) {
        this.col = columns;
        this.lgn = lines;
        this.mur = walls;
        this.container = container;
        this.weapons = 4;
        this.players = 2;
        this.playerOne = null;
        this.playerTwo = null;
        this.drawMap();
    }
    drawMap() {
        const $jeu = $(this.container);
        for(let lgn=0; lgn < this.lgn; lgn++){
            const $lgn = $('<div>').addClass('row');
            for(let col=0; col < this.col; col++){
                // on attribue un id pour récupérer plus tard la case
                const $col = $('<div>').addClass('col').attr('id', 'col_'+ lgn + '_' + col);
                $lgn.append($col);
                $jeu.append($lgn);
            }
        }
        for(let i=0; i < this.mur; i++){
           let resultWalls = this.createWalls();
           console.log(resultWalls);
           if(resultWalls === 0){
               i--
               console.log(resultWalls);
           }
        }
        for(let i=0; i < 4; i++){
            let resultWeapons = this.createWeapons(weapons,i);
            console.log(resultWeapons);
            if(resultWeapons === 0){
                i--
                console.log(resultWeapons);
            }
        }
        for(let i=0; i < 2; i++){
            //checkPlayer1();
            let resultPlayers = this.createPlayers(players,i);
            console.log(resultPlayers);
            if(resultPlayers === 0){
                i--
                console.log(resultPlayers);
            }
        }
    }
    createWalls = () => {
        let x = this.getRandomInt(this.col);
        let y = this.getRandomInt(this.lgn);
        // on récupère la case sélectionnée au hasard
        let target = $('#col_'+ x + "_" + y);
        // on récupère ses classes ds un tableau
        console.log(target[0].className);
        let classes = target[0].className.split(/\s+/);
        //console.log(classes);
        // on vérifie que la classe a pas déjà un wall
        if(!classes.includes('wall')){
            //si elle a pas de wall
            target.addClass('wall');
            console.log(target);
            return 1
        }else{
            console.error("La case a déjà un mur");
            console.log(target);
            return 0
        }
     }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    createWeapons = (weapons, index) => {
        let y =  this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let target = $('#col_'+ x + "_" + y);
        //<div class="case vide"></div>
        console.log(target[0].className);
        //classes=["case","vide"];
        let classes = target[0].className.split(/\s+/);
        console.log(classes);
       if(!classes.includes('weapon')&&!classes.includes('wall')&&!classes.includes(players[index])){
            target.addClass('weapon');
            target.addClass(weapons[index]);
        }else {
              return 0
        }
    }
    createPlayers = (players, index)=> {
        let y =  this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let perso = {x: x, y:y};
        if(index > 0){
           perso = keepSocialDistanceFrom(this.playerOne, 1)
        }
        let target = $('#col_'+ perso.x + "_" + perso.y);
        //console.log(target[0].className);
        let classes = target[0].className.split(/\s+/);
        if(!classes.includes('player')&&!classes.includes('wall')&&!classes.includes(weapons[index])){
            target.addClass('player');
            target.addClass(players[index]);

            if(index === 0) {
                this.playerOne = {x: perso.x, y: perso.y}
            }else{
                this.playerTwo = {x: perso.x, y: perso.y}
            }
        } else{
            console.error('cette case contient une classe');
            return 0
        }
    }
}
    keepSocialDistanceFrom = (j1, nbCases)=> {
        
        let j2 = {x:5, y:5}
        console.log(j2);
        console.log("type of j2:",typeof(j2));
        let good = false;
        while(!good) {
           j2.y = Math.floor(Math.random()*10);
           j2.x = Math.floor(Math.random()*10);
           console.log(j2);
            if(Math.abs(j2.x - j1.x) > nbCases && Math.abs(j2.y - j1.y) > nbCases) {
                good = true;
                return j2;
        }
    }
    
}

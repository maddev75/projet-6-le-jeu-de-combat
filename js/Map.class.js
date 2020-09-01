let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
let players = ['player1', 'player2'];

class Map {
    constructor(container, columns, lines, walls, weapons) {
        this.col = columns;
        this.lgn = lines;
        this.mur = walls;
        this.container = container;
        this.weapons = weapons;
        this.players = players;
        this.playerOne = null;
        this.playerTwo = null;
        this.drawMap();
    }
    drawMap() {
        this.createGrid();
        this.createElement('wall', this.mur, 0);
        this.createElement('weapon', this.weapons.length, 0);
        this.createElement('player', this.players.length, 3);
    }
    createGrid() {
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
            }
    createElement = (type, quantity, minimumDistance)=> {
        let create;
        for (let i =0; i < quantity; i++){
            switch (type) {
                case 'wall':
                    create = this.createWalls();
                        break;
                case 'weapon':
                    create = this.createWeapons(this.weapons, i);
                        break;
                case 'player':
                    create = this.createPlayers(this.players, i, minimumDistance);
                        break;
            }
            if(create === 0) {
                i--
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
       if(!classes.includes('weapon')&&!classes.includes('wall')&&!classes.includes('player')){
            target.addClass('weapon');
            target.addClass(weapons[index]);
        }else {
              return 0
        }
    }
    createPlayers = (players, index)=> {
        let y =  this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let position = this.players[index].pseudo
        ;
        position = {x: x, y:y};
        if(index > 0){
           position = this.keepSocialDistanceFrom(this.playerOne, 3)
        }
        let target = $('#col_'+ position.x + "_" + position.y);
        //console.log(target[0].className);
        let classes = target[0].className.split(/\s+/);
        if(!classes.includes('player')&&!classes.includes('wall')&&!classes.includes('weapon')){
            target.addClass('player');
            target.addClass(players[index]);

            if(index === 0) {
                this.playerOne = {x: position.x, y: position.y}
            }else{
                this.playerTwo = {x: position.x, y: position.y}
            }
        } else{
            console.error('cette case contient une classe');
            return 0
        }
    }
    keepSocialDistanceFrom = (joueur, nbCases)=> {
        let j2 = {x:5, y:5}
        console.log(j2);
        console.log("type of j2:",typeof(j2));
        let good = false;
        while(!good) {
           j2.y =  this.getRandomInt((this.lgn));
           j2.x =  this.getRandomInt((this.col));
           console.log(j2);
            if(Math.abs(j2.x - joueur.x) > nbCases && Math.abs(j2.y - joueur.y) > nbCases) {
                good = true;
                return j2;
            }
        }
    }
}



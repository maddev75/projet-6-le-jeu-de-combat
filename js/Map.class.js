let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
let players = ['soldat1', 'soldat2'];

class Map {
    constructor(container, columns, lines, walls, weapons, players) {
        this.col = columns;
        this.lgn = lines;
        this.mur = walls;
        this.container = container;
        this.weapons = weapons;
        this.players = players;
        this.drawMap();
    }
    drawMap() {
        /*let nb_aleat = this.getRandomInt(2);
        console.log('aleat'+nb_aleat);
        if (nb_aleat === 1) {
            this.persoActuel = this.players[1].pseudo;
            alert(this.players[1].pseudo+ " commence la partie.");
         
          } else {
            this.persoActuel = this.players[0].pseudo;
            alert(this.players[0].pseudo + " commence la partie.");
           }*/
        this.createGrid();
        this.createElement('wall', this.mur, 0);
        this.createElement('weapon', this.weapons.length, 0);
        this.createElement('player', this.players.length, 3);
        /*this.setMooveValable('right', this.persoActuel, 3);
        this.setMooveValable('left', this.persoActuel, 3);
        this.setMooveValable('top', this.persoActuel, 3);
        this.setMooveValable('bottom', this.persoActuel, 3);*/
    }
    createGrid() {
        const $jeu = $(this.container);
        for (let lgn = 0; lgn < this.lgn; lgn++) {
            const $lgn = $('<div>').addClass('row');
            for (let col = 0; col < this.col; col++) {
                // on attribue un id pour récupérer plus tard la case
                const $col = $('<div>').addClass('col').attr('id', 'col_' + lgn + '_' + col);
                $lgn.append($col);
                $jeu.append($lgn);
            }
        }
    }
    createElement = (type, quantity, minimumDistance) => {
        let create;
        for (let i = 0; i < quantity; i++) {
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
            if (create === 0) {
                i--
            }
        }
    }
    createWalls = () => {
        let x = this.getRandomInt(this.col);
        let y = this.getRandomInt(this.lgn);
        // on récupère la case sélectionnée au hasard
        let target = $('#col_' + x + "_" + y);
        // on récupère ses classes ds un tableau
        console.log('target' + target[0].className);
        let classes = target[0].className.split(/\s+/);
        console.log('classes' + classes);
        // on vérifie que la classe a pas déjà un wall
        if (!classes.includes('wall')) {
            //si elle a pas de wall
            target.addClass('wall');
            console.log(target);
            return 1
        } else {
            console.error("La case a déjà un mur");
            console.log(target);
            return 0
        }
    }
    getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
    }
    createWeapons = (weapons, index) => {
        let y = this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let target = $('#col_' + x + "_" + y);
        console.log(target);
        //<div class="case vide"></div>
        console.log(target[0].className);
        //classes=["case","vide"];
        let classes = target[0].className.split(/\s+/);
        console.log(classes);
        if (!classes.includes('weapon') && !classes.includes('wall') && !classes.includes('player')) {
            target.addClass('weapon');
            target.addClass(weapons[index]);
        } else {
            return 0
        }
    }
    createPlayers = (players, index) => {
        let y = this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let position = { x: x, y: y };
        console.log(position);
        if(index > 0 ) {
            position = this.keepSocialDistanceFrom(this.players[0], 3);
        }
        let target = $('#col_' + position.x + "_" + position.y);
        console.log(target);
        let classes = target[0].className.split(/\s+/);
        if (!classes.includes('player') && !classes.includes('wall') && !classes.includes('weapon')) {
            target.addClass('player');
            target.addClass(players[index].pseudo);
            
            if(index ===0){
                this.players[0].position = { x: position.x, y: position.y };
                
         } else {
                this.players[1].position = { x: position.x, y: position.y };
         }
         
          } else {
            console.error('cette case contient une classe');
            return 0
        }
    }
    keepSocialDistanceFrom = (joueur, nbCases) => {
        let j2 = { x: 5, y: 5 }
        console.log(j2);
        console.log("type of j2:", typeof (j2));
        let good = false;
        while (!good) {
            j2.y = this.getRandomInt((this.lgn));
            j2.x = this.getRandomInt((this.col));
            console.log(j2);
            if (Math.abs(j2.x - joueur.position.x) > nbCases && Math.abs(j2.y - joueur.position.y) > nbCases) {
                good = true;
                return j2;
            }
        }
    }
    setMooveValableRight = (joueur, nbCases) => {
        for (let i = 1; i <= nbCases; i++) {
            let caseString = `#col_${joueur.position.x}_${joueur.position.y + i}`
            let boardCase = $(caseString);
            //this.moovePosition(boardCase);
           console.log(boardCase);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('yellow');
                } else {
                    return 0
                }
            }
        }
    }
   setMooveValableLeft = (joueur, nbCases) => {
        for (let i = 1; i <= nbCases; i++) {
            let caseString = `#col_${joueur.position.x}_${joueur.position.y - i}`
            let boardCase = $(caseString);
            console.log(boardCase);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('yellow');
                    $(boardCase).click(() =>{ 
                        $(boardCase).css('color', 'orange');
                        });
                } else {
                    return 0
                }
            }
        }
    }
    setMooveValableTop = (joueur, nbCases) => {
        for (let i = 1; i <= nbCases; i++) {
            let caseString = `#col_${joueur.position.x + i}_${joueur.position.y}`
            let boardCase = $(caseString);
            console.log(boardCase);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('yellow');
                } else {
                    return 0
                }
            }
        }
    }
    setMooveValableBottom = (joueur, nbCases) => {
        for (let i = 1; i <= nbCases; i++) {
            let caseString = `#col_${joueur.position.x - i}_${joueur.position.y}`
            let boardCase = $(caseString);
            console.log(boardCase);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('yellow');
                } else {
                    return 0
                }
            }
        }
    }
    setMooveValable = (rotation, joueur, nbCases) => {
        let moove;
        for (let i = 1; i < nbCases; i++) {
            switch (rotation) {
                case 'right':
                    moove = this.setMooveValableRight(joueur, nbCases);
                    break;
                case 'left':
                    moove = this.setMooveValableLeft(joueur, nbCases);
                    break;
                case 'top':
                    moove = this.setMooveValableTop(joueur, nbCases);
                    break;
                case 'bottom':
                    moove = this.setMooveValableBottom(joueur, nbCases);
                    break;
            }
        }
    }
}











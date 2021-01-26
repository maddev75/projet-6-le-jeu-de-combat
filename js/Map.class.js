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
        this.createGrid();
        this.createElement('wall', this.mur, 0);
        this.createElement('weapon', this.weapons.length, 0);
        this.createElement('player', this.players.length, 3);
    }
    createGrid() {
        const $jeu = $(this.container);
        for (let lgn = 0; lgn < this.lgn; lgn++) {
            const $lgn = $('<div>').addClass('row');
            for (let col = 0; col < this.col; col++) {
                const $col = $('<div>').addClass('col').attr('id', 'col_' + lgn + '_' + col);
                $jeu.append($lgn);
                $lgn.append($col);
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
        let target = $('#col_' + x + "_" + y);
        let classes = target[0].className.split(/\s+/);
        if (!classes.includes('wall')) {
            target.addClass('wall');
            return 1
        } else {
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
        let classes = target[0].className.split(/\s+/);
        if (!classes.includes('weapon') && !classes.includes('wall') && !classes.includes('player')) {
            target.addClass('weapon');
            target.addClass(weapons[index].name);
        } else {
            return 0
        }
    }
    createPlayers = (players, index) => {
        let y = this.getRandomInt((this.lgn));
        let x = this.getRandomInt((this.col));
        let position = { x: x, y: y };
        if (index > 0) {
            position = this.keepSocialDistanceFrom(this.players[0], 3);
        }
        let target = $('#col_' + position.x + "_" + position.y);
        let classes = target[0].className.split(/\s+/);
        if (!classes.includes('player') && !classes.includes('wall') && !classes.includes('weapon')) {
            target.addClass('player');
            target.addClass(players[index].pseudo);
            if (index === 0) {
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
            let caseString = `#col_${joueur.position.x}_${parseInt(joueur.position.y) + i}`
            let boardCase = $(caseString);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('moove-gray');
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
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('moove-gray');
                } else {
                    return 0
                }
            }
        }
    }
    setMooveValableTop = (joueur, nbCases) => {
        for (let i = 1; i <= nbCases; i++) {
            let caseString = `#col_${parseInt(joueur.position.x) + i}_${joueur.position.y}`
            let boardCase = $(caseString);
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('moove-gray');
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
            if (boardCase[0] !== undefined) {
                let classes = boardCase[0].className.split(/\s+/);
                if (!classes.includes('wall')) {
                    boardCase.addClass('moove-gray');
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











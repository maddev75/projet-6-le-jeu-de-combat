
$(function () {
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    let weaponOne = new Arme('gun', 50, `<img src='img-jeux/gun.jpg'></img>`);
    let weaponTwo = new Arme('mitraillette', 100, `<img src='img-jeux/mitraillette.jpg'></img>`);
    let weaponTree = new Arme('missile', 150, `<img src='img-jeux/missile.jpg'></img>`);
    let weaponFour = new Arme('lance-rocket', 200, `<img src='img-jeux/lance-rocket.jpg'></img>`);

    let weapons = [weaponOne, weaponTwo, weaponTree, weaponFour];
    let player1 = new Soldat('soldat1', { x: 0, y: 0 });
    let player2 = new Soldat('soldat2', { x: 0, y: 0 });
    let players = [player1, player2];
    const map = new Map('#map', 10, 10, 10, weapons, players);

    player1.displayInfo();
    player2.displayInfo();

    let currentPlayer;
    let currentPlayerNb = getRandomInt(players.length);
    if (currentPlayerNb === 0) {
        alert('Le soldat 1 commence');
        currentPlayer = map.players[0];
    } else {
        alert('Le soldat 2 commence');
        currentPlayer = map.players[1];
    }
    displayMoves(currentPlayer, map);
    listenMoves(map, currentPlayer);
    let rules = $("#règles");
    rules.click(()=>{
        alert
        (`Cliquez sur les cases colorées en gris pour déplacer le joueur dont c'est le tour.
        Passez sur une case contenant une arme pour en changer.
        Lorsque les deux joueurs sont côte à côte, ils peuvent choisir de se battre ou de se défendre. 
        Dès que l'un des joueurs a 0 points de vie, l'autre joueur gagne.
        Bon jeu !`);
    });
    function displayMoves(currentPlayer, map) {
        map.setMooveValable('right', currentPlayer, 3);
        map.setMooveValable('left', currentPlayer, 3);
        map.setMooveValable('top', currentPlayer, 3);
        map.setMooveValable('bottom', currentPlayer, 3);
    }
    function listenMoves(map, currentPlayer) {
        let moveAvailableCases = $('.moove-gray');
        moveAvailableCases.on('click', (event) => {
            moveAvailableCases.off();
            moveAvailableCases.removeClass('moove-gray');
            let caseInfo = event.target.id.split('_')
            let caseCliquee = $("#" + event.target.id);
            let currentPlayerCase = $('#col_' + currentPlayer.position.x + '_' + currentPlayer.position.y);
            let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
            let classesCliquee = caseCliquee.attr('class').split(/\s+/);
            let lastWeaponPlayer = null;
            currentPlayer.position.x = caseInfo[1];
            currentPlayer.position.y = caseInfo[2];
            if (classesCliquee.includes('weapon')) {
                classesCliquee.splice(classesCliquee.indexOf('col'), 1);
                classesCliquee.splice(classesCliquee.indexOf('weapon'), 1);
                lastWeaponPlayer = currentPlayer.weapon;
                let foundWeapon = map.weapons.find(elt => elt.name === classesCliquee[0]);
                currentPlayer.weapon = foundWeapon;
                let foundWeaponIndex = map.weapons.findIndex(elt => elt.name === foundWeapon.name)
                map.weapons.splice(foundWeaponIndex, 1);
                map.weapons.push(lastWeaponPlayer);
                caseCliquee.addClass(lastWeaponPlayer.name);
                caseCliquee.addClass('weapon');
                caseCliquee.removeClass(foundWeapon.name);
            }
            let changeJoueur = classesJoueur.join(' ');
            if (classesJoueur.includes('weapon')) {
                classesJoueur.splice(classesJoueur.indexOf('col'), 1);
                classesJoueur.splice(classesJoueur.indexOf('player'), 1);
                if (classesJoueur.includes('soldat1')) { classesJoueur.splice(classesJoueur.indexOf('soldat1'), 1); currentPlayerCase.removeClass('soldat1'); }
                else { classesJoueur.splice(classesJoueur.indexOf('soldat2'), 1); currentPlayerCase.removeClass('soldat2'); }
                if (classesJoueur.indexOf('gun') >= 0) { classesJoueur.splice(classesJoueur.indexOf('gun'), 1) };
                if (classesJoueur.indexOf('mitraillette') >= 0) { classesJoueur.splice(classesJoueur.indexOf('mitraillette'), 1) };
                if (classesJoueur.indexOf('missile') >= 0) { classesJoueur.splice(classesJoueur.indexOf('missile'), 1) };
                if (classesJoueur.indexOf('lance-rocket') >= 0) { classesJoueur.splice(classesJoueur.indexOf('lance-rocket'), 1) };
                if (classesJoueur.indexOf('pistolet') >= 0) { classesJoueur.splice(classesJoueur.indexOf('pistolet'), 1) };
                changeJoueur = classesJoueur.join(' ');
                currentPlayerCase.removeClass('player')
            } else {
                currentPlayerCase.removeClass(changeJoueur);
                currentPlayerCase.addClass('col');
            }
            caseCliquee.addClass("col");
            caseCliquee.addClass('player');
            caseCliquee.addClass(currentPlayer.pseudo);
            if (currentPlayer === map.players[0]) {
                currentPlayer = map.players[1];
            } else {
                currentPlayer = map.players[0];
            }
            if (Math.abs(map.players[0].position.x === map.players[1].position.x) && Math.abs(map.players[0].position.y - map.players[1].position.y) === 1) {
                alert('le combat commence');
                fight(currentPlayer);
                return;
                attaquer(currentPlayer, lastWeaponPlayer.name);
            }
            else if (Math.abs(map.players[0].position.y === map.players[1].position.y) && Math.abs(map.players[0].position.x - map.players[1].position.x) === 1) {
                alert('le combat commence');
                fight(currentPlayer);
                return;
                attaquer(currentPlayer, lastWeaponPlayer.name);
            }
            player1.displayInfo();
            player2.displayInfo();
            displayMoves(currentPlayer, map);
            listenMoves(map, currentPlayer);
        })
    }
    function fight(currentPlayer) {
        let agresseur;
        if (currentPlayer === map.players[0]) {
            agresseur = map.players[1];
        } else {
            agresseur = map.players[0];
        }
        let butonAttaq = document.getElementById('attaq');
        butonAttaq.addEventListener('click', () => {
            attaquer(currentPlayer, agresseur);
            currentPlayer.displayInfo();
            if (currentPlayer.sante <= 0) {
                alert(currentPlayer.pseudo + ' a perdu');
                document.location.reload();
            }
            if (agresseur === map.players[0]) {
                agresseur = map.players[1];
                currentPlayer = map.players[0];
            } else {
                agresseur = map.players[0]
                currentPlayer = map.players[1];
            }
        })
        let butonDefense = document.getElementById('defense');
        butonDefense.addEventListener('click', () => {
            defense(currentPlayer, agresseur);
            currentPlayer.displayInfo();
            if (agresseur === map.players[0]) {
                agresseur = map.players[1];
                currentPlayer = map.players[0];
            } else {
                agresseur = map.players[0]
                currentPlayer = map.players[1];
            }
        })
    }
    function attaquer(currentPlayer, agresseur) {
        currentPlayer.sante -= currentPlayer.defendre ? agresseur.weapon.damage / 2 : agresseur.weapon.damage;
        currentPlayer.defendre = false;
    }
    function defense(currentPlayer, agresseur) {
        agresseur.defendre = true;
        return 'cible', currentPlayer.sante;
    }
});
















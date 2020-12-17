
$(function () {
    // Insérer le code jQuery ici
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    let weaponOne = new Arme('gun', 50, 'img-jeux/gun.jpg');
    let weaponTwo = new Arme('mitraillette', 100, 'img-jeux/mitraillette.jpg');
    let weaponTree = new Arme('missile', 150, 'img-jeux/missile.jpg');
    let weaponFour = new Arme('lance-rocket', 200, 'img-jeux/lance-rocket.jpg');

    let weapons = [weaponOne, weaponTwo, weaponTree, weaponFour];
    let player1 = new Soldat('soldat1', { x: 0, y: 0 });
    let player2 = new Soldat('soldat2', { x: 0, y: 0 });
    let players = [player1, player2];
    const map = new Map('#map', 10, 10, 10, weapons, players);

    let currentPlayer;
    let currentPlayerNb = getRandomInt(players.length);
    if (currentPlayerNb === 0) {
        alert('Le soldat 1 commence')
        currentPlayer = map.players[0]
    } else {
        alert('Le soldat 2 commence')
        currentPlayer = map.players[1]
    }
    displayMoves(currentPlayer, map);
    listenMoves(map, currentPlayer);
    //fight(currentPlayer, map.players);
    function displayMoves(currentPlayer, map) {
        map.setMooveValable('right', currentPlayer, 3);
        map.setMooveValable('left', currentPlayer, 3);
        map.setMooveValable('top', currentPlayer, 3);
        map.setMooveValable('bottom', currentPlayer, 3);
    }
    function listenMoves(map, currentPlayer) {
        let moveAvailableCases = $('.yellow');
        moveAvailableCases.on('click', (event) => {
            //$(moveCase).click(()=> {
            moveAvailableCases.off();
            moveAvailableCases.removeClass('yellow');
            let caseInfo = event.target.id.split('_')
            console.log('case', caseInfo);
            let caseCliquee = $("#" + event.target.id);
            //console.log('case cliquee', caseCliquee);
            let currentPlayerCase = $('#col_' + currentPlayer.position.x + '_' + currentPlayer.position.y);
            //joueur en mouvement
            console.log('curentplayerCase', currentPlayerCase);
            let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
            //classes du joueur en mouvmt
            console.log('classesjoueurs', classesJoueur);
            let classesCliquee = caseCliquee.attr('class').split(/\s+/);
            //les classes de la case cliquée
            console.log('classesclique', classesCliquee);
            lastWeaponPlayer = currentPlayer.weapon;
            //let lastWeaponPlayer = null;
            //Traitement des mouvements 
            //actualise joueur (position apres le clic)
            currentPlayer.position.x = caseInfo[1];
            currentPlayer.position.y = caseInfo[2];
            console.log('currentplayer', currentPlayer);
            //let changeCliquee = classesCliquee.join(' ');
            // on a cliquée sur une case avec un arme
            if (classesCliquee.includes('weapon')) {
                classesCliquee.splice(classesCliquee.indexOf('col'), 1); // on supprime col du tableau classesCliquee
                classesCliquee.splice(classesCliquee.indexOf('weapon'), 1); // on supprime weapon du tableau classesCliquee
                //classesCliquee.splice(classesCliquee.indexOf('yellow'), 1); // on supprime yellow du tableau classesCliquee
                // il ne reste dans classesCliquee que la classe de l'arme
                //console.log("arme trouvée sur la case :", classesCliquee);
                // l'arme que le joueur a avant d'arriver sur la case. 
                //lastWeaponPlayer = currentPlayer.weapon;
                console.log("lastWeaponPlayer", lastWeaponPlayer)
                // Dans le tableau des armes de la map, on récupère l'arme correspondant à la case
                let foundWeapon = map.weapons.find(elt => elt.name === classesCliquee[0]);
                currentPlayer.weapon = foundWeapon;
                // on récupère l'index de l'arme qu'on a trouvé
                let foundWeaponIndex = map.weapons.findIndex(elt => elt.name === foundWeapon.name)
                // on supprime l'arme du tableau grace à son index
                map.weapons.splice(foundWeaponIndex, 1);
                // on ajoute au tableau des armes
                map.weapons.push(lastWeaponPlayer);
                console.log('Weapons de la map', map.weapons);
                // on ajoute la classe arme et weapon a la case qu'on a cliqué 
                caseCliquee.addClass(lastWeaponPlayer.name);
                caseCliquee.addClass('weapon');
                //on supprime la classe de l'arme qu'on a trouvé
                caseCliquee.removeClass(foundWeapon.name);
            }
            let changeJoueur = classesJoueur.join(' ');
            // lorsque l'on ressort d'une case où il y avait une arme  
            if (classesJoueur.includes('weapon')) {
                console.log(currentPlayerCase);
                classesJoueur.splice(classesJoueur.indexOf('col'), 1); // on supprime col du tableau classesCliquee
                classesJoueur.splice(classesJoueur.indexOf('player'), 1); // on supprime PLAYER du tableau classesCliquee
                if (classesJoueur.includes('soldat1')) { classesJoueur.splice(classesJoueur.indexOf('soldat1'), 1); currentPlayerCase.removeClass('soldat1'); }
                else { classesJoueur.splice(classesJoueur.indexOf('soldat2'), 1); currentPlayerCase.removeClass('soldat2'); }
                if (classesJoueur.indexOf('gun') >= 0) { classesJoueur.splice(classesJoueur.indexOf('gun'), 1) };
                if (classesJoueur.indexOf('mitraillette') >= 0) { classesJoueur.splice(classesJoueur.indexOf('mitraillette'), 1) };
                if (classesJoueur.indexOf('missile') >= 0) { classesJoueur.splice(classesJoueur.indexOf('missile'), 1) };
                if (classesJoueur.indexOf('lance-rocket') >= 0) { classesJoueur.splice(classesJoueur.indexOf('lance-rocket'), 1) };
                if (classesJoueur.indexOf('pistolet') >= 0) { classesJoueur.splice(classesJoueur.indexOf('pistolet'), 1) };
                changeJoueur = classesJoueur.join(' ');
                //currentPlayerCase.removeClass("weapon")
                currentPlayerCase.removeClass('player')
            }else{
                currentPlayerCase.removeClass(changeJoueur);
                currentPlayerCase.addClass('col');
            }
            // caseCliquee.removeClass(changeCliquee);
            caseCliquee.addClass("col");
            caseCliquee.addClass('player');
            caseCliquee.addClass(currentPlayer.pseudo);
            if (currentPlayer === map.players[0]) {
                currentPlayer = map.players[1];
                //console.log('leVraicurentplayer', currentPlayer);
            } else {
                currentPlayer = map.players[0]
                //console.log('leVraicurentplayer', currentPlayer);
            }
            if (Math.abs(map.players[0].position.x === map.players[1].position.x) && Math.abs(map.players[0].position.y - map.players[1].position.y) === 1) {
                alert('le combat commence');
                //while(map.players[0].sante > 0 || map.players[1].sante > 0) {
                fight(currentPlayer);
                return;
                attaquer(currentPlayer, lastWeaponPlayer.name);
            }
            else if (Math.abs(map.players[0].position.y === map.players[1].position.y) && Math.abs(map.players[0].position.x - map.players[1].position.x) === 1) {
                alert('le combat commence');
                //while(map.players[0].sante > 0 || map.players[1].sante > 0) {
                fight(currentPlayer);
                return;
                attaquer(currentPlayer, lastWeaponPlayer.name);
            }
            displayMoves(currentPlayer, map);
            listenMoves(map, currentPlayer);
        })
    }
   function fight(currentPlayer) {
        let agresseur;
        if(currentPlayer === map.players[0]) {// cible
            agresseur = map.players[1];
        }else{
            agresseur = map.players[0];
        }
        let butonAttaq = document.getElementById('attaq');
        butonAttaq.addEventListener('click', () => {
            action = 'attaquer';
            attaquerDefendre(action, currentPlayer, agresseur);
            if(agresseur === map.players[0]) {
                agresseur = map.players[1];
                currentPlayer = map.players[0];
            }else{
                agresseur = map.players[0]
                currentPlayer = map.players[1];
            }
            //attaquer(currentPlayer, agresseur);
        })
        let butonDefense = document.getElementById('defense');
        butonDefense.addEventListener('click', ()=>{
            action = 'defendre';

            attaquerDefendre(action, currentPlayer, agresseur);
            if(agresseur === map.players[0]){
                agresseur = map.players[0];
                currentPlayer = map.players[1];
            }else{
                agresseur = map.players[1]
                currentPlayer = map.players[0];
            }
        })
    }
    function attaquer(currentPlayer, agresseur){
        currentPlayer.sante -= agresseur.weapon.damage;
        console.log('agresseur', agresseur);
        console.log('cible', currentPlayer);
    }
    function defense(currentPlayer, agresseur){
        currentPlayer.sante -= agresseur.weapon.damage/2;
        //return 'agresseur', agresseur;
        return 'cible', currentPlayer.sante;
    }
    function attaquerDefendre(action, currentPlayer, agresseur){
        switch (action){
            case 'attaquer': attaquer(currentPlayer, agresseur);
                break;
            case 'defendre': defense(currentPlayer, agresseur);
                break;
            }
        }
});













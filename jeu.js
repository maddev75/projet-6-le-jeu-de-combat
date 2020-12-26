
$(function () {
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    let weaponOne = new Arme('gun', 50, `<img src='img-jeux/gun.jpg'></img>`);
    let weaponTwo = new Arme('mitraillette', 100, `<img src='img-jeux/mitraillette.jpg'></img>`);
    let weaponTree = new Arme('missile', 150, `<img src='img-jeux/missile.jpg'></img>`);
    let weaponFour = new Arme('lance-rocket', 200, `<img src='img-jeux/lance-rocket.jpg'></img>`);
    //let weaponFive = new Arme('pistolet', 20, 'img-jeux/pistolet.png');

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
   
    
    function displayMoves(currentPlayer, map) {
        map.setMooveValable('right', currentPlayer, 3);
        map.setMooveValable('left', currentPlayer, 3);
        map.setMooveValable('top', currentPlayer, 3);
        map.setMooveValable('bottom', currentPlayer, 3);
    }
    function listenMoves(map, currentPlayer) {
        let moveAvailableCases = $('.yellow');
        moveAvailableCases.on('click', (event) => {
            moveAvailableCases.off();
            moveAvailableCases.removeClass('yellow');
            let caseInfo = event.target.id.split('_')
            console.log('caseinfo', caseInfo);
            let caseCliquee = $("#" + event.target.id);
            console.log('casecliquee', caseCliquee);
            let currentPlayerCase = $('#col_' + currentPlayer.position.x + '_' + currentPlayer.position.y);
            console.log('currentPlayercase', currentPlayerCase);
            let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
            console.log('classesJoueur', classesJoueur);
            let classesCliquee = caseCliquee.attr('class').split(/\s+/);
            console.log('classesclique', classesCliquee);
            let lastWeaponPlayer = null;
            currentPlayer.position.x = caseInfo[1];
            currentPlayer.position.y = caseInfo[2];
            console.log('curentplayer', currentPlayer);
            
            if (classesCliquee.includes('weapon')) {
                /*exchangeWeapons(classesCliquee, caseCliquee, lastWeaponPlayer);
                currentPlayer.displayInfo();
            }
            if (classesJoueur.includes('weapon')) {
                updateWeapons(classesJoueur, currentPlayerCase, changeJoueur);
                currentPlayer.displayInfo();
                
            }else{
                changeJoueur = classesJoueur;
                currentPlayerCase.removeClass(changeJoueur);
                currentPlayerCase.addClass('col');
            }*/
            classesCliquee.splice(classesCliquee.indexOf('col'), 1); // on supprime col du tableau classesCliquee
            classesCliquee.splice(classesCliquee.indexOf('weapon'), 1); // on supprime weapon du tableau classesCliquee
             //classesCliquee.splice(classesCliquee.indexOf('yellow'), 1); // on supprime yellow du tableau classesCliquee
             // il ne reste dans classesCliquee que la classe de l'arme
             //console.log("arme trouvée sur la case :", classesCliquee);
             // l'arme que le joueur a avant d'arriver sur la case. 
             lastWeaponPlayer = currentPlayer.weapon;
             //console.log("lastWeaponPlayer", lastWeaponPlayer)
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
             classesJoueur.splice(classesJoueur.indexOf('player'), 1); // on supprime weapon du tableau classesCliquee
            if(classesJoueur.includes('soldat1')){classesJoueur.splice(classesJoueur.indexOf('soldat1'), 1);currentPlayerCase.removeClass('soldat1');}
             else{classesJoueur.splice(classesJoueur.indexOf('soldat2'), 1);currentPlayerCase.removeClass('soldat2');}
             if (classesJoueur.indexOf('gun') >= 0) { classesJoueur.splice(classesJoueur.indexOf('gun'), 1) };
             if (classesJoueur.indexOf('mitraillette') >= 0) { classesJoueur.splice(classesJoueur.indexOf('mitraillette'), 1) };
             if (classesJoueur.indexOf('missile') >= 0) { classesJoueur.splice(classesJoueur.indexOf('missile'), 1) };
             if (classesJoueur.indexOf('lance-rocket') >= 0) { classesJoueur.splice(classesJoueur.indexOf('lance-rocket'), 1) };
             if (classesJoueur.indexOf('pistolet') >= 0) { classesJoueur.splice(classesJoueur.indexOf('pistolet'), 1) };
             changeJoueur = classesJoueur.join(' ');
             //currentPlayerCase.removeClass("weapon")
             currentPlayerCase.removeClass('player')

              } else {
             currentPlayerCase.removeClass(changeJoueur);
             currentPlayerCase.addClass('col');
            }
            caseCliquee.addClass("col");
            caseCliquee.addClass('player');
            caseCliquee.addClass(currentPlayer.pseudo);
            if (currentPlayer === map.players[0]) {
                currentPlayer = map.players[1];
            }else{
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
    function exchangeWeapons(classesCliquee, caseCliquee, lastWeaponPlayer) {
        classesCliquee.splice(classesCliquee.indexOf('col'), 1); // on supprime col du tableau classesCliquee
        classesCliquee.splice(classesCliquee.indexOf('weapon'), 1); // on supprime weapon du tableau classesCliquee
        lastWeaponPlayer = currentPlayer.weapon;
        console.log("lastWeaponPlayer", lastWeaponPlayer);
        let foundWeapon = map.weapons.find(elt => elt.name === classesCliquee[0]);
        currentPlayer.weapon = foundWeapon;
        let foundWeaponIndex = map.weapons.findIndex(elt => elt.name === foundWeapon.name)
        map.weapons.splice(foundWeaponIndex, 1);
        map.weapons.push(lastWeaponPlayer);
        console.log('Weapons de la map', map.weapons);
        caseCliquee.addClass(lastWeaponPlayer.name);
        caseCliquee.addClass('weapon');
        caseCliquee.removeClass(foundWeapon.name);
    }
    function updateWeapons(classesJoueur, currentPlayerCase, changeJoueur) {
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
        currentPlayerCase.removeClass('player');
    }
    function fight(currentPlayer){
        let agresseur;
        if(currentPlayer === map.players[0]){//cible
            agresseur = map.players[1];
        }else{
            agresseur = map.players[0];
        }
        let butonAttaq = document.getElementById('attaq');
        butonAttaq.addEventListener('click', () =>{
            attaquer(currentPlayer, agresseur);
            currentPlayer.displayInfo();
            if(currentPlayer.sante <=0){
                alert(currentPlayer.pseudo + ' a perdu');
            }
            if(agresseur === map.players[0]){
                agresseur = map.players[1];
                currentPlayer = map.players[0];
            }else{
                agresseur = map.players[0]
                currentPlayer = map.players[1];
            }
        })
        let butonDefense = document.getElementById('defense');
        butonDefense.addEventListener('click', ()=>{
            defense(currentPlayer, agresseur);
            currentPlayer.displayInfo();
            if(agresseur === map.players[0]) {
                agresseur = map.players[1];
                currentPlayer = map.players[0];
            }else{
                agresseur = map.players[0]
                currentPlayer = map.players[1];
            }
        })
    }
    function attaquer(currentPlayer, agresseur){
        currentPlayer.sante -= currentPlayer.defendre ? agresseur.weapon.damage/2 : agresseur.weapon.damage;
        console.log('agresseur', agresseur);
        console.log('cible', currentPlayer);
        currentPlayer.defendre = false;
    }
    function defense(currentPlayer, agresseur){
        agresseur.defendre = true;
        return 'cible', currentPlayer.sante;
    }
});
















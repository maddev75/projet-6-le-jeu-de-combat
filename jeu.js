
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
    let player1 = new Soldat('soldat1', { x: 0, y: 0 }, 450);
    let player2 = new Soldat('soldat2', { x: 0, y: 0 }, 450);
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
});
function displayMoves(currentPlayer, map) {
    map.setMooveValable('right', currentPlayer, 3);
    map.setMooveValable('left', currentPlayer, 3);
    map.setMooveValable('top', currentPlayer, 3);
    map.setMooveValable('bottom', currentPlayer, 3);
}
function listenMoves(map, currentPlayer) {
   // let player1 = new Soldat('soldat1', 100, 10, 0, 100, { x: 0, y: 0 });
    //let player2 = new Soldat('soldat2', 100, 10, 0, 100, { x: 0, y: 0 });
    //let players = [player1, player2];
    //let player 
    //let moveAvailableCases = document.getElementsByClassName('yellow');
    let moveAvailableCases = $('.yellow');
    moveAvailableCases.on('click', (event) => {
        //$(moveCase).click(()=> {
        moveAvailableCases.off();
        let caseInfo = event.target.id.split('_')
        console.log('case', caseInfo);
        let caseCliquee = $("#" + event.target.id);
        console.log('case cliquee', caseCliquee);
        let currentPlayerCase = $('#col_' + currentPlayer.position.x + '_' + currentPlayer.position.y);
        console.log('curentplayer', currentPlayerCase);
        let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
        console.log('classesjoueurs', classesJoueur);
        //console.log('clasjoueur', classesJoueur);
        //let classesCliquee = caseCliquee.attr("class").split(/\s+/);
        
       if (classesJoueur.includes('weapon')) {
            classesJoueur.splice(classesJoueur.indexOf('weapon'), 1);

            if (classesJoueur.indexOf('gun') >= 0) { classesJoueur.splice(classesJoueur.indexOf('gun'), 1) };
            if (classesJoueur.indexOf('mitraillette') >= 0) { classesJoueur.splice(classesJoueur.indexOf('mitraillette'), 1) };
            if (classesJoueur.indexOf('missile') >= 0) { classesJoueur.splice(classesJoueur.indexOf('missile'), 1) };
            if (classesJoueur.indexOf('lance-rocket') >= 0) { classesJoueur.splice(classesJoueur.indexOf('lance-rocket'), 1) };
            if (classesJoueur.indexOf('pistolet') >= 0) { classesJoueur.splice(classesJoueur.indexOf('pistolet'), 1) };
       }

        let classesCliquee = caseCliquee.attr('class').split(/\s+/);
        let changeJoueur = classesJoueur.join(' ');
        let changeCliquee = classesCliquee.join(' ');

        if (classesCliquee.includes('weapon')) {
            
            classesCliquee.splice(classesCliquee.indexOf('col'), 1);
            classesCliquee.splice(classesCliquee.indexOf('weapon'), 1);
            classesCliquee.splice(classesCliquee.indexOf('yellow'), 1);
            console.log('clasclique', classesCliquee[0]);
            let originalWeapon = currentPlayer.weapon;

            currentPlayer.weapon = map.weapons.find(elt => elt.name === classesCliquee[0]);
            map.weapons.splice(map.weapons.findIndex(elt => elt.name === currentPlayer.weapon), 1);
            //map.weapons.splice(map.weapons.indexOf(currentPlayer.weapon), 1);
            console.log('curentwep', currentPlayer.weapon);

            map.weapons.push(originalWeapon.name);
            console.log('currentPlayer', currentPlayer);
            caseCliquee.addClass(originalWeapon.name);
            console.log('map', map);
            console.log('original', originalWeapon);
        }
        console.log('joueur, ' + classesJoueur)
        console.log('cliquee, ' + classesCliquee)
        console.log('change joueur, ' + changeJoueur)
        console.log('change cliquee, ' + changeCliquee)

        caseCliquee.removeClass(changeCliquee);
        caseCliquee.addClass(changeJoueur);
        caseCliquee.addClass('weapon');
        if(caseCliquee.hasClass('weapon')){
            caseCliquee.addClass('weapon');
        }
            
    
        console.log('casecliq', caseCliquee);
        
        currentPlayerCase.removeClass(changeJoueur);
        currentPlayerCase.addClass('col');
        if(currentPlayerCase.hasClass('weapon')){
            currentPlayerCase.addClass('weapon');
        }
        currentPlayerCase.addClass('weapon');
        console.log('playercase', currentPlayerCase);
        //actualise joueur
        currentPlayer.position.x = caseInfo[1];
        currentPlayer.position.y = caseInfo[2];
        //enleve jaune
        console.log(currentPlayer);
        moveAvailableCases.removeClass('yellow');
    
        if (currentPlayer === map.players[0]) {
            currentPlayer = map.players[1]
            } else {
            currentPlayer = map.players[0]
        }
        if (map.players[0].position.y === map.players[1].position.y || map.players[0].position.x === map.players[1].position.x) {
            alert('le combat commence')
           // console.log('player', currentPlayer);
    

        if (currentPlayer === map.players[0]) {
            currentPlayer = map.players[0]
        
            attaquer(arme.name, currentPlayer);
            
            }else {
                currentPlayer = map.players[1];
        
                attaquer(arme.name, currentPlayer);
            
        }
    }
        
         
        displayMoves(currentPlayer, map);
        listenMoves(map, currentPlayer);
        })
    }
    getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

function attaquer(arme,players){
    let butonAttaq = document.querySelector('button');
    butonAttaq.addEventListener('click', ()=>{
    let attaque;
        switch (arme) {
            case 'pistolet':
                attaque === 20;
                map.players[i].sante -= attaque;
                console.log(sante);
                break;
            case 'gun':
                attaque === 50;
                map.players[i].sante -= attaque;
                console.log(sante);
                break;
            case 'mitraillette':
                attaque === 100;
                map.players[i].sante -= attaque;
                console.log(sante);
                break;
            case 'missile':
                attaque === 150;
                map.players[i].sante -= attaque;
                console.log(sante);
                break;
            case 'lance-rocket':
                attaque === 200;
                map.players[i].sante -= attaque;
                console.log(sante);
                break;
            }
        })
    }
   











/*function verification() {
    let y = this.getRandomInt(10);
    let x = this.getRandomInt(10);
    let position = { x: x, y: y };
    console.log('position', position);

    let player1 = new Soldat('soldat1', 100, 10, 0, 100, { x: x, y: y });
    let player2 = new Soldat('soldat2', 100, 10, 0, 100, { x: 0, y: 0 });

    let players = [player1, player2];


    console.log(player1);

}*/

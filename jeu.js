
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
         moveAvailableCases.removeClass('yellow');
         let caseInfo = event.target.id.split('_')
         //console.log('case', caseInfo);
         let caseCliquee = $("#" + event.target.id);
         //console.log('case cliquee', caseCliquee);
         let currentPlayerCase = $('#col_' + currentPlayer.position.x + '_' + currentPlayer.position.y);
         //console.log('curentplayer', currentPlayerCase);
         let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
         console.log('classesjoueurs', classesJoueur);
         let classesCliquee = caseCliquee.attr('class').split(/\s+/);
         console.log('classesclique', classesCliquee);
         let lastWeaponPlayer = null;
         //Traitement des mouvements 
         //actualise joueur
         currentPlayer.position.x = caseInfo[1];
         currentPlayer.position.y = caseInfo[2];
         let changeCliquee = classesCliquee.join(' ');
         // on a cliquée sur une case avec un arme
         if(classesCliquee.includes('weapon')){
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
                // caseCliquee.removeClass(changeCliquee);
                caseCliquee.addClass("col");
                caseCliquee.addClass('player');
                caseCliquee.addClass(currentPlayer.pseudo);
         
                if (currentPlayer === map.players[0]) {
                    currentPlayer = map.players[1]
                    } else {
                    currentPlayer = map.players[0]
                    }
                    /*
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
     } */
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

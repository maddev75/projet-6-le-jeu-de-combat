$(function() {
    // Insérer le code jQuery ici
getRandomInt = (max) => { 
        return Math.floor(Math.random() * Math.floor(max));
    }
    let weaponOne = new Arme ('gun', 50, 'img-jeux/gun.jpg');
    let weaponTwo = new Arme ('mitraillette', 100, 'img-jeux/mitraillette.jpg');
    let weaponTree = new Arme ('missile', 150, 'img-jeux/missile.jpg');
    let weaponFour = new Arme ('lance-rocket', 200, 'img-jeux/lance-rocket.jpg');
    let weaponFive = new Arme ('pistolet', 20, 'img-jeux/pistolet.png');
    

    //let weapons = ["gun", "mitraillette", "missile", "lance-rocket"];
    let weapons = [weaponOne, weaponTwo, weaponTree, weaponFour];
    let player1 = new Soldat('soldat1', 100, 10, 0, 100, {x:0, y:0}, weaponFive);
    let player2 = new Soldat('soldat2', 100, 10, 0, 100, {x:0, y:0}, weaponFive);
    let players = [player1, player2];
    const map = new Map('#map', 10, 10, 10, weapons, players);

    let currentPlayer;
    let currentPlayerNb = getRandomInt(players.length);
        if (currentPlayerNb === 0) {
            alert('Le soldat 1 commence')
                currentPlayer = map.players[0]
        }else{
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
function listenMoves(map, currentPlayer){
    //let player 
    //let moveAvailableCases = document.getElementsByClassName('yellow');
    let moveAvailableCases = $('.yellow');
    
    moveAvailableCases.on('click', (event)=> {
           //$(moveCase).click(()=> {
            moveAvailableCases.off();
            let caseInfo = event.target.id.split('_')
            console.log('case'+ caseInfo);
            let caseCliquee = $("#"+event.target.id);
            console.log(caseCliquee);
            let currentPlayerCase = $('#col_'+currentPlayer.position.x+'_'+currentPlayer.position.y);
            
            let classesJoueur = currentPlayerCase.attr("class").split(/\s+/);
            //let classesCliquee = caseCliquee.attr("class").split(/\s+/);
            if (classesJoueur.includes('weapon')){
                classesJoueur.splice(classesJoueur.indexOf('weapon'), 1);
                if(classesJoueur.indexOf('gun')>= 0){classesJoueur.splice(classesJoueur.indexOf('gun'), 1);}
                if(classesJoueur.indexOf('mitraillette')>= 0){classesJoueur.splice(classesJoueur.indexOf('mitraillette'), 1);}
                if(classesJoueur.indexOf('missile')>= 0){classesJoueur.splice(classesJoueur.indexOf('missile'), 1);}
                if(classesJoueur.indexOf('lance-rocket')>= 0){classesJoueur.splice(classesJoueur.indexOf('lance-rocket'), 1);}
                if(classesJoueur.indexOf('pistolet')>= 0){classesJoueur.splice(classesJoueur.indexOf('pistolet'), 1);}
            }
            
            let classesCliquee = caseCliquee.attr('class').split(/\s+/);
            let changeJoueur = classesJoueur.join(' ');
            let changeCliquee = classesCliquee.join(' ')

            if(classesCliquee.includes('weapon')){
                classesCliquee.splice(classesCliquee.indexOf('col'), 1);
                classesCliquee.splice(classesCliquee.indexOf('weapon'), 1);
                classesCliquee.splice(classesCliquee.indexOf('yellow'), 1);
                console.log(classesCliquee[0]);
                let originalWeapon = currentPlayer.weapon;
                currentPlayer.weapon = map.weapons.find(elt => elt.name === classesCliquee[0]);
                map.weapons.splice(map.weapons.findIndex(elt => elt.name === currentPlayer.weapon.name), 1);
                map.weapons.push(originalWeapon);
                console.log('currentPlayer', currentPlayer);
                caseCliquee.addClass(originalWeapon.name);
                console.log('map', map);
                console.log('original', originalWeapon);
            }
            console.log('joueur, '+ classesJoueur)
            console.log('cliquee, '+ classesCliquee)
            console.log('change joueur, '+ changeJoueur)
            console.log('change cliquee, '+ changeCliquee)


            caseCliquee.removeClass(changeCliquee);
            caseCliquee.addClass(changeJoueur);
            caseCliquee.addClass('weapon');
            
            currentPlayerCase.removeClass(changeJoueur);
            currentPlayerCase.addClass('col');
            currentPlayerCase.addClass('weapon');
            console.log(currentPlayerCase);
            //actualise joueur
            currentPlayer.position.x = caseInfo[1];
            currentPlayer.position.y = caseInfo[2];
            //enleve jaune
           moveAvailableCases.removeClass('yellow');

            if(currentPlayer === map.players[0]){
                currentPlayer = map.players[1]
                
            }else{
                currentPlayer = map.players[0]
                 }
                 displayMoves(currentPlayer, map);
                 listenMoves(map, currentPlayer);
                 })
            }








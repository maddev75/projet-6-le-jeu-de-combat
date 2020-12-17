class Soldat {
    constructor(pseudo, position) {
        this.pseudo = pseudo;
        this.sante = 450;
        this.defendre = false;             
        this.position = position;
        this.posture = 0;//0=attaq; 1=defense;
        this.cible = cible;
        this.actuel = actuel;
        this.weapon = new Arme('pistolet', 20, 'img-jeux/pistolet.png');
    }
    get informations() {
        return this.pseudo + 'a' + this.sante + " points de vie et est au niveau " + ".";
      }
    
    verifierSante() {
        if(this.sante <= 0) {
            this.sante == 0;
            console.log(this.pseudo + 'a perdu la bataille!');
        }
    }
}
<<<<<<< HEAD
    /*attaquer(){
        for (let i = 1; i < 4; i++) {
=======
    /*attaquer(arme, player){
        let butonAttaq = document.querySelector('#attaque');
        butonAttaq.addEventListener('click', ()=>{
>>>>>>> e69a6aa937dfcb43902bad9f85d3b4d95579f112
        let attaque;
            switch (arme) {
                case 'pistolet':
                    attaque === 20;
                    player.sante -= attaque;
                    console.log(sante);
                    break;
                case 'gun':
                    attaque === 50;
                    player.sante -= attaque;
                    console.log(sante);
                    break;
                case 'mitraillette':
                    attaque === 100;
                    player.sante -= attaque;
                    console.log(sante);
                    break;
                case 'missile':
                    attaque === 150;
                    player.sante -= attaque;
                    console.log(sante);
                    break;
                case 'lance-rocket':
                    attaque === 200;
                    player.sante -= attaque;
                    console.log(sante);
                    break;
                }
            })
        }
<<<<<<< HEAD
        
   attaquer(Soldat) {
        soldat.sante -= this.attaque;
        console.log(this.pseudo + 'attaque ' + personnage.pseudo + 'en lançant sa lance (' + this.attaque + ' dégats)' );
        personnage.verifierSante();
    }*/
=======
        defendre(){
            let butonDefense = document.querySelector('#défense');
            butonDefense.addEventListener('click', ()=>{
            this.soldat.sante = soldat.sante/2;
            console.log(sante);
        })
    }
}*/
>>>>>>> e69a6aa937dfcb43902bad9f85d3b4d95579f112

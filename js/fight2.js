class Soldat {
    constructor(pseudo, position, sante) {
        this.pseudo = pseudo;
        this.sante = 450;
        this.defendre = false;             
        this.position = position;
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
    /*ttaquer(){
        for (let i = 1; i < 4; i++) {
        let attaque;
        switch (arme) {
                case 'pistolet':
                    attaque === 20;
                    player1.sante -= attaque;
                    console.log(player1.sante);
                    break;
                case 'gun':
                    attaque === 50;
                player1.sante -= attaque;
                    console.log(player1.sante);
                    break;
                case 'mitraillette':
                    attaque === 100;
                    player1.sante -= attaque;
                    console.log(player1.sante);
                    break;
                case 'missile':
                    attaque === 150;
                    player1.sante -= attaque;
                    console.log(player1.sante);
                    break;
                case 'lance-rocket':
                    attaque === 200;
                    player1.sante -= attaque;
                    console.log(player1.sante);
                    break;
                }
            }
        }
        
   attaquer(Soldat) {
        soldat.sante -= this.attaque;
        console.log(this.pseudo + 'attaque ' + personnage.pseudo + 'en lançant sa lance (' + this.attaque + ' dégats)' );
        personnage.verifierSante();
    }*/
}
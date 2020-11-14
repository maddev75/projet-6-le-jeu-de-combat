class Soldat {
    constructor(pseudo, sante, attaque, defendre, niveau, position) {
        this.pseudo = pseudo;
        this.sante = sante;
        this.attaque = attaque;
        this.defendre = defendre;             
        this.niveau = 100;
        this.position = position;
        this.weapon = new Arme('pistolet', 20, 'img-jeux/pistolet.png');
    }
    
    get informations() {
        return this.pseudo + " (" + this.classe + ") a " + this.sante + " points de vie et est au niveau " + this.niveau + ".";
      }
    
    verifierSante() {
        if(this.sante <= 0) {
            this.sante == 0;
            console.log(this.pseudo + 'a perdu !');
        }
    }
    attaquer(personnage) {
        personnage.sante -= this.attaque;
        console.log(this.pseudo + 'attaque ' + personnage.pseudo + 'en lançant sa lance (' + this.attaque + ' dégats)' );
        personnage.verifierSante();
    }
}
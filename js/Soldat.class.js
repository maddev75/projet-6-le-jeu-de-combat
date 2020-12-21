class Soldat {
    constructor(pseudo, position) {
        this.pseudo = pseudo;
        this.sante = 450;
        this.defendre = false;             
        this.position = position;
        this.weapon = new Arme('pistolet', 20, 'img-jeux/pistolet.png');
    }
}

class Soldat {
    constructor(pseudo, position) {
        this.pseudo = pseudo;
        this.sante = 450;
        this.defendre = false;             
        this.position = position;
        this.weapon = new Arme('pistolet', 20, 'img-jeux/pistolet.png');
    }
    displayInfo(){
    let logoSante = $(`#${this.pseudo}-sante`).html(this.sante);
    let logoArme = $("#"+ this.pseudo +"-arme").html(this.weapon.name);
    let logoDegat = $(`#${this.pseudo}-degat`).html(this.weapon.damage);
    let logoImage = $('#avatar').attr(this.weapon.style);
   }
}

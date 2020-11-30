class Soldat {
    constructor(pseudo, position, sante) {
        this.pseudo = pseudo;
        this.sante = 450;
        this.defendre = false;             
        this.position = position;
        this.posture = 0;//0=attaq; 1=defense;
        this.cible = cible;
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
    attaquer(arme,player){
        let butonAttaq = document.querySelector('#attaque');
        butonAttaq.addEventListener('click', ()=>{
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
        defendre(){
            let butonDefense = document.querySelector('#défense');
            butonDefense.addEventListener('click', ()=>{
            this.sante = player.sante/2;
            console.log(sante);
        })
    }
}
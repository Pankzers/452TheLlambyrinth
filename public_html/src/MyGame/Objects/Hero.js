/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hero(image) {  
    this.image = image;
    this.mHero = new IllumRenderable(this.image,this.image);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(40, 40);
    this.mHero.getXform().setSize(9, 12);
    this.mHero.setElementPixelPositions(0,2049,0,2400);  
    GameObject.call(this, this.mHero);  
};
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.draw = function (referencedCam) {
    this.mHero.draw(referencedCam);
};

Hero.prototype.update = function (wallSet) {
        
    //Collisions
    for(var k = 0; k<wallSet.length; k++){
        var bb = wallSet[k].getBBox();            //Patrol boundingbox
        var hero = this.getBBox();
        if (hero.intersectsBound(bb)) {    //check if bounds collide 
            console.log("hi");
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        if(this.mHero.getXform().getYPos() <70){
            this.mHero.getXform().incYPosBy(5);
        }
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
         if(this.mHero.getXform().getYPos() >10){
            this.mHero.getXform().incYPosBy(-5);
        }
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        if(this.mHero.getXform().getXPos() <90){
            this.mHero.getXform().incXPosBy(5);
        }
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
         if(this.mHero.getXform().getXPos() >10){
            this.mHero.getXform().incXPosBy(-5);
        }
    }  
};

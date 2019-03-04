/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hero(image,mapW,mapH) {  
    this.image = image;
    this.mMapH = mapH;
    this.mMapW = mapW;
    this.mHero = new IllumRenderable(this.image,this.image);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(10, 10);
    this.mHero.getXform().setSize(4, 4);
    this.mHero.setElementPixelPositions(0,2049,0,2400);  
    GameObject.call(this, this.mHero);  
};
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.draw = function (referencedCam) {
    this.mHero.draw(referencedCam);
};

Hero.prototype.update = function (wallSet) {
        
    //Collisions
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if(this.mHero.getXform().getYPos() <this.mMapH-4){
            this.mHero.getXform().incYPosBy(0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,0)) {
                this.mHero.getXform().incYPosBy(-0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
         if(this.mHero.getXform().getYPos() >4){
            this.mHero.getXform().incYPosBy(-0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,2)) {
                this.mHero.getXform().incYPosBy(0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if(this.mHero.getXform().getXPos() <this.mMapW-4){
            this.mHero.getXform().incXPosBy(0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,1)) {
                this.mHero.getXform().incXPosBy(-0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
         if(this.mHero.getXform().getXPos() >4){
            this.mHero.getXform().incXPosBy(-0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,4)) {
                this.mHero.getXform().incXPosBy(0.4);
            }
        }
    }  
};

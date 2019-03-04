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
    //rigib body for physics 
    var r = new RigidRectangle(this.getXform(), 4, 4);
    this.setRigidBody(r);
    this.toggleDrawRigidShape();
  
};
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.draw = function (referencedCam) {
    this.mHero.draw(referencedCam);
};

Hero.prototype.update = function (wallSet,doorPairs) {
        
    //Collisions
    var doors = doorPairs.getDoors();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if(this.mHero.getXform().getYPos() <this.mMapH-4){
            var flag = false;
            this.mHero.getXform().incYPosBy(0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,0)) {
                flag = true;
            }
            for(var i = 0; i < doors.mSet.length; i++) {
                if(doors.mSet[i].visable) {
                    var dbb = doors.mSet[i].getBBox();
                    if(dbb.intersectsBound(bb)) {
                        flag = true;
                    }
                }
            }
            if(flag === true) {
                this.mHero.getXform().incYPosBy(-0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
         if(this.mHero.getXform().getYPos() >4){
            var flag = false;
            this.mHero.getXform().incYPosBy(-0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,2)) {
                flag = true;
            }
            for(var i = 0; i < doors.mSet.length; i++) {
                if(doors.mSet[i].visable) {
                    var dbb = doors.mSet[i].getBBox();
                    if(dbb.intersectsBound(bb)) {
                        flag = true;
                    }
                }
            }
            if(flag === true) {
                this.mHero.getXform().incYPosBy(0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if(this.mHero.getXform().getXPos() <this.mMapW-4){
            var flag = false;
            this.mHero.getXform().incXPosBy(0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,1)) {
                flag = true;
            }
            for(var i = 0; i < doors.mSet.length; i++) {
                if(doors.mSet[i].visable) {
                    var dbb = doors.mSet[i].getBBox();
                    if(dbb.intersectsBound(bb)) {
                        flag = true;
                    }
                }
            }
            if(flag === true) {
                this.mHero.getXform().incXPosBy(-0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
         if(this.mHero.getXform().getXPos() >4){
            var flag = false;
            this.mHero.getXform().incXPosBy(-0.4);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(bb,4)) {
                flag = true;
            }
            for(var i = 0; i < doors.mSet.length; i++) {
                if(doors.mSet[i].visable) {
                    var dbb = doors.mSet[i].getBBox();
                    if(dbb.intersectsBound(bb)) {
                        flag = true;
                    }
                }
            }
            if(flag === true) {
                this.mHero.getXform().incXPosBy(0.4);
            }
        }
    }  
    this.mHero.update();
};

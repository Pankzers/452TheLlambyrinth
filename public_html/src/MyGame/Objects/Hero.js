/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hero(image, normalMap ,mapW,mapH,x,y) {  
    this.image = image;
    this.normal = normalMap;
    this.mMapH = mapH;
    this.mMapW = mapW;
    this.mHero = new IllumRenderable(this.image,this.normal);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(x, y);
    this.mHero.getXform().setSize(4, 5);                       //changed size from 4 by 4   
    //2048x512, each image is 300x512
    this.mHero.setElementPixelPositions(600,300,0,512);       //default start position  
    GameObject.call(this, this.mHero);  
    //rigib body for physics 
    var r = new RigidRectangle(this.getXform(), 4, 4);
    this.setRigidBody(r);
    this.toggleDrawRigidShape();
    this.shaker = null;
    this.shaking = false; 
};
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.draw = function (referencedCam) {
    this.mHero.draw(referencedCam);
};

Hero.prototype.update = function (wallSet,doorPairs, lights) {
    var dirLight = lights.getLightAt(1);    //light points in direction 
    var lightPos = dirLight.getPosition(); 
    var lightDir = dirLight.getDirection();
    var heroLight = lights.getLightAt(2);   //light points to hero
    //Collisions
    var doors = doorPairs.getDoors();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if(this.mHero.getXform().getYPos() <this.mMapH-4){
            var flag = false;
            this.mHero.getXform().incYPosBy(0.4);
            //dirLight.setYPos(lightPos[1] + 0.4);
            lightDir[1] += 0.005;
            dirLight.setDirection(lightDir);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(this,bb,0)) {
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
            //    dirLight.setYPos(lightPos[1] - 0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
         if(this.mHero.getXform().getYPos() >4){
            var flag = false;
            this.mHero.getXform().incYPosBy(-0.4);
          //  dirLight.setYPos(lightPos[1] - 0.4);
            lightDir[1] -= 0.005;
            dirLight.setDirection(lightDir);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(this,bb,2)) {
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
          //      dirLight.setYPos(lightPos[1] + 0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.moveRight();
        if(this.mHero.getXform().getXPos() <this.mMapW-4){
            var flag = false;
            this.mHero.getXform().incXPosBy(0.4);
          //  dirLight.setXPos(lightPos[0] + 0.4);
            lightDir[0] += 0.005;
            dirLight.setDirection(lightDir);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(this,bb,1)) {
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
        //        dirLight.setXPos(lightPos[0] - 0.4);
            }
        }
    } 
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.moveLeft();
         if(this.mHero.getXform().getXPos() >4){
            var flag = false;
            this.mHero.getXform().incXPosBy(-0.4);
           // dirLight.setXPos(lightPos[0] - 0.4);
            lightDir[0] -= 0.005;
            dirLight.setDirection(lightDir);
            var bb = this.getBBox();
            if(wallSet.checkLocalBounds(this,bb,3)) {
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
            //    dirLight.setXPos(lightPos[0] + 0.4);
            }
        }
    }  
    dirLight.set2DPosition(this.mHero.getXform().getPosition());
    heroLight.set2DPosition(this.mHero.getXform().getPosition());
    this.mHero.update();
    this.shakeUpdate();
};

Hero.prototype.shake = function () {
    this.shaker = new ShakePosition(2,2, 5, 50);
    this.shaking = true;
};

Hero.prototype.shakeUpdate = function () {
    if (this.shaker !== null)
    {
        if(this.shaker.shakeDone()){        //if shaking is completed turn off shake boolean variable
            this.shaking = false;
        }
        else if(this.shaking === true) {     //if shaking is still occuring grab getShakeResults()
            var delta = this.shaker.getShakeResults();
            var pos = this.mHero.getXform().getPosition();
            this.mHero.getXform().setYPos(pos[1] + delta[1]);
        }
    }
};

//Change element positions in "llamas_move.png" to see llama move left or right
Hero.prototype.moveLeft = function () {
    this.mHero.setElementPixelPositions(600,300,0,512);       //default position  
};

//This flips the llama to face the right side when arrow key right is clicked
Hero.prototype.moveRight = function () {
    this.mHero.setElementPixelPositions(0,300,0,512);       //default position 
};
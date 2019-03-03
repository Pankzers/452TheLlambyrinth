/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, ParticleGameObject,ParticleSystem, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


//STILL TESTING 
function Sprite() {   
    //xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset
    this.kCycles = 300;
    this.kRate = 0.01;
    this.dis =10;   //starting distance 
    var xpos = 35;
    var ypos = 13;
    var width = 0.5;
    var yAcceleration = -2;
    var life = 8;
    var xVelocity = 5;
    var yVelocity = 5;
    var flicker = 5;
    var intensity = 10;
    var xAcceleration = -1;
    var size = 0.5;
    var offset = 1;
    var c2 = [0,0,3,0];
    var s = [.4,3.5,.3,.6];
    var finalcolor = [0.11764705882352941176470588235294,
        0.12941176470588235294117647058824,
        1,
        0];
    var multiper  = 1;
    this.mSprite = new ParticleSystem
    ("assets/ParticleSystem/particle.png" ,xpos ,ypos ,width ,yAcceleration ,life ,xVelocity
    ,yVelocity, flicker, intensity, xAcceleration, size, offset, finalcolor, c2, multiper);
    var pos = this.mSprite.getPos();
    this.mCenter = new InterpolateVec2([pos[0], pos[1]], this.kCycles, this.kRate);  
    var pos = this.mCenter.getValue();
    this.setPosition(pos[0], pos[1]);
    GameObject.call(this, this.mSprite);
    
}
gEngine.Core.inheritPrototype(Sprite,ParticleGameObject);


Sprite.prototype.update = function(hero, keys) {

    var pos = hero.getXform().getPosition();   //position of object
//    //up down left right 
//    if (keys[0] === true)
//        this.setParticleBelow(pos);
//    else if (keys[1]=== true)
//        this.setParticleAbove(pos);
//    else if (keys[2]=== true)
//        this.setParticleRight(pos);
//    else if (keys[3]=== true)
//        this.setParticleLeft(pos);
//    else
//        this.setPosition(pos[0]+1, pos[1]);
    
    //calculate distance from object and hero
    var Xdistance = Math.abs(pos[0]- this.getPosition()[0]);
    var Ydistance = Math.abs(pos[1]- this.getPosition()[1]);
   if (Xdistance < 10 || Ydistance < 10)
   {
       this.mSprite.setFinalColor([1,0,0,1]);       //change color when close to object
       this.mSprite.setStartColor([3.5,.4,.3,.6]);
       //Collision slows down the game too much
//         for (var i = 0; i < this.mSprite.getParticles().size(); i++)
//       {
//           var particle = this.mSprite.getParticles().getObjectAt(i);
//           var h = [];
//           if (lever.pixelTouches(particle, h))
//           {
//               console.log("Game Over");
//           }
//       }
   }
   else
   {
       this.mSprite.setFinalColor([.4,3.5,.3,.6]);
       this.mSprite.setStartColor([0,0,3,0]);
   }
   this.setPosition(pos[0], pos[1]);
   this.mCenter.updateInterpolation();
   this.mSprite.update();
};
//get the interpolation value 
Sprite.prototype.getParticle = function () {
    return this.mSprite.getParticles().getObjectAt(0);
};

//get the interpolation value 
Sprite.prototype.getPosition = function () {
    return this.mCenter.getValue();
};

//set the position for interpolation 
Sprite.prototype.setPosition = function (aX, aY) {
    var p = vec2.fromValues(aX, aY);
    this.mCenter.setFinalValue(p);
    var c = this.mCenter.getValue();
    this.mSprite.setPos(c[0], c[1]);
    };
    
//move particle below hero
Sprite.prototype.setParticleBelow = function(pos) {
    this.setPosition(pos[0], pos[1]-this.dis);
};
//move particle above hero
Sprite.prototype.setParticleAbove = function(pos) {
    this.setPosition(pos[0], pos[1]+this.dis);
};
//move particle to the left of hero
Sprite.prototype.setParticleLeft = function(pos) {
    this.setPosition(pos[0]-this.dis, pos[1]);
};
//move particle to the right of hero
Sprite.prototype.setParticleRight = function(pos) {
    this.setPosition(pos[0]+this.dis, pos[1]);
};

Sprite.prototype.draw = function(aCamera) {
    this.mSprite.draw(aCamera);
};

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


//STILL TESTING 
function Sprite() {
    //xPos, yPos, width, yAcceleration, life, xVelocity, yVelocity, flicker, intensity, xAcceleration, size, yOffset
    //start 50, 40
    var xpos = 35;
    var ypos = 13;
    var width = 3;
    var yAcceleration = 36;
    var life = 8;
    var xVelocity = 0;
    var yVelocity = 0;
    var flicker = 2;
    var intensity = 15;
    var xAcceleration = 0;
    var size = 2;
    var offset = 1;
    var color = [0.55686274509803921568627450980392, 0.15294117647058823529411764705882, 0.89019607843137254901960784313725, 1];
    var finalcolor = [0,0,0,0];
    var t = 1;
    this.mSprite = new ParticleSystem("assets/ParticleSystem/particle.png",35,13,3,6,8,0,0,2,10,0,2,1, color, finalcolor, t);

  
    GameObject.call(this, this.mSprite);
    
}
gEngine.Core.inheritPrototype(Sprite, GameObject);


Sprite.prototype.update = function() {
  gEngine.ParticleSystem.update(this.mSprite);
 
};

Sprite.prototype.draw = function(aCamera) {
    this.mSprite.draw(aCamera);
};



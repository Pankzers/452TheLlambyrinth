/* File: Lever.js 
 * 
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Lever(spriteTexture, NormalTexture, x, y, w, h,doorIndex) {
    
    this.mLever = new IllumRenderable(spriteTexture,NormalTexture);
    this.mLever.setColor([1, 1, 1, 0]);
    this.mLever.getXform().setPosition(x,y);
    this.mLever.getXform().setSize(w, h);
    this.mLever.setElementPixelPositions(256, 384, 256, 512);   
    this.posNoPull = [256, 384, 256, 512];
    this.posPull = [384, 512, 256, 512];
    this.mDoor = doorIndex;
    this.mState = 0;
    GameObject.call(this, this.mLever);   
}
gEngine.Core.inheritPrototype(Lever, GameObject);

//mimick pulling lever
Lever.prototype.set = function() {
    this.mLever.setElementPixelPositions(384, 512, 256, 512);
    this.mState = 1;
};

//mimick lever not pulled 
Lever.prototype.reset = function() {
    this.mLever.setElementPixelPositions(256, 384, 256, 512); 
    this.mState = 0;
};


Lever.prototype.update = function() {
};


Lever.prototype.draw = function(aCamera) {
    this.mLever.draw(aCamera);
};

//set lever to rotate 0 degrees 
Lever.prototype.setRot = function(num) {
    this.mLever.getXform().incRotationByDegree(num);
};
Lever.prototype.getDoorIndex = function() { return this.mDoor;};
Lever.prototype.getState = function() {return this.mState;};

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function PushButtonPhysics(spriteTexture,normalTexture, x, y, w, h,doorIndex) {
    
    this.mBase = new IllumRenderable(spriteTexture, normalTexture);
    this.mSpring = new IllumRenderable(spriteTexture, normalTexture);
    this.mHead = new IllumRenderable(spriteTexture, normalTexture);
    this.mBase.setColor([1, 1, 1, 0]);
    this.mBase.getXform().setPosition(x, y);
    this.mBase.getXform().setSize(w, h);
    this.mBase.setElementPixelPositions(0, 128, 384, 512);  
    this.posNoPush = [0, 128, 384, 512];
    this.posPush = [128, 256, 384, 512];
    this.mDoor = doorIndex;
    this.mState = 0;
    
    GameObject.call(this, this.mButton);
    
}
gEngine.Core.inheritPrototype(PushButtonPhysics, GameObject);

//mimick pushing button
PushButtonPhysics.prototype.set = function() {
    this.mState = 1;
    this.mButton.setElementPixelPositions(128, 256, 384, 512);  
};

//mimick button not pushed 
PushButtonPhysics.prototype.reset = function() {
    this.mButton.setElementPixelPositions(0, 128, 384, 512);  
    this.mState = 0;
};

//test pushing button when clicking 2 or 3 
PushButtonPhysics.prototype.update = function() {
 
};

PushButtonPhysics.prototype.draw = function(aCamera) {
    this.mButton.draw(aCamera);
};

//set lever to rotate 0 degrees 
PushButtonPhysics.prototype.setRot = function(rot) {
    this.mButton.getXform().incRotationByDegree(rot);
};
PushButtonPhysics.prototype.getDoorIndex = function() { return this.mDoor;};
PushButtonPhysics.prototype.getState = function() {return this.mState;};



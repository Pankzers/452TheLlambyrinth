
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function PushButton(spriteTexture, x, y, w, h) {
    
    this.mButton = new SpriteAnimateRenderable(spriteTexture, x, y, w,h);
    this.mButton.setColor([1, 1, 1, 0]);
    this.mButton.getXform().setPosition(x, y);
    this.mButton.getXform().setSize(w, h);
    this.mButton.setElementPixelPositions(0, 128, 384, 512);  
    this.posNoPush = [0, 128, 384, 512];
    this.posPush = [128, 256, 384, 512];
    
    GameObject.call(this, this.mButton);
    
}
gEngine.Core.inheritPrototype(PushButton, GameObject);

//mimick pushing button
PushButton.prototype.pushButtom = function() {

    this.mButton.setElementPixelPositions(128, 256, 384, 512);  
};

//mimick button not pushed 
PushButton.prototype.resetButton = function() {
    this.mButton.setElementPixelPositions(0, 128, 384, 512);  
};

//test pushing button when clicking 2 or 3 
PushButton.prototype.update = function() {
 
};

PushButton.prototype.draw = function(aCamera) {
    this.mButton.draw(aCamera);
};

//set lever to rotate 0 degrees 
PushButton.prototype.set0 = function() {
    this.mButton.getXform().incRotationByDegree(0);
};
//set lever to rotate 90 degrees 
PushButton.prototype.set90 = function() {
    this.mButton.getXform().incRotationByDegree(90);
};
//set lever to rotate 180 degrees 
PushButton.prototype.set180 = function() {
    this.mButton.getXform().incRotationByDegree(180);
};
//set lever to rotate 270 degrees 
PushButton.prototype.set270 = function() {
    this.mButton.getXform().incRotationByDegree(270);
};


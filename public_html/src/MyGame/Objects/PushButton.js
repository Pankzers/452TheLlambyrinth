
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function PushButton(spriteTexture) {
    
    this.mButton = new SpriteAnimateRenderable(spriteTexture);
    this.mButton.setColor([1, 1, 1, 0]);
    this.mButton.getXform().setPosition(70, 45);
    this.mButton.getXform().setSize(8, 8);
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
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.pushButtom()();
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.resetButton()();
    } 
 
};

PushButton.prototype.draw = function(aCamera) {
    this.mButton.draw(aCamera);
};



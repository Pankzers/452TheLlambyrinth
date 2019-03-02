/* File: Lever.js 
 *
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Lever(spriteTexture) {
    
    this.mLever = new SpriteAnimateRenderable(spriteTexture);
    this.mLever.setColor([1, 1, 1, 0]);
    this.mLever.getXform().setPosition(50, 40);
    this.mLever.getXform().setSize(9, 12);
    this.mLever.setElementPixelPositions(256, 384, 256, 512);   
    this.posNoPull = [256, 384, 256, 512];
    this.posPull = [384, 512, 256, 512];
  
    GameObject.call(this, this.mLever);   
}
gEngine.Core.inheritPrototype(Lever, GameObject);

//mimick pulling lever
Lever.prototype.pullLever = function() {
    this.mLever.setElementPixelPositions(384, 512, 256, 512); 
};

//mimick lever not pulled 
Lever.prototype.resetLever = function() {
    this.mLever.setElementPixelPositions(256, 384, 256, 512); 
};

//test lever when pressing 0 and 1
Lever.prototype.update = function(cam) {//    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.pullLever();
        cam.shake(-2, -2, 20, 30);
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.resetLever();
    } 
 
};


Lever.prototype.draw = function(aCamera) {
    this.mLever.draw(aCamera);
};



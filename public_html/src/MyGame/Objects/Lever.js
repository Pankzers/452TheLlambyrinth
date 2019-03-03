/* File: Lever.js 
 *
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Lever(spriteTexture, x, y, w, h) {
    
    this.mLever = new SpriteAnimateRenderable(spriteTexture);
    this.mLever.setColor([1, 1, 1, 0]);
    this.mLever.getXform().setPosition(x,y);
    this.mLever.getXform().setSize(w, h);
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
Lever.prototype.update = function(cam) {  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.pullLever();
        cam.shake(-2, -2, 20, 30);
    } 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.resetLever();
    } 
    //used to test interpolation
//    var key = [false, false, false, false];
//    var t= this.mLever.getXform().getPosition();
//        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
//        this.mLever.getXform().setPosition(t[0], t[1]+1);
//        key[0] =true;
//    } 
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
//        this.mLever.getXform().setPosition(t[0], t[1]-1);
//        key[1] =true;
//    } 
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
//        this.mLever.getXform().setPosition(t[0]-1, t[1]);
//        key[2] =true;
//    } 
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
//        this.mLever.getXform().setPosition(t[0]+1, t[1]);
//        key[3] =true;
//    } 
//    return key;
};


Lever.prototype.draw = function(aCamera) {
    this.mLever.draw(aCamera);
};

//set lever to rotate 0 degrees 
Lever.prototype.set0 = function() {
    this.mLever.getXform().incRotationByDegree(0);
};
//set lever to rotate 90 degrees 
Lever.prototype.set90 = function() {
    this.mLever.getXform().incRotationByDegree(90);
};
//set lever to rotate 180 degrees 
Lever.prototype.set180 = function() {
    this.mLever.getXform().incRotationByDegree(180);
};
//set lever to rotate 270 degrees 
Lever.prototype.set270 = function() {
    this.mLever.getXform().incRotationByDegree(270);
};
/* File: Exit.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
//+128 px
function Exit(spriteTexture) {
    
    this.mExit = new SpriteAnimateRenderable(spriteTexture);
    this.mExit.setColor([1, 1, 1, 0]);
    this.mExit.getXform().setPosition(10, 70);
    this.mExit.getXform().setSize(10, 10);
    this.mExit.setElementPixelPositions(0, 256, 128, 380);   //move to  (384, 512, 256, 512)
    this.posNoPull = [256, 384, 256, 512];
    this.posPull = [384, 512, 256, 512];
  
    GameObject.call(this, this.mExit);   
}
gEngine.Core.inheritPrototype(Exit, GameObject);


Exit.prototype.update = function() {
    //check collision with hero, if collide end game 
 
};


Exit.prototype.draw = function(aCamera) {
    this.mExit.draw(aCamera);
};


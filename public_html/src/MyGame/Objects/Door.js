
/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable, vec2,NonPhysicsGameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Door(spriteTexture, x, y, w, h) {
    var tempDoor = new TextureRenderable(spriteTexture);
    var xf = tempDoor.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    var tempObject = new GameObject(tempDoor);
    var rigid = new RigidRectangle(xf, w, h);
    //g.toggleDrawRigidShape();
    //r.toggleDrawBound();
    rigid.setRestitution(47*.75);
    rigid.setFriction(0.01);
    rigid.setMass(0);
    tempObject.setRigidBody(rigid);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(0);
    this.mDoor = tempObject;
   
    GameObject.call(this, this.door);  
}
gEngine.Core.inheritPrototype(Door, GameObject);

//test pushing button when clicking 2 or 3 
Door.prototype.update = function(hero) {
    //gEngine.Physics.processCollision(temp,h);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
        this.mDoor.setVisibility(false);
    }     
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)) {
        this.mDoor.setVisibility(true);
    } 
    this.mDoor.update();
};
 

Door.prototype.draw = function(aCamera) {
    this.mDoor.draw(aCamera);
};




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
    tempObject.setRigidBody(rigid);
    //tempObject.toggleDrawRigidShape();
    //r.toggleDrawBound();
    rigid.setMass(0);
    xf.setRotationInDegree(0);
    this.mDoor = tempObject;
    this.visable = true; 
      
    GameObject.call(this, this.mDoor);  
}
gEngine.Core.inheritPrototype(Door, GameObject);

//test pushing button when clicking 2 or 3 
Door.prototype.update = function() {
    //gEngine.Physics.processCollision(temp,h);
    if (!this.visable) {
        this.mDoor.setVisibility(false);
    }  
    
    this.mDoor.update();
};
 Door.prototype.setVisable = function(vis) {
    this.visable = vis;
};

Door.prototype.draw = function(aCamera) {
    this.mDoor.draw(aCamera);
};
Door.prototype.setRot = function(rot) {
    this.mDoor.getXform().setRotationInDegree(rot);
};
Door.prototype.getBBox = function() {
    var b = null;
    var xform = this.getXform();
    if (xform.getRotationInDegree() / 90 === 1 || xform.getRotationInDegree() / 90 === -1) {
        b = new BoundingBox(xform.getPosition(), xform.getHeight(), xform.getWidth());
    } else {
        b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    }
    return b;
}



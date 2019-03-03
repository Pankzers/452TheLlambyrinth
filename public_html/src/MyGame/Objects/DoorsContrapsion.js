/* File: DoorContrapsion.js 
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
function DoorsContrapsion(buttonTexture, doorTexture) {
    this.mDoors = new DoorSet(doorTexture);
    this.mButtons = new PushButtonSet(buttonTexture);
    this.addPair(30, 20, 1, 5, 70, 45, 5, 5);
    
}

DoorsContrapsion.prototype.update = function(hero) {
    this.mDoors.update(hero);
    this.mButtons.update(hero);  
    //verify with hero
//    for (var i = 0; i < this.mDoors.size(); i++)
//    {
//        var door = this.mDoors.getObjectAt(i);
//        var button = this.mButtons.getObjectAt(i);
//        if (hero.pixelTouches(button, []) && gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))  
//        {
//            button.pushButton();
//            door.setVisibility(false);  //remove door 
//        }
//    }
};


DoorsContrapsion.prototype.draw = function(aCamera) {
    this.mDoors.draw(aCamera);
    this.mButtons.draw(aCamera);
};

DoorsContrapsion.prototype.addPair = function(dX, dY, dW, dH, bX, bY, bW, bH) {
    this.mDoors.createDoor(dX, dY, dW, dH);
    this.mButtons.createButton(bX, bY, bW, bH);
};


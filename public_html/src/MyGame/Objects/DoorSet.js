/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DoorSet(spriteTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture;
    
   // this.createDoor(30,20, 2, 10);
   GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(DoorSet, GameObjectSet);

//update set
DoorSet.prototype.update = function (hero) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update(hero);

};

//draw set
DoorSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).draw(aCamera);

};

//draw set
DoorSet.prototype.createDoor = function ( x,y,w,h) {
    var tempDoor = new Door(this.kSprite, x, y, w, h);
    this.addToSet(tempDoor);
};


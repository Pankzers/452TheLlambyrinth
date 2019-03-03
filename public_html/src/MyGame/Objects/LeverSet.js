/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LeverSet(spriteTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture;
    this.createLever(50, 40, 5, 8);
   GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(LeverSet, GameObjectSet);

//update set
LeverSet.prototype.update = function (hero) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update(hero);

};

//draw set
LeverSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).draw(aCamera);

};

//draw set
LeverSet.prototype.createLever = function ( x,y,w,h) {
    var tempLever = new Lever(this.kSprite, x, y, w, h);
    this.addToSet(tempLever);
};


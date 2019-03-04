/* File: DoorSet.js 
 *
 * Support for working with a set of GameObjects
 */

/*jslint node: true, vars: true */
/*global GameObject, GameObjectSet, gEngine */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PushButtonSet(spriteTexture) {
    this.mSet = [];
    this.kSprite = spriteTexture;
   // this.createButton(70, 45, 8,8);
   //GameObject.call(this, this.mSet);
}
gEngine.Core.inheritPrototype(PushButtonSet, GameObjectSet);

//update set
PushButtonSet.prototype.update = function (hero) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).update(hero);

};

//draw set
PushButtonSet.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.size(); i++)
        this.getObjectAt(i).draw(aCamera);

};

//draw set
PushButtonSet.prototype.createButton = function ( x,y,w,h) {
    var tempButton = new PushButton(this.kSprite, x, y, w, h);
    this.addToSet(tempButton);
};
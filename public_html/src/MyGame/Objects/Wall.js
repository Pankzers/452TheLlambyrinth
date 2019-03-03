/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, GameObject, LightRenderable, SpriteAnimateRenderable,IllumRenderable, vec2,NonPhysicsGameObject */

function Wall(x,y,wallSprite,wallNormal) {
    
    this.mWall = new SpriteAnimateRenderable(wallSprite,wallNormal);
    this.mWall.setColor([1, 1, 1, 0]);
    this.mWall.getXform().setPosition(x, y);
    this.mWall.getXform().setSize(10, 10);
    this.mWall.setElementPixelPositions(0, 512, 0, 512);   
    console.log(this);
    GameObject.call(this, this.mWall);   
}
gEngine.Core.inheritPrototype(Wall, GameObject);


Wall.prototype.draw = function(aCamera) {
    this.mWall.draw(aCamera);
};
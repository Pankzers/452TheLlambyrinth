/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, GameObject: false, GameObjectSet: false, Patrol: false, 
 * TextureObject: false, Minion: false, SpriteRenderable: false, vec2: false */

function WallSet(wallSprite,wallNormal) {
    
    this.mSet = [];
    this.mWallSprite = wallSprite;
    this.mWallNormal = wallNormal;
   
    GameObjectSet.call(this, this.mSet);
};

gEngine.Core.inheritPrototype(WallSet, GameObjectSet);


WallSet.prototype.addWall = function (x,y,orientation) {
   var wall = new Wall(x,y,this.mWallSprite,this.mWallNormal,orientation);  
   this.addToSet(wall);
};

WallSet.prototype.draw = function (referencedCam) {
    for(var i = 0; i<this.mSet.length; i++){
        this.mSet[i].draw(referencedCam);
    }
};
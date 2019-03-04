/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, GameObject: false, GameObjectSet: false, Patrol: false, 
 * TextureObject: false, Minion: false, SpriteRenderable: false, vec2: false */

function WallSet(wallSprite,wallNormal,wallXNum,wallYNum,wallGrid) {
    
    this.mSet = [];
    this.mWallSprite = wallSprite;
    this.mWallNormal = wallNormal;
    
    this.mXNum = wallXNum;
    this.mYNum = wallYNum;
    
    this.mGrid = wallGrid;
   
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

WallSet.prototype.checkLocalBounds = function (bound, direction) {
    if(this.mGrid) {
        //Do Stuff.
    } else {
        for(var k = 0; k<this.mSet.length; k++){
            for(var i = 0; i<this.mSet[k].mBBoxes.length; i++) {
                if (this.mSet[k].mBBoxes[i].intersectsBound(bound)) {
                    return true;
                }
            }
        }
    }
};
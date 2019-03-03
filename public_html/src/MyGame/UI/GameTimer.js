/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, GameObject*/
"use strict";
function GameTimer(startTime) {
    this.mCurrentTime = startTime;
    var sec = Math.floor(this.mCurrentTime/1000-Math.floor(this.mCurrentTime/60000)*60);
    var min = Math.floor(sec/60);
    var string = min+":"+sec;
    this.mUIText = new UIText(string,[700,400],3,0,0,[0,0,0,1]);
    
}

GameTimer.prototype.update = function() {
    var elapsedTime = gEngine.GameLoop.getElapsedTime();
    this.mCurrentTime -= elapsedTime;
    var sec = Math.floor(this.mCurrentTime/1000-Math.floor(this.mCurrentTime/60000)*60);
    var min = Math.floor(this.mCurrentTime/60000);
     var string = min+":"+sec;
    this.mUIText.setText(string);
    
};
GameTimer.prototype.draw = function(aCamera) {
    this.mUIText.draw(aCamera);
};

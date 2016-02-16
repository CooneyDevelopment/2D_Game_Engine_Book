"use strict";

var GameEngine = GameEngine || {};

GameEngine.Loop = (function(){

    var _IsRunning = false;
    var _FPS = 60; //Frames per Second
    var _MPF = 1000 / _FPS; //Milliseconds per Frame

    var _PreviousTime;
    var _LagTime;
    var _CurrentTime;
    var _ElapsedTime;

    var _Game = null;

    var _Run = function(){
        if(_IsRunning){
            //setup for next call to _Run and update input
            requestAnimationFrame(function(){ _Run.call(_Game); });

            //compute elapsed time since last _Run was executed
            _CurrentTime = Date.now();
            _ElapsedTime = _CurrentTime - _PreviousTime;
            _PreviousTime = _CurrentTime;
            _LagTime += _ElapsedTime;

            //update the game the appropriate number of times
            while(_LagTime >= _MPF && _IsRunning){
                this.Update();
                _LagTime -= _MPF;
            }

            //draw
            this.Draw();
        }
    };

    var _Start = function(game){
        _Game = game;
        _PreviousTime = Date.now();
        _LagTime = 0.0;
        _IsRunning = true;
        requestAnimationFrame(function(){ _Run().call(_Game); });
    };

    return {
        Start: _Start
    };
}());
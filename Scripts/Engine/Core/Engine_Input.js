"use strict";

var GameEngine = GameEngine || {};

GameEngine.Input = (function(){

    var _Keys = {
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Space: 32,
        Zero: 48,
        One: 49,
        Two: 50,
        Thee: 51,
        Four: 52,
        Five: 53,
        Six: 54,
        Seven: 55,
        Eight: 56,
        Nine: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        LastKey: 222
    };

    var _PreviousKeyState = [];
    var _IsKeyPressed = [];
    var _IsKeyClicked = [];

    var _OnKeyDown = function(event){ _IsKeyPressed[event.keyCode] = true; };
    var _OnKeyUp = function(event){ _IsKeyPressed[event.keyCode] = false; };

    var _Initialize = function(){
        for(var index = 0; index < _Keys.LastKey; index++){
            _PreviousKeyState[index] = false;
            _IsKeyPressed[index] = false;
            _IsKeyClicked[index] = false;
        }
        window.addEventListener("keyup", _OnKeyUp);
        window.addEventListener("keydown", _OnKeyDown);
    };

    var _Update = function(){
        for(var index = 0; index < _Keys.LastKey; index++){
            _IsKeyClicked[index] = (!_PreviousKeyState[index]) && _IsKeyPressed[index];
            _PreviousKeyState[index] = _IsKeyPressed[index];
        }
    };

    var _IsKeyPressedGet = function(code){ return _IsKeyPressed[code]; };
    var _IsKeyClickedGet = function(code){ return _IsKeyClicked[code]; };

    return {
        Initialize: _Initialize,
        Update: _Update,
        IsKeyPressed: _IsKeyPressedGet,
        IsKeyClicked: _IsKeyClickedGet,
        Keys: _Keys
    };
}());
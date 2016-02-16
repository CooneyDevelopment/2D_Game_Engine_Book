"use strict";

var GameEngine = GameEngine || {};

GameEngine.Core = (function(){

    var _GL = null;

    var _GetGL = function(){ return _GL; };

    var _InitializeWebGL = function(canvasId){
        var canvas = document.getElementById(canvasId);
        _GL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if(_GL === null){
            document.write("<br/><b>WebGL is not supported!</b>");
        }
    };

    var _InitializeEngineCore = function(canvasId, game){
        _InitializeWebGL(canvasId);
        GameEngine.VertexBuffer.Initialize();
        GameEngine.Input.Initialize();
        GameEngine.DefaultResources.Initialize(function(){ _StartScene(game) });
    };

    var _StartScene = function(game){
        game.Initialize.call(game);
        GameEngine.Loop.Start(game);
    };

    var _ClearCanvas = function(color){
        _GL.clearColor(color[0], color[1], color[2], color[3]);
        _GL.clear(_GL.COLOR_BUFFER_BIT);
    };

    return {
        GetGL: _GetGL,
        InitializeEngine: _InitializeEngineCore,
        ClearCanvas: _ClearCanvas
    };

}());
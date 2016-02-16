"use strict";

var GameEngine = GameEngine || {};

GameEngine.DefaultResources = (function(){
    var _SimpleVertexShader = "Scripts/GLSLShaders/SimpleVertexShader.glsl";
    var _SimpleFragmentShader = "Scripts/GLSLShaders/SimpleFragmentShader.glsl";
    var _ConstantColorShader = null;
    var _GetConstantColorShader = function(){ return _ConstantColorShader; };

    var _CreateShaders = function(callback){
        _ConstantColorShader = new SimpleShader(_SimpleVertexShader, _SimpleFragmentShader);
        callback();
    };

    var _Initialize = function(callback){
        GameEngine.TextFileLoader.LoadTextFile(_SimpleVertexShader, GameEngine.TextFileLoader.TextFileType.TextFile);
        GameEngine.TextFileLoader.LoadTextFile(_SimpleFragmentShader, GameEngine.TextFileLoader.TextFileType.TextFile);
        GameEngine.ResourceMap.SetLoadCompleteCallback(function(){ _CreateShaders(callback); });
    };

    return{
        Initialize: _Initialize,
        GetConstantColorShader: _GetConstantColorShader
    };
}());
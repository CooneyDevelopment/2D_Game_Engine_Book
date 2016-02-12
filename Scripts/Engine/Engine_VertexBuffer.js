"use strict";

var GameEngine = GameEngine || {};

GameEngine.VertexBuffer = (function(){

    var _VerticesOfSquare = [
        0.5,  0.5,  0.0,
        -0.5,  0.5,  0.0,
        0.5, -0.5,  0.0,
        -0.5, -0.5,  0.0
    ];

    var _SquareVertexBuffer = null;

    var _GetGLVertexReference = function(){ return _SquareVertexBuffer; };

    var _InitializeVertexBuffer = function(){
        var _GL = GameEngine.Core.GetGL();
        _SquareVertexBuffer = _GL.createBuffer();
        _GL.bindBuffer(_GL.ARRAY_BUFFER, _SquareVertexBuffer);
        _GL.bufferData(_GL.ARRAY_BUFFER, new Float32Array(_VerticesOfSquare), _GL.STATIC_DRAW);
    };

    return {
        Initialize: _InitializeVertexBuffer,
        GetReference: _GetGLVertexReference
    };

}());
"use strict";

function Game(canvasId){
    GameEngine.Core.Initialize(canvasId);
    this.ConstantColorShader = new SimpleShader(
        "Scripts/GLSLShaders/SimpleVertexShader.glsl",
        "Scripts/GLSLShaders/SimpleFragmentShader.glsl");

    this.WhiteSquare = new Renderable(this.ConstantColorShader);
    this.WhiteSquare.SetColor([1.0, 1.0, 1.0, 1.0]);

    this.RedSquare = new Renderable(this.ConstantColorShader);
    this.RedSquare.SetColor([1.0, 0.0, 0.0, 1.0]);

    GameEngine.Core.ClearCanvas([0.0, 0.8, 0.0, 1.0]);
    var _transform = mat4.create();

    mat4.translate(_transform, _transform, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(_transform, _transform, 0.2);
    mat4.scale(_transform, _transform, vec3.fromValues(1.2, 1.2, 1.0));
    this.WhiteSquare.Draw(_transform);

    mat4.identity(_transform);
    mat4.translate(_transform, _transform, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(_transform, _transform, -0.8);
    mat4.scale(_transform, _transform, vec3.fromValues(0.4, 0.4, 1.0));
    this.RedSquare.Draw(_transform);
}
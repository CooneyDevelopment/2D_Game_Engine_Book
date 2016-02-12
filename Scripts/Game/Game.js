"use strict";

function Game(canvasId){
    GameEngine.Core.Initialize(canvasId);
    var _GL = GameEngine.Core.GetGL();

    this.ConstantColorShader = new SimpleShader(
        "Scripts/GLSLShaders/SimpleVertexShader.glsl",
        "Scripts/GLSLShaders/SimpleFragmentShader.glsl");

    GameEngine.Core.ClearCanvas([0.9, 0.9, 0.9, 1.0]); //clear entire canvas to off-white color
    _GL.viewport(20, 40, 600, 300); //600x300 pixel area, bottom left is (20,40) offset
    _GL.scissor(20, 40, 600, 300);
    _GL.enable(_GL.SCISSOR_TEST);
    GameEngine.Core.ClearCanvas([0.8, 0.8, 0.8, 1.0]); //clear viewport area to slighty darker color

    var viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,
        vec3.fromValues(20, 60, 10),
        vec3.fromValues(20, 60, 0),
        vec3.fromValues(0, 1, 0));

    var projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -10, 10, -5, 5, 0, 1000);

    var viewProjectionMatrix = mat4.create();
    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);


    var _Grey      = [0.10, 0.10, 0.10, 1.00];
    var _Red       = [0.90, 0.10, 0.10, 1.00];
    var _Green     = [0.10, 0.90, 0.10, 1.00];
    var _Blue      = [0.10, 0.10, 0.90, 1.00];
    var _Pink  = [0.90, 0.10, 0.90, 1.00];
    var _Yellow   = [0.90, 0.90, 0.10, 1.00];

    this.PinkSquare = new Renderable(this.ConstantColorShader);
    this.PinkSquare.SetColor(_Pink);
    this.PinkSquare.GetTransform().SetPosition(20, 60);
    this.PinkSquare.GetTransform().SetRotationInRadians(0.2);
    this.PinkSquare.GetTransform().SetScale(5, 5);
    this.PinkSquare.Draw(viewProjectionMatrix);

    this.YellowSquare = new Renderable(this.ConstantColorShader);
    this.YellowSquare.SetColor(_Yellow);
    this.YellowSquare.GetTransform().SetPosition(20, 60);
    this.YellowSquare.GetTransform().SetScale(2, 2);
    this.YellowSquare.Draw(viewProjectionMatrix);

    this.TopLeftSquare = new Renderable(this.ConstantColorShader);
    this.TopLeftSquare.SetColor(_Red);
    this.TopLeftSquare.GetTransform().SetPosition(10, 65);
    this.TopLeftSquare.Draw(viewProjectionMatrix);

    this.TopRightSquare = new Renderable(this.ConstantColorShader);
    this.TopRightSquare.SetColor(_Green);
    this.TopRightSquare.GetTransform().SetPosition(30, 65);
    this.TopRightSquare.Draw(viewProjectionMatrix);

    this.BottomLeftSquare = new Renderable(this.ConstantColorShader);
    this.BottomLeftSquare.SetColor(_Grey);
    this.BottomLeftSquare.GetTransform().SetPosition(10, 55);
    this.BottomLeftSquare.Draw(viewProjectionMatrix);

    this.BottomRightSquare = new Renderable(this.ConstantColorShader);
    this.BottomRightSquare.SetColor(_Blue);
    this.BottomRightSquare.GetTransform().SetPosition(30, 55);
    this.BottomRightSquare.Draw(viewProjectionMatrix);
}
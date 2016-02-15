"use strict";

function Game(canvasId){
    GameEngine.Core.Initialize(canvasId);

    this.Camera = new Camera(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );

    this.ConstantColorShader = new SimpleShader(
        "Scripts/GLSLShaders/SimpleVertexShader.glsl",
        "Scripts/GLSLShaders/SimpleFragmentShader.glsl");

    GameEngine.Core.ClearCanvas([0.9, 0.9, 0.9, 1.0]); //clear entire canvas to off-white color
    this.Camera.SetupViewProjection();
    var viewProjectionMatrix = this.Camera.GetViewProjectionMatrix();

    var _Grey      = [0.10, 0.10, 0.10, 1.00];
    var _Red       = [0.90, 0.10, 0.10, 1.00];
    var _Green     = [0.10, 0.90, 0.10, 1.00];
    var _Blue      = [0.10, 0.10, 0.90, 1.00];
    var _Pink      = [0.90, 0.10, 0.90, 1.00];
    var _Yellow    = [0.90, 0.90, 0.10, 1.00];

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
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

    this.WhiteSquare.GetTransform().SetPosition(-0.25, 0.25);
    this.WhiteSquare.GetTransform().SetScale(1.2, 1.2);
    this.WhiteSquare.GetTransform().SetRotationInRadians(0.2);
    this.WhiteSquare.Draw();

    this.RedSquare.GetTransform().SetPosition(0.25, -0.25);
    this.RedSquare.GetTransform().SetScale(0.4, 0.4);
    this.RedSquare.GetTransform().SetRotationInRadians(-0.8);
    this.RedSquare.Draw();
}
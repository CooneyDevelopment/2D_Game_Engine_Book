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

    this.WhiteSquare = new Renderable(this.ConstantColorShader);
    this.WhiteSquare.SetColor([1.0, 1.0, 1.0, 1.0]);
    this.WhiteSquare.GetTransform().SetPosition(20, 60);
    this.WhiteSquare.GetTransform().SetRotationInRadians(0.2);
    this.WhiteSquare.GetTransform().SetScale(5, 5);

    this.RedSquare = new Renderable(this.ConstantColorShader);
    this.RedSquare.SetColor([1.0, 0.0, 0.0, 1.0]);
    this.RedSquare.GetTransform().SetPosition(20, 60);
    this.RedSquare.GetTransform().SetScale(2, 2);

    GameEngine.Loop.Start(this);
}

Game.prototype.Update = function(){
    //simply move white square and pulse red square

    var _WhiteTransform = this.WhiteSquare.GetTransform();
    if(_WhiteTransform.GetXPosition() > 30) _WhiteTransform.SetPosition(10, 60);
    var newX = _WhiteTransform.GetXPosition() + 0.05;
    _WhiteTransform.SetXPosition(newX);
    var newRotation = _WhiteTransform.GetRotation() + 0.01;
    _WhiteTransform.SetRotationInRadians(newRotation);

    var _RedTransform = this.RedSquare.GetTransform();
    if(_RedTransform.GetWidth() > 5) _RedTransform.SetScale(2, 2);
    var newScale = _RedTransform.GetWidth() + 0.05;
    _RedTransform.SetScale(newScale, newScale);
};

Game.prototype.Draw = function(){
    GameEngine.Core.ClearCanvas([0.9, 0.9, 0.9, 1.0]); //clear to off white
    this.Camera.SetupViewProjection();
    this.WhiteSquare.Draw(this.Camera.GetViewProjectionMatrix());
    this.RedSquare.Draw(this.Camera.GetViewProjectionMatrix());
};
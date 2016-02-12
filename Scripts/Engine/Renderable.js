"use strict";

function Renderable(shader){
    this.Shader = shader;
    this.Color = [1.0, 1.0, 1.0, 1.0];
}

Renderable.prototype.Draw = function(modelTransform){
    var _GL = GameEngine.Core.GetGL();
    this.Shader.ActivateShader(this.Color);
    this.Shader.LoadObjectTransform(modelTransform);
    _GL.drawArrays(_GL.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.SetColor = function(color){ this.Color = color; };
Renderable.prototype.GetColor = function(){ return this.Color; };
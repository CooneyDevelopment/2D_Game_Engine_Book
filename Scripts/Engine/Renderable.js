"use strict";

function Renderable(shader){
    this.Shader = shader;
    this.Color = [1.0, 1.0, 1.0, 1.0];
    this.Transform = new Transform();
}

Renderable.prototype.Draw = function(vpMatrix){
    var _GL = GameEngine.Core.GetGL();
    this.Shader.ActivateShader(this.Color, vpMatrix);
    this.Shader.LoadObjectTransform(this.Transform.GetTransform());
    _GL.drawArrays(_GL.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.SetColor = function(color){ this.Color = color; };
Renderable.prototype.GetColor = function(){ return this.Color; };

Renderable.prototype.GetTransform = function(){ return this.Transform; };
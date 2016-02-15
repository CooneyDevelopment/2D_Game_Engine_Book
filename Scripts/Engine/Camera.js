"use strict";

function Camera(center, width, viewport){
    this.Center = center;
    this.Width = width;
    this.Viewport = viewport;
    this.NearPlane = 0;
    this.FarPlane = 1000;
    this.ViewMatrix = mat4.create();
    this.ProjectionMatrix = mat4.create();
    this.ViewProjectionMatrix = mat4.create();
    this.BackgroundColor = [0.8, 0.8, 0.8, 1.0];
}

Camera.prototype.SetCenter = function(x, y){ this.Center[0] = x; this.Center[1] = y; };
Camera.prototype.GetCenter = function(){ return this.Center; };

Camera.prototype.SetWidth = function(width){ this.Width = width; };
Camera.prototype.GetWidth = function(){ return this.Width; };

Camera.prototype.SetViewport = function(viewport){ this.Viewport = viewport; };
Camera.prototype.GetViewport = function(){ return this.Viewport; };

Camera.prototype.SetBackgroundColor = function(color){ this.BackgroundColor = color; };
Camera.prototype.GetBackgroundColor = function(){ return this.BackgroundColor; };

Camera.prototype.GetViewProjectionMatrix = function(){ return this.ViewProjectionMatrix; };

Camera.prototype.SetupViewProjection = function(){
    var _GL = GameEngine.Core.GetGL();
    _GL.viewport(this.Viewport[0], this.Viewport[1], this.Viewport[2], this.Viewport[3]);
    _GL.scissor(this.Viewport[0], this.Viewport[1], this.Viewport[2], this.Viewport[3]);
    _GL.clearColor(this.BackgroundColor[0], this.BackgroundColor[1], this.BackgroundColor[2], this.BackgroundColor[3]);
    _GL.enable(_GL.SCISSOR_TEST);
    _GL.clear(_GL.COLOR_BUFFER_BIT);
    _GL.disable(_GL.SCISSOR_TEST);

    mat4.lookAt(this.ViewMatrix,
        vec3.fromValues(this.Center[0], this.Center[1], 10),
        vec3.fromValues(this.Center[0], this.Center[1], 0),
        vec3.fromValues(0, 1, 0));
    var halfWidth = 0.5 * this.Width;
    var halfHeight = halfWidth * this.Viewport[3] / this.Viewport[2];
    mat4.ortho(this.ProjectionMatrix,
        -halfWidth,
        halfWidth,
        -halfHeight,
        halfHeight,
        this.NearPlane,
        this.FarPlane);
    mat4.multiply(this.ViewProjectionMatrix, this.ProjectionMatrix, this.ViewMatrix);
};
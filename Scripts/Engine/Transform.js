"use strict";

function Transform(){
    this.Position = vec2.fromValues(0.0, 0.0);
    this.Scale = vec2.fromValues(1.0, 1.0);
    this.Rotation = 0.0; //Radians
}

Transform.prototype.SetPosition = function(x, y){ this.SetXPosition(x); this.SetYPosition(y); };
Transform.prototype.GetPosition = function(){ return this.Position; };
Transform.prototype.SetXPosition = function(x) { this.Position[0] = x; };
Transform.prototype.GetXPosition = function(){ return this.Position[0]; };
Transform.prototype.SetYPosition = function(x) { this.Position[1] = x; };
Transform.prototype.GetYPosition = function(){ return this.Position[1]; };

Transform.prototype.SetScale = function(width, height){ this.SetWidth(width); this.SetHeight(height); };
Transform.prototype.GetScale = function(){ return this.Scale; };
Transform.prototype.SetWidth = function(width) { this.Scale[0] = width; };
Transform.prototype.GetWidth = function(){ return this.Scale[0]; };
Transform.prototype.SetHeight = function(height) { this.Scale[1] = height; };
Transform.prototype.GetHeight = function(){ return this.Scale[1]; };

Transform.prototype.SetRotationInRadians = function(rotation){
    var fullCircle = (2 * Math.PI);
    this.Rotation = rotation;
    while(this.Rotation > fullCircle){
        this.Rotation -= fullCircle;
    }
};
Transform.prototype.SetRotationInDegrees = function(rotation){ this.SetRotationInRadians(rotation * Math.PI / 180.0); };
Transform.prototype.GetRotation = function(){ return this.Rotation; };

Transform.prototype.GetTransform = function(){
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, vec3.fromValues(this.GetXPosition(), this.GetYPosition(), 0.0));
    mat4.rotateZ(matrix, matrix, this.GetRotation());
    mat4.scale(matrix, matrix, vec3.fromValues(this.GetWidth(), this.GetHeight(), 1.0));
    return matrix;
};
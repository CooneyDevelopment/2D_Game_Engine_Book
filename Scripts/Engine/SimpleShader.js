"use strict";

function SimpleShader(vertexShaderId, fragmentShaderId){
    this.CompiledShader = null;
    this.ShaderVertexPositionAttribute = null;
    this.PixelColor = null;
    this.ModelTransform = null;
    this.ViewProjectionTransform = null;

    var _GL = GameEngine.Core.GetGL();

    var vertexShader = this._CompileShader(vertexShaderId, _GL.VERTEX_SHADER);
    var fragmentShader = this._CompileShader(fragmentShaderId, _GL.FRAGMENT_SHADER);

    this.CompiledShader = _GL.createProgram();
    _GL.attachShader(this.CompiledShader, vertexShader);
    _GL.attachShader(this.CompiledShader, fragmentShader);
    _GL.linkProgram(this.CompiledShader);

    if(!_GL.getProgramParameter(this.CompiledShader, _GL.LINK_STATUS)){
        alert("Error linking shader");
        return;
    }

    this.ShaderVertexPositionAttribute = _GL.getAttribLocation(this.CompiledShader, "GLSL_SquareVertexPosition");
    _GL.bindBuffer(_GL.ARRAY_BUFFER, GameEngine.VertexBuffer.GetReference());
    _GL.vertexAttribPointer(this.ShaderVertexPositionAttribute, 3, _GL.FLOAT, false, 0, 0);

    this.PixelColor = _GL.getUniformLocation(this.CompiledShader, "GLSL_PixelColor");
    this.ModelTransform = _GL.getUniformLocation(this.CompiledShader, "GLSL_ModelTransform");
    this.ViewProjectionTransform = _GL.getUniformLocation(this.CompiledShader, "GLSL_ViewProjectionTransform");
}

SimpleShader.prototype._CompileShader = function(filePath, shaderType){
    var _ShaderSource = GameEngine.ResourceMap.RetrieveAsset(filePath);

    if(_ShaderSource === null) {
        alert("WARNING: Loading of: " + filePath + " Failed!");
        return null;
    }

    var _GL = GameEngine.Core.GetGL();
    var _CompiledShader = _GL.createShader(shaderType);

    _GL.shaderSource(_CompiledShader, _ShaderSource);
    _GL.compileShader(_CompiledShader);

    if(!_GL.getShaderParameter(_CompiledShader, _GL.COMPILE_STATUS)){
        alert("A shader compiling error occurred: " + _GL.getShaderInfoLog(_CompiledShader));
    }

    return _CompiledShader;
};

SimpleShader.prototype.ActivateShader = function(pixelColor, vpMatrix){
    var _GL = GameEngine.Core.GetGL();
    _GL.useProgram(this.CompiledShader);
    _GL.uniformMatrix4fv(this.ViewProjectionTransform, false, vpMatrix);
    _GL.enableVertexAttribArray(this.ShaderVertexPositionAttribute);
    _GL.uniform4fv(this.PixelColor, pixelColor);
};

SimpleShader.prototype.LoadObjectTransform = function(modelTransform){
    var _GL = GameEngine.Core.GetGL();
    _GL.uniformMatrix4fv(this.ModelTransform, false, modelTransform);
};

SimpleShader.prototype.GetShader = function(){ return this.CompiledShader; };
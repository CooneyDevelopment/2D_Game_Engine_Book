function Game(canvasId){

    GameEngine.Core.Initialize(canvasId);
    this.Shader = new SimpleShader("Scripts/GLSLShaders/SimpleVertexShader.glsl", "Scripts/GLSLShaders/SimpleFragmentShader.glsl");

    GameEngine.Core.ClearCanvas([0.0, 0.8, 0.0, 1.0]);
    this.Shader.ActivateShader([0.0, 0.0, 1.0, 1.0]);

    var _GL = GameEngine.Core.GetGL();
    _GL.drawArrays(_GL.TRIANGLE_STRIP, 0, 4);

};
uniform mat4 GLSL_ModelTransform;
attribute vec3 GLSL_SquareVertexPosition;
void main(void) {
	gl_Position = GLSL_ModelTransform * vec4(GLSL_SquareVertexPosition, 1.0);
}
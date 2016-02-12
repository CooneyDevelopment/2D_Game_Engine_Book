attribute vec3 GLSL_SquareVertexPosition;
void main(void) {
	gl_Position = vec4(GLSL_SquareVertexPosition, 1.0);
}
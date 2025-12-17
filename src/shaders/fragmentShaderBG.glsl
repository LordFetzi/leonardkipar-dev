precision mediump float;

varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorContour;
uniform vec2 uMouse;
uniform vec2 uResolution;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 parallax = (uMouse - 0.5) * 0.01;
  vec2 uv = vUv * 5.0 + parallax;
  uv.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.002;
  uv += vec2(
    sin(uv.y * 2.0 + t) * 0.05,
    cos(uv.x * 2.0 + t) * 0.05
  );

  float n = noise(uv + t);

  // Konturlinien erzeugen
  float lines = smoothstep(0.0125, 0.0375, abs(fract(n * 20.0) - 0.5));
  float alpha = 1.0 - lines; // Nur Kontur = 1, Rest = 0
  gl_FragColor = vec4(uColorContour, alpha);
  }

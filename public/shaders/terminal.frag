precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_isDark;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Vignette (stronger for terminal)
    vec2 coord = uv - 0.5;
    float dist = length(coord);
    float vignette = smoothstep(0.2, 1.0, dist);

    // Scanlines (stronger, denser)
    float scanline = sin(gl_FragCoord.y * 3.0) * 0.08;

    // Noise (stronger)
    float noise = (random(uv + mod(u_time, 10.0)) - 0.5) * 0.12;

    // Constant dark mode math
    float alpha = vignette * 0.6 + noise;
    vec3 color = vec3(0.1, 0.15, 0.1);
    gl_FragColor = vec4(color, alpha + scanline);
}

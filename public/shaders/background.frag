precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_isDark;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Vignette
    vec2 coord = uv - 0.5;
    float dist = length(coord);
    float vignette = smoothstep(0.4, 1.2, dist);

    // Scanlines
    float scanline = sin(gl_FragCoord.y * 1.5) * 0.04;

    // Noise
    float noise = (random(uv + mod(u_time, 10.0)) - 0.5) * 0.06;

    // Constant dark mode math
    float alpha = vignette * 0.4 + noise;
    vec3 color = vec3(0.05, 0.05, 0.08); // faint blue/purple tint
    gl_FragColor = vec4(color, alpha + scanline);
}

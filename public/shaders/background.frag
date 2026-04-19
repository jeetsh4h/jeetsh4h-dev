precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_isDark;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 coord = uv - 0.5;
    float dist = length(coord);
    float vignette = smoothstep(0.12, 0.72, dist);

    float scanline = (sin(gl_FragCoord.y * 1.65 + u_time * 4.0) * 0.5 + 0.5)
        * mix(0.02, 0.045, u_isDark);

    float noise = (random(gl_FragCoord.xy + vec2(u_time * 53.0, -u_time * 29.0)) - 0.5)
        * mix(0.025, 0.05, u_isDark);

    float baseAlpha = mix(0.08, 0.18, u_isDark);
    float alpha = clamp(baseAlpha * vignette + scanline + noise, 0.0, 1.0);
    vec3 lightColor = vec3(0.08, 0.08, 0.10);
    vec3 darkColor = vec3(0.05, 0.05, 0.08);
    vec3 color = mix(lightColor, darkColor, u_isDark);

    gl_FragColor = vec4(color, alpha);
}

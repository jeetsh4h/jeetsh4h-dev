"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function TerminalCrtOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // Local state to ensure we only run the WebGL context once shaders are loaded
  const [shaders, setShaders] = useState<{ vert: string; frag: string } | null>(
    null,
  );

  useEffect(() => {
    async function loadShaders() {
      try {
        const [vsRes, fsRes] = await Promise.all([
          fetch("/shaders/base.vert"),
          fetch("/shaders/terminal.frag"),
        ]);
        const vert = await vsRes.text();
        const frag = await fsRes.text();
        setShaders({ vert, frag });
      } catch (err) {
        console.error("Failed to load shaders:", err);
      }
    }
    loadShaders();
  }, []);

  useEffect(() => {
    if (!shaders) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    function compileShader(
      gl: WebGLRenderingContext,
      type: number,
      source: string,
    ) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, shaders.vert);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.frag);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Provide geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const isDarkLocation = gl.getUniformLocation(program, "u_isDark");

    let animationFrameId: number;

    const render = (time: number) => {
      // Resize canvas to display size of parent block
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(isDarkLocation, resolvedTheme === "dark" ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [resolvedTheme, shaders]);

  if (!shaders) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 size-full transition-opacity duration-1000 rounded-sm",
        resolvedTheme === "dark" ?
          "opacity-80 mix-blend-overlay"
        : "opacity-40 mix-blend-multiply",
      )}
      aria-hidden="true"
    />
  );
}

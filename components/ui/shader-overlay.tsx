"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type ShaderSource = {
  vert: string;
  frag: string;
};

type ShaderOverlayProps = {
  fragmentPath: string;
  sizeMode: "viewport" | "element";
  className: string;
};

async function fetchShaderSource(path: string) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load shader: ${path}`);
  }

  return response.text();
}

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

function createProgram(
  gl: WebGLRenderingContext,
  shaders: ShaderSource,
) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, shaders.vert);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, shaders.frag);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  return { program, vertexShader, fragmentShader };
}

export default function ShaderOverlay({
  fragmentPath,
  sizeMode,
  className,
}: ShaderOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeValueRef = useRef(0);
  const [shaders, setShaders] = useState<ShaderSource | null>(null);

  useEffect(() => {
    themeValueRef.current = resolvedTheme === "dark" ? 1 : 0;
  }, [resolvedTheme]);

  useEffect(() => {
    let cancelled = false;

    async function loadShaders() {
      try {
        const [vert, frag] = await Promise.all([
          fetchShaderSource("/shaders/base.vert"),
          fetchShaderSource(fragmentPath),
        ]);

        if (!cancelled) {
          setShaders({ vert, frag });
        }
      } catch (error) {
        console.error("Failed to load shaders:", error);
      }
    }

    loadShaders();

    return () => {
      cancelled = true;
    };
  }, [fragmentPath]);

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

    const compiled = createProgram(gl, shaders);
    if (!compiled) return;

    const { program, vertexShader, fragmentShader } = compiled;
    gl.useProgram(program);

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

    let animationFrameId = 0;

    const render = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth =
        sizeMode === "viewport" ? window.innerWidth : canvas.getBoundingClientRect().width;
      const cssHeight =
        sizeMode === "viewport" ? window.innerHeight : canvas.getBoundingClientRect().height;
      const displayWidth = Math.max(1, Math.round(cssWidth * dpr));
      const displayHeight = Math.max(1, Math.round(cssHeight * dpr));

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
      if (timeLocation) {
        gl.uniform1f(timeLocation, time * 0.001);
      }
      if (isDarkLocation) {
        gl.uniform1f(isDarkLocation, themeValueRef.current);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      if (positionBuffer) {
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [shaders, sizeMode]);

  if (!shaders) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}

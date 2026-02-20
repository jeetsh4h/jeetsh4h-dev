"use client";

import { Fragment } from "react";
import useSWR from "swr";
import { IconNetwork, IconCpu, IconBrowser } from "@tabler/icons-react";

interface IpApiResponse {
  ip?: string;
  org?: string;
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
}

interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface BatteryManager {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
  getBattery?: () => Promise<BatteryManager>;
}

interface OsintData {
  ip?: string;
  isp?: string;
  location?: string;
  coords?: string;
  timezone?: string;
  os?: string;
  browser?: string;
  cores?: string;
  memory?: string;
  gpu?: string;
  touch?: string;
  screen?: string;
  battery?: string;
  language?: string;
  connection?: string;
}

const gatherIntelligence = async (): Promise<OsintData> => {
  let ipData: Partial<IpApiResponse> = {};

  try {
    const ipRes = await fetch("https://ipapi.co/json/");
    if (ipRes.ok) {
      ipData = (await ipRes.json()) as IpApiResponse;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.debug("IP Address retrieval error:", err.message);
    }
  }

  const nav = window.navigator as ExtendedNavigator;
  const ua = nav.userAgent;

  let os: string | undefined;
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("like Mac")) os = "iOS";

  let browser: string | undefined;
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Trident")) browser = "Internet Explorer";
  else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";

  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection;
  const connType =
    connection?.effectiveType ?
      `${connection.effectiveType} (~${connection.downlink || 0} Mbps)`
    : undefined;

  let gpu: string | undefined;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer) gpu = renderer;
      }
    }
  } catch (e) {
    console.debug("Canvas Error:", e);
  }

  // Battery Extraction
  let batteryStr: string | undefined;
  if (nav.getBattery) {
    try {
      const battery = await nav.getBattery();
      const level = Math.round(battery.level * 100);
      const status = battery.charging ? "Charging" : "Discharging";
      batteryStr = `${level}% (${status})`;
    } catch (e) {
      console.debug("Battery API Error:", e);
    }
  }

  const locParts = [ipData.city, ipData.region, ipData.country_name].filter(
    (part): part is string => typeof part === "string" && part.length > 0,
  );
  const locationStr = locParts.length > 0 ? locParts.join(", ") : undefined;

  const coordsStr =
    ipData.latitude && ipData.longitude ?
      `${ipData.latitude}, ${ipData.longitude}`
    : undefined;

  let screenStr: string | undefined;
  if (typeof window !== "undefined" && window.screen) {
    screenStr = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`;
  }

  return {
    ip: ipData.ip,
    isp: ipData.org,
    location: locationStr,
    coords: coordsStr,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    os: os,
    browser: browser,
    cores:
      nav.hardwareConcurrency ? nav.hardwareConcurrency.toString() : undefined,
    memory: nav.deviceMemory ? `~${nav.deviceMemory} GB` : undefined,
    gpu: gpu,
    touch:
      nav.maxTouchPoints !== undefined ?
        nav.maxTouchPoints > 0 ?
          `Yes (${nav.maxTouchPoints} points)`
        : "No"
      : undefined,
    screen: screenStr,
    battery: batteryStr,
    language: nav.language,
    connection: connType,
  };
};

export default function Whoami() {
  const { data, error, isLoading } = useSWR<OsintData>(
    "osint-telemetry",
    gatherIntelligence,
    {
      dedupingInterval: 300_000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    },
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 mt-2 text-term-muted text-sm animate-pulse">
        <span>Extracting browser telemetry...</span>
        <span>Bypassing graphics sandboxes...</span>
        <span>Resolving network routes...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mt-2 text-destructive text-sm">
        Error: Failed to extract local telemetry.
      </div>
    );
  }

  const sections = [
    {
      title: "Network Intelligence",
      icon: IconNetwork,
      items: [
        { label: "IPv4/IPv6", value: data.ip },
        { label: "ISP / Org", value: data.isp },
        { label: "Location", value: data.location },
        { label: "Coordinates", value: data.coords },
        { label: "Connection", value: data.connection },
      ].filter((item) => item.value !== undefined),
    },
    {
      title: "Hardware Fingerprint",
      icon: IconCpu,
      items: [
        { label: "Platform OS", value: data.os },
        { label: "CPU Cores", value: data.cores },
        { label: "Est. Memory", value: data.memory },
        { label: "Graphics (GPU)", value: data.gpu },
        { label: "Display", value: data.screen },
        { label: "Touch Input", value: data.touch },
      ].filter((item) => item.value !== undefined),
    },
    {
      title: "Software Telemetry",
      icon: IconBrowser,
      items: [
        { label: "Browser", value: data.browser },
        { label: "System Time", value: data.timezone },
        { label: "Power Status", value: data.battery },
        { label: "Language", value: data.language },
      ].filter((item) => item.value !== undefined),
    },
  ].filter((section) => section.items.length > 0);

  if (sections.length === 0) {
    return (
      <div className="mt-2 text-term-warning text-sm">
        Target telemetry is completely masked.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-2">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 text-primary font-bold text-base mb-2">
            <section.icon
              size={18}
              className="text-accent"
            />
            <span>{section.title}</span>
          </div>

          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-sm">
            {section.items.map((item) => (
              <Fragment key={item.label}>
                <span className="text-secondary">{item.label}</span>
                <span className="text-foreground whitespace-pre-wrap">
                  {item.value}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      ))}

      <div className="text-xs text-muted-foreground mt-2 border-t border-border/50 pt-2 w-fit">
        Note: Data is extracted locally via standard browser APIs. No
        unauthorized access performed.
      </div>
    </div>
  );
}

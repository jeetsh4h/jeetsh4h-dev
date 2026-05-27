export default function CrtOverlay() {
  return (
    <div
      aria-hidden="true"
      className="crt-overlay-static pointer-events-none fixed inset-0 z-50 h-full w-full opacity-30 mix-blend-multiply transition-opacity duration-1000 dark:opacity-60 dark:mix-blend-overlay"
    />
  );
}

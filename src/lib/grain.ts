// Shared film-grain noise texture used as a subtle overlay across hero/section
// backgrounds. `baseFrequency` controls how fine the grain looks — the various
// pages that use this had each hand-tuned their own copy to slightly different
// values, so it's kept as a parameter rather than a single constant.
export function getGrainDataUri(baseFrequency = 0.8, viewBoxSize = 256): string {
  return `url("data:image/svg+xml,%3Csvg viewBox='0 0 ${viewBoxSize} ${viewBoxSize}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
}

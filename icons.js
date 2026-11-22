// Line icons: 24px grid, stroke-based, drawn to match the notebook brand mark.
const paths = {
  wind: '<path d="M3 8.5h10.5a2.75 2.75 0 1 0-2.75-2.75"/><path d="M3 12.5h14.5a2.75 2.75 0 1 1-2.75 2.75"/><path d="M3 16.5h6"/>',
  cloud: '<path d="M7.5 18.5h9.25a3.75 3.75 0 0 0 .5-7.47A5.5 5.5 0 0 0 6.9 9.9 4 4 0 0 0 7.5 18.5z"/>',
  pause: '<circle cx="12" cy="12" r="8.75"/><path d="M10 9.25v5.5M14 9.25v5.5"/>',
  shield: '<path d="M12 3.5l6.5 2.5v5.25c0 4.1-2.7 7.3-6.5 8.75-3.8-1.45-6.5-4.65-6.5-8.75V6z"/><path d="M9.25 12l2 2 3.5-3.75"/>',
  anchor: '<circle cx="12" cy="5.25" r="2.25"/><path d="M12 7.5v12.25M8.5 10.25h7"/><path d="M5 13.5a7 7 0 0 0 14 0"/><path d="M5 13.5l-1.5-1.25M19 13.5l1.5-1.25"/>',
  candle: '<path d="M12 3.25c1.2 1.6 1.6 2.7 0 4.25-1.6-1.55-1.2-2.65 0-4.25z"/><rect x="9" y="10.5" width="6" height="10.25" rx="1.25"/><path d="M9 14.5h6"/>',
  sprout: '<path d="M12 20.5v-8.5"/><path d="M12 12.25C12 8.75 9.75 6.5 5.5 6.5c0 3.5 2.25 5.75 6.5 5.75z"/><path d="M12 14.75c0-3.25 2.25-5.25 6.5-5.25 0 3.25-2.25 5.25-6.5 5.25z"/>',
  arrowUpRight: '<path d="M7.5 16.5l9-9M9 7.5h7.5V15"/>',
  arrowRight: '<path d="M5 12h13.5M13 6.5l5.5 5.5-5.5 5.5"/>',
  arrowLeft: '<path d="M19 12H5.5M11 6.5L5.5 12l5.5 5.5"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2.25"/><path d="M8.25 10.5V8a3.75 3.75 0 0 1 7.5 0v2.5"/>',
  notebook: '<rect x="4.5" y="3" width="15" height="18" rx="2.25"/><path d="M9 3v18M12.5 8h3M12.5 12h3"/>',
  check: '<path d="M5.5 12.5l4 4 9-9.5"/>'
};
export const icon = (name, cls = '') =>
  '<svg class="ico ' + cls + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (paths[name] || '') + '</svg>';

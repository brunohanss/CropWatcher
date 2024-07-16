export function isTauri() {
    return typeof (window as any)?.__TAURI_INTERNALS__ !== 'undefined';
}

// utils/sanitize.js - Shared escaping/sanitizing for UI surfaces that build
// HTML from user- or page-controlled strings (popup, options page).

export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Colors land in style attributes and generated CSS (with alpha suffixes),
// so only #rrggbb survives
export function sanitizeColor(color) {
    return /^#[0-9a-fA-F]{6}$/.test(String(color)) ? color : '#e67e22';
}

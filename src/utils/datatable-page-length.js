/**
 * DataTable page length helper — program-level persistence via localStorage.
 * Default pageLength: 5 | lengthMenu: [5, 10, 25, 50, 100]
 */

export const DEFAULT_PAGE_LENGTH = 5;
export const DEFAULT_LENGTH_MENU = [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]];

function storageKey(programCode) {
  return 'dt_pageLength_' + programCode;
}

function parseLength(value) {
  const n = parseInt(value, 10);
  return isNaN(n) || n < 1 ? null : n;
}

export function getSavedPageLength(programCode, fallback = DEFAULT_PAGE_LENGTH) {
  try {
    const saved = parseLength(localStorage.getItem(storageKey(programCode)));
    return saved !== null ? saved : fallback;
  } catch (e) {
    return fallback;
  }
}

export function savePageLength(programCode, length) {
  const n = parseLength(length);
  if (n === null || !programCode) {
    return;
  }
  try {
    localStorage.setItem(storageKey(programCode), String(n));
  } catch (e) {
    /* ignore */
  }
}

export function ensureLengthInDom(dom) {
  if (!dom || typeof dom !== 'string') {
    return dom;
  }
  if (dom.indexOf('l') !== -1) {
    return dom;
  }
  if (dom.indexOf('B') === 0) {
    return 'l' + dom;
  }
  return dom;
}

export function applyPageLengthDefaults(programCode, options = {}) {
  const merged = { ...options };

  if (merged.lengthMenu === undefined) {
    merged.lengthMenu = DEFAULT_LENGTH_MENU.map((row) => row.slice());
  }

  const fallback = merged.pageLength !== undefined ? merged.pageLength : DEFAULT_PAGE_LENGTH;
  merged.pageLength = getSavedPageLength(programCode, fallback);

  if (merged.dom !== undefined) {
    merged.dom = ensureLengthInDom(merged.dom);
  }

  return merged;
}

export function bindPageLengthSave(table, programCode) {
  if (!table || !programCode) {
    return;
  }
  table.on('length.dt.dtPageLength', function (_e, _settings, len) {
    savePageLength(programCode, len);
  });
}

/** Convenience: apply defaults, init is done by caller; call after DataTable() */
export function wrapDataTableOptions(programCode, options) {
  return applyPageLengthDefaults(programCode, options);
}

/** jQuery DataTable init with program-level page length */
export function createDataTable($, selector, programCode, options = {}) {
  const opts = applyPageLengthDefaults(programCode, options);
  const table = $(selector).DataTable(opts);
  bindPageLengthSave(table, programCode);
  return table;
}

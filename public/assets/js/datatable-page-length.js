/**
 * DataTable page length helper — program-level persistence via localStorage.
 * Default pageLength: 5 | lengthMenu: [5, 10, 25, 50, 100]
 */
(function (global) {
  'use strict';

  var DEFAULT_PAGE_LENGTH = 5;
  var DEFAULT_LENGTH_MENU = [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]];

  function storageKey(programCode) {
    return 'dt_pageLength_' + programCode;
  }

  function parseLength(value) {
    var n = parseInt(value, 10);
    return isNaN(n) || n < 1 ? null : n;
  }

  function getSaved(programCode, fallback) {
    if (fallback === undefined) {
      fallback = DEFAULT_PAGE_LENGTH;
    }
    try {
      var saved = parseLength(localStorage.getItem(storageKey(programCode)));
      return saved !== null ? saved : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(programCode, length) {
    var n = parseLength(length);
    if (n === null || !programCode) {
      return;
    }
    try {
      localStorage.setItem(storageKey(programCode), String(n));
    } catch (e) {
      /* ignore quota errors */
    }
  }

  function ensureLengthInDom(dom) {
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

  function applyDefaults(programCode, options) {
    options = options || {};
    var merged = Object.assign({}, options);

    if (merged.lengthMenu === undefined) {
      merged.lengthMenu = DEFAULT_LENGTH_MENU.slice();
      merged.lengthMenu[0] = DEFAULT_LENGTH_MENU[0].slice();
      merged.lengthMenu[1] = DEFAULT_LENGTH_MENU[1].slice();
    }

    var fallback = merged.pageLength !== undefined ? merged.pageLength : DEFAULT_PAGE_LENGTH;
    merged.pageLength = getSaved(programCode, fallback);

    if (merged.dom !== undefined) {
      merged.dom = ensureLengthInDom(merged.dom);
    }

    return merged;
  }

  function bindSave(table, programCode) {
    if (!table || !programCode) {
      return;
    }
    table.on('length.dt.dtPageLength', function (_e, settings, len) {
      save(programCode, len);
    });
  }

  function create(selector, programCode, options) {
    var opts = applyDefaults(programCode, options);
    var table = $(selector).DataTable(opts);
    bindSave(table, programCode);
    return table;
  }

  function createDataTable(selector, programCode, options) {
    var opts = applyDefaults(programCode, options);
    var table = $(selector).dataTable(opts);
    bindSave(table, programCode);
    return table;
  }

  var DtPageLength = {
    DEFAULT_PAGE_LENGTH: DEFAULT_PAGE_LENGTH,
    DEFAULT_LENGTH_MENU: DEFAULT_LENGTH_MENU,
    getSaved: getSaved,
    save: save,
    applyDefaults: applyDefaults,
    bindSave: bindSave,
    create: create,
    createDataTable: createDataTable,
    ensureLengthInDom: ensureLengthInDom
  };

  global.DtPageLength = DtPageLength;
})(typeof window !== 'undefined' ? window : this);

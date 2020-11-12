/* eslint-disable */

"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Define search commands. Depends on find-and-replace-dialog.js

(function (mod) {
  if (
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ==
      "object" &&
    (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object"
  )
    // CommonJS
    mod(require("codemirror"), require("codemirror-find-and-replace-dialog"));
  else if (typeof define == "function" && define.amd)
    // AMD
    define(["codemirror", "codemirror-find-and-replace-dialog"], mod);
  // Plain browser env
  else mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  var replaceDialog =
    '\n      <div class="CodeMirror-find-and-replace-dialog--replace-container">\n        <div class="CodeMirror-find-and-replace-dialog--row find">\n          <div class="CodeMirror-find-and-replace-dialog--row">\n            <input type="text" autocomplete="off" class="CodeMirror-find-and-replace-dialog--search-field" placeholder="Find" />\n            <span class="CodeMirror-find-and-replace-dialog--search-count"></span>\n          </div>\n          <div class="CodeMirror-find-and-replace-dialog--buttons">\n            <button class="CodeMirror-find-and-replace-dialog--find-previous" title="Find Previous">\n              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5">\n                <path d="M3.93.223a.84.84 0 011.14 0l3.697 3.492c.31.294.31.77 0 1.065a.832.832 0 01-1.127 0L4.5 1.814 1.36 4.78a.832.832 0 01-1.127 0 .726.726 0 010-1.065L3.931.223z" fill="#ACAEB1" fill-rule="evenodd"/>\n              </svg>\n            </button>\n            <button class="CodeMirror-find-and-replace-dialog--find-next" title="Find Next">\n              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5">\n                <path d="M3.93 4.777a.84.84 0 001.14 0l3.697-3.492a.726.726 0 000-1.065.832.832 0 00-1.127 0L4.5 3.186 1.36.22a.832.832 0 00-1.127 0 .726.726 0 000 1.065l3.698 3.492z" fill="#ACAEB1" fill-rule="evenodd"/>\n              </svg>\n            </button>\n            <button class="CodeMirror-find-and-replace-dialog--close" title="Close">\n              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">\n                <path d="M.167.167a.572.572 0 01.808 0L4 3.192 7.025.167a.571.571 0 01.728-.066l.08.066a.572.572 0 010 .808L4.808 4l3.025 3.025c.198.198.22.506.066.728l-.066.08a.572.572 0 01-.808 0L4 4.808.975 7.833a.571.571 0 01-.728.066l-.08-.066a.572.572 0 010-.808L3.192 4 .167.975A.571.571 0 01.101.247z" fill="#ACAEB1" fill-rule="nonzero"/>\n              </svg>\n            </button>\n          </div>\n        </div>\n\n        <div class="CodeMirror-find-and-replace-dialog--row replace">\n          <div class="CodeMirror-find-and-replace-dialog--row">\n            <input type="text" class="CodeMirror-find-and-replace-dialog--search-field" autocomplete="off" placeholder="Replace" />\n          </div>\n          <div class="CodeMirror-find-and-replace-dialog--buttons">\n            <button class="CodeMirror-find-and-replace-dialog--replace" title="Replace">\n       replace       \n            </button>\n            <button class="CodeMirror-find-and-replace-dialog--replace-all" title="Replace All">\n      replace all        \n            </button>\n          </div>\n        </div>\n      <div>\n    ';

  var findDialog =
    '\n      <div class="CodeMirror-find-and-replace-dialog--row find">\n        <input type="text" class="CodeMirror-find-and-replace-dialog--search-field" autocomplete="off" placeholder="Find" />\n        <span class="CodeMirror-find-and-replace-dialog--search-count"></span>\n      </div>\n      <div class="CodeMirror-find-and-replace-dialog--buttons">\n        <button class="CodeMirror-find-and-replace-dialog--find-previous" title="Find Previous">\n          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5">\n            <path d="M3.93.223a.84.84 0 011.14 0l3.697 3.492c.31.294.31.77 0 1.065a.832.832 0 01-1.127 0L4.5 1.814 1.36 4.78a.832.832 0 01-1.127 0 .726.726 0 010-1.065L3.931.223z" fill="#ACAEB1" fill-rule="evenodd"/>\n          </svg>\n        </button>\n        <button class="CodeMirror-find-and-replace-dialog--find-next" title="Find Next">\n          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5">\n            <path d="M3.93 4.777a.84.84 0 001.14 0l3.697-3.492a.726.726 0 000-1.065.832.832 0 00-1.127 0L4.5 3.186 1.36.22a.832.832 0 00-1.127 0 .726.726 0 000 1.065l3.698 3.492z" fill="#ACAEB1" fill-rule="evenodd"/>\n          </svg>\n        </button>\n        <button class="CodeMirror-find-and-replace-dialog--close" title="Close">\n          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">\n            <path d="M.167.167a.572.572 0 01.808 0L4 3.192 7.025.167a.571.571 0 01.728-.066l.08.066a.572.572 0 010 .808L4.808 4l3.025 3.025c.198.198.22.506.066.728l-.066.08a.572.572 0 01-.808 0L4 4.808.975 7.833a.571.571 0 01-.728.066l-.08-.066a.572.572 0 010-.808L3.192 4 .167.975A.571.571 0 01.101.247z" fill="#ACAEB1" fill-rule="nonzero"/>\n          </svg>\n        </button>\n      </div>\n    ';

  var numMatches = 0;
  var searchOverlay = function searchOverlay(query, caseInsensitive) {
    if (typeof query == "string")
      query = new RegExp(
        query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
        caseInsensitive ? "gi" : "g"
      );
    else if (!query.global)
      query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");

    return {
      token: function token(stream) {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        if (match && match.index == stream.pos) {
          stream.pos += match[0].length || 1;
          return "searching";
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      },
    };
  };

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  var getSearchState = function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  };

  var queryCaseInsensitive = function queryCaseInsensitive(query) {
    return typeof query == "string" && query == query.toLowerCase();
  };

  var getSearchCursor = function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(
      parseQuery(query),
      pos,
      queryCaseInsensitive(query)
    );
  };

  var parseString = function parseString(string) {
    return string.replace(/\\(.)/g, function (_, ch) {
      if (ch == "n") return "\n";
      if (ch == "r") return "\r";
      return ch;
    });
  };

  var parseQuery = function parseQuery(query) {
    if (query.exec) {
      return query;
    }
    var isRE = query.indexOf("/") === 0 && query.lastIndexOf("/") > 0;
    if (!!isRE) {
      try {
        var matches = query.match(/^\/(.*)\/([a-z]*)$/);
        query = new RegExp(
          matches[1],
          matches[2].indexOf("i") == -1 ? "" : "i"
        );
      } catch (e) {} // Not a regular expression after all, do a string search
    } else {
      query = parseString(query);
    }
    if (typeof query == "string" ? query == "" : query.test("")) query = /x^/;
    return query;
  };

  /* Old */
  // let startSearch = (cm, state, query) => {
  //   if (!query || query === "") return;
  //   state.queryText = query;
  //   state.query = parseQuery(query);
  //   cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
  //   state.overlay = searchOverlay(
  //     state.query,
  //     queryCaseInsensitive(state.query)
  //   );
  //   cm.addOverlay(state.overlay);
  //   if (cm.showMatchesOnScrollbar) {
  //     if (state.annotate) {
  //       state.annotate.clear();
  //       state.annotate = null;
  //     }
  //     state.annotate = cm.showMatchesOnScrollbar(
  //       state.query,
  //       queryCaseInsensitive(state.query)
  //     );
  //   }
  // };

  /* New */
  var startSearch = function startSearch(cm, state, query) {
    if (!query || query === "") return;
    state.queryText = query;
    state.query = parseQuery(query);
    // cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
    cm.removeOverlay(state.overlay, true);
    state.overlay = searchOverlay(
      state.query,
      // queryCaseInsensitive(state.query)
      true
    );
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
      state.annotate = cm.showMatchesOnScrollbar(
        state.query,
        // queryCaseInsensitive(state.query)
        true
      );
    }
  };

  var doSearch = function doSearch(cm, query, reverse, moveToNext) {
    var hiding = null;
    var state = getSearchState(cm);
    if (query != state.queryText) {
      startSearch(cm, state, query);
      state.posFrom = state.posTo = cm.getCursor();
    }
    if (moveToNext || moveToNext === undefined) {
      findNext(cm, reverse || false);
    }
    updateCount(cm);
  };

  var clearSearch = function clearSearch(cm) {
    cm.operation(function () {
      var state = getSearchState(cm);
      state.lastQuery = state.query;
      if (!state.query) return;
      state.query = state.queryText = null;
      cm.removeOverlay(state.overlay);
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
    });
  };

  var findNext = function findNext(cm, reverse, callback) {
    cm.operation(function () {
      var state = getSearchState(cm);
      var cursor = getSearchCursor(
        cm,
        state.query,
        reverse ? state.posFrom : state.posTo
      );
      if (!cursor.find(reverse)) {
        cursor = getSearchCursor(
          cm,
          state.query,
          reverse
            ? CodeMirror.Pos(cm.lastLine())
            : CodeMirror.Pos(cm.firstLine(), 0)
        );
        if (!cursor.find(reverse)) return;
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView(
        {
          from: cursor.from(),
          to: cursor.to(),
        },
        20
      );
      state.posFrom = cursor.from();
      state.posTo = cursor.to();
      if (callback) callback(cursor.from(), cursor.to());
    });
  };

  var replaceNext = function replaceNext(cm, query, text) {
    var cursor = getSearchCursor(cm, query, cm.getCursor("from"));
    var start = cursor.from();
    var match = cursor.findNext();
    if (!match) {
      cursor = getSearchCursor(cm, query);
      match = cursor.findNext();
      if (
        !match ||
        (start &&
          cursor.from().line === start.line &&
          cursor.from().ch === start.ch)
      )
        return;
    }
    cm.setSelection(cursor.from(), cursor.to());
    cm.scrollIntoView({
      from: cursor.from(),
      to: cursor.to(),
    });
    cursor.replace(
      typeof query === "string"
        ? text
        : text.replace(/\$(\d)/g, function (_, i) {
            return match[i];
          })
    );
  };

  var replaceAll = function replaceAll(cm, query, text) {
    cm.operation(function () {
      for (var cursor = getSearchCursor(cm, query); cursor.findNext(); ) {
        if (typeof query != "string") {
          var match = cm.getRange(cursor.from(), cursor.to()).match(query);
          cursor.replace(
            text.replace(/\$(\d)/g, function (_, i) {
              return match[i];
            })
          );
        } else cursor.replace(text);
      }
    });
  };

  var closeSearchCallback = function closeSearchCallback(cm, state) {
    if (state.annotate) {
      state.annotate.clear();
      state.annotate = null;
    }
    clearSearch(cm);
  };

  var getOnReadOnlyCallback = function getOnReadOnlyCallback(callback) {
    var closeFindDialogOnReadOnly = function closeFindDialogOnReadOnly(
      cm,
      opt
    ) {
      if (opt === "readOnly" && !!cm.getOption("readOnly")) {
        callback();
        cm.off("optionChange", closeFindDialogOnReadOnly);
      }
    };
    return closeFindDialogOnReadOnly;
  };

  var updateCount = function updateCount(cm) {
    var state = getSearchState(cm);
    var value = cm.getDoc().getValue();
    var globalQuery = void 0;
    var queryText = state.queryText;

    if (!queryText || queryText === "") {
      resetCount(cm);
      return;
    }

    while (queryText.charAt(queryText.length - 1) === "\\") {
      queryText = queryText.substring(0, queryText.lastIndexOf("\\"));
    }

    if (typeof state.query === "string") {
      globalQuery = new RegExp(queryText, "ig");
    } else {
      globalQuery = new RegExp(state.query.source, state.query.flags + "g");
    }

    var matches = value.match(globalQuery);
    var count = matches ? matches.length : 0;

    var countText = count === 1 ? "1 match found." : count + " matches found.";
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--search-count"
      ).innerHTML = countText;
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--find-previous"
      ).disabled = count <= 0;
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--find-next"
      ).disabled = count <= 0;
  };

  var resetCount = function resetCount(cm) {
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--search-count"
      ).innerHTML = "";
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--find-next"
      ).disabled = true;
    cm
      .getWrapperElement()
      .parentNode.querySelector(
        ".CodeMirror-find-and-replace-dialog--find-previous"
      ).disabled = true;
  };

  var getFindBehaviour = function getFindBehaviour(cm, defaultText, callback) {
    if (!defaultText) {
      defaultText = "";
    }
    var behaviour = {
      value: defaultText,
      focus: true,
      selectValueOnOpen: true,
      closeOnEnter: false,
      closeOnBlur: false,
      callback: function callback(inputs, e) {
        var query = inputs[0].value;
        if (!query) return;
        doSearch(cm, query, !!e.shiftKey);
      },
      onInput: function onInput(inputs, e) {
        var query = inputs[0].value;
        if (!query) {
          resetCount(cm);
          clearSearch(cm);
          return;
        }
        doSearch(cm, query, !!e.shiftKey, false);
      },
    };
    if (!!callback) {
      behaviour.callback = callback;
    }
    return behaviour;
  };

  var getFindPrevBtnBehaviour = function getFindPrevBtnBehaviour(cm) {
    return {
      callback: function callback(inputs) {
        var query = inputs[0].value;
        if (!query) return;
        doSearch(cm, query, true);
      },
    };
  };

  var getFindNextBtnBehaviour = function getFindNextBtnBehaviour(cm) {
    return {
      callback: function callback(inputs) {
        var query = inputs[0].value;
        if (!query) return;
        doSearch(cm, query, false);
      },
    };
  };

  var closeBtnBehaviour = {
    callback: null,
  };

  CodeMirror.commands.find = function (cm) {
    // if (cm.getOption("readOnly")) return;
    clearSearch(cm);
    var state = getSearchState(cm);
    var query = cm.getSelection() || getSearchState(cm).lastQuery;
    var closeDialog = cm.openFindAndReplaceDialog(findDialog, {
      shrinkEditor: true,
      inputBehaviour: [getFindBehaviour(cm, query)],
      buttonBehaviour: [
        getFindPrevBtnBehaviour(cm),
        getFindNextBtnBehaviour(cm),
        closeBtnBehaviour,
      ],
      onClose: function onClose() {
        closeSearchCallback(cm, state);
      },
    });

    cm.on("optionChange", getOnReadOnlyCallback(closeDialog));
    startSearch(cm, state, query);
    updateCount(cm);
  };

  CodeMirror.commands.replace = function (cm, all) {
    if (cm.getOption("readOnly")) return;
    clearSearch(cm);

    var replaceNextCallback = function replaceNextCallback(inputs) {
      var query = parseQuery(inputs[0].value);
      var text = parseString(inputs[1].value);
      if (!query) return;
      replaceNext(cm, query, text);
      doSearch(cm, query);
    };

    var state = getSearchState(cm);
    var query = cm.getSelection() || state.lastQuery;
    var closeDialog = cm.openFindAndReplaceDialog(replaceDialog, {
      shrinkEditor: true,
      inputBehaviour: [
        getFindBehaviour(cm, query, function (inputs) {
          inputs[1].focus();
          inputs[1].select();
        }),
        {
          closeOnEnter: false,
          closeOnBlur: false,
          callback: replaceNextCallback,
        },
      ],
      buttonBehaviour: [
        getFindPrevBtnBehaviour(cm),
        getFindNextBtnBehaviour(cm),
        closeBtnBehaviour,
        {
          callback: replaceNextCallback,
        },
        {
          callback: function callback(inputs) {
            // Replace all
            var query = parseQuery(inputs[0].value);
            var text = parseString(inputs[1].value);
            if (!query) return;
            replaceAll(cm, query, text);
          },
        },
      ],
      onClose: function onClose() {
        closeSearchCallback(cm, state);
      },
    });

    cm.on("optionChange", getOnReadOnlyCallback(closeDialog));
    startSearch(cm, state, query);
    updateCount(cm);
  };
});

//# sourceMappingURL=search.js.map

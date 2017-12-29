import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/pug/pug";
import "codemirror/mode/xml/xml";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/concat";

// local imports
import codeLibrary from "./pug-library";
import { stripIndent } from "./util/indent";
import betterTab from "./util/betterTab";
import pug from "./modules/pug";

// type defintions
import { Options, LocalsObject } from "pug";
import { CodeEntry } from "./pug-library";
import { EditorFromTextArea } from "codemirror";

const DEFAULT_PUG: string = "hello";

const pugCodeMirror = CodeMirror.fromTextArea(
  <HTMLTextAreaElement>document.getElementById("pug-editor"),
  {
    mode: "pug",
    lineNumbers: true,
    extraKeys: { Tab: betterTab }
  }
);

const jsCodeMirror = CodeMirror.fromTextArea(
  <HTMLTextAreaElement>document.getElementById("js-editor"),
  {
    mode: "application/json",
    lineNumbers: true
  }
);

const htmlCodeMirror = CodeMirror.fromTextArea(
  <HTMLTextAreaElement>document.getElementById("html"),
  {
    mode: "htmlmixed",
    lineNumbers: true,
    readOnly: true
  }
);

function renderCode() {
  const pugString = pugCodeMirror.getValue();
  const jsonString = jsCodeMirror.getValue();
  try {
    const jsValue = JSON.parse(jsonString);
    const options: Options = { ...jsValue, pretty: true };
    const htmlString = pug.render(pugString, options);
    htmlCodeMirror.setValue(htmlString);
    document.getElementById("rendered-html").innerHTML = htmlString;
  } catch (e) {
    htmlCodeMirror.setValue(e.message);
  }
}

function loadCodeFromLibrary() {
  // Get key from hash
  const key = window.location.hash.slice(1);
  const codeEntry: CodeEntry = codeLibrary[key]
    ? codeLibrary[key]
    : codeLibrary[DEFAULT_PUG];
  pugCodeMirror.setValue(stripIndent(codeEntry.pug));
  jsCodeMirror.setValue(stripIndent(codeEntry.json));
  renderCode();
  renderSelect();
}

const codeSelect = <HTMLSelectElement>document.getElementById("select");

codeSelect.addEventListener("change", (e: Event) => {
  window.location.hash = "#" + (<HTMLInputElement>e.target).value;
});

const domContentLoaded$ = Observable.fromEvent(document, "DOMContentLoaded");
const hashChange$ = Observable.fromEvent(window, "hashChange");

Observable.concat(domContentLoaded$, hashChange$).subscribe(
  loadCodeFromLibrary
);

// when hash changes, load code from library
window.addEventListener("hashchange", loadCodeFromLibrary);

function renderSelect() {
  // Get key from hash
  const hashKey = window.location.hash.slice(1);
  codeSelect.innerHTML = `
    <div class="ui label">Examples</div>
    <select class="ui dropdown">
      <div class="menu">
    
      ${Object.keys(codeLibrary)
        .map(
          key => `
        <option ${hashKey === key ? "selected" : ""} value="${key}">
          ${key}
        </option>
      `
        )
        .join("")}
      </div>
    </select>`;
}

const pugCodeChange$ = Observable.fromEvent(pugCodeMirror, "change");
const jsCodeChange$ = Observable.fromEvent(jsCodeMirror, "change");
Observable.merge(pugCodeChange$, jsCodeChange$).subscribe(renderCode);

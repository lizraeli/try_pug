# Try Pug - Online Pug Editor

This webapp consists of three code-editing areas: [pug](https://pugjs.org) on the left, JSON in the middle, and HTML on the right.

Write pug code in the left code-editing area, provide JSON as variable values in the middle code-editing area, and the HTML will be automatically generated on the right. The rednered HTML will appear below the code editors.

There is a drop-down list of examples at the top. By default, the `hello` example is loaded. When you chose a different example, it will be loaded automatically. This happens through a change in the windows hash. This means you can also acces an example directly by adding the hash following the webapp's address.

## Build Locally

To build locally:

```bash
npm install
npm run build
```

Then open `index.html` in the `dist` directory.

## Tech

* [Typescript](https://www.typescriptlang.org/)
* [RxJS](http://reactivex.io/rxjs/)
* [CodeMirror](https://codemirror.net/)
* [Semantic UI](https://semantic-ui.com/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)

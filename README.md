
# React Server

Univeral (isomorphic) React express app with webpack and hot module replacement

- Universal app with SSR and client side rehydration
- Hot module replacement on both server and client
- Support for ES6 & JSX with [Babel][]
- Minimal boilerplate with no other webpack loaders or configuration


## Development

```sh
npm i
npm run dev
```

## Production

```sh
npm run build && npm start
```

## How development mode works

In much the same way [Razzle][] works, development mode runs two webpack compilers.
The client compiler is passed to [koa-webpack][] to start a development server on port `3001`.
Once the client compiler has finished, the server compiler is put into watch mode.
Using the [start-server-webpack-plugin][], the server starts running on port `3000`.
Opening `http://localhost:3000` in a browser will make a request from the server and get `http://localhost:3001/main.js` for the client side app, which will rehydrate the server side HTML.
Both the server and the client use `App.js` for rendering the body.

When any of the source files change, webpack's hot module replacement will update both the server and client bundles.

### Credits

Lots of ideas stolen directly from [Razzle][]

[Razzle]: https://github.com/jaredpalmer/razzle
[Babel]: https://github.com/babel/babel
[koa-webpack]: https://github.com/shellscape/koa-webpack
[start-server-webpack-plugin]: https://github.com/ericclemmons/start-server-webpack-plugin

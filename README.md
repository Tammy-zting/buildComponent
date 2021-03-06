打包一个组件
# Remote Component Starter Kit

![Starter Kit](https://raw.githubusercontent.com/Paciolan/remote-component-starter/master/media/icon-small.png)

Starter Kit for quickly creating a Remote React Component that can be Lazily Loaded by `@paciolan/remote-component`.

## Getting Started

Clone the repository and initialize your project

```bash
# create new repo
mkdir my-component
cd my-component
git init

# pull the remote component starter kit
git pull https://github.com/Paciolan/remote-component-starter.git --depth=1
git commit --amend -m "chore: 🛠️ pull remote-component-starter"

# install dependencies
npm ci
```

Modify `package.json` and replace the starter kit values with your own.

- set `name` to the name of your project.
- set `description` to describe your project.
- set `repository` to point to your repository.
- set `license` to reflect the license of your project.

## Files

There are a few important files, one set is used for the bundle, another set for local development.

- `src/index.js` - Entrypoint of the Remote Component. The component needs to be the `default` export.
- `src/dev.js` - Entrypoint for `webpack-dev-server`. This is only used for development and will not be included in the final bundle.
- `src/index.html` - HTML for `webpack-dev-server`. This is only used for development and will not be included in the final bundle.

## Building

The bundle will be output to the `dist/main.js`.

```bash
npm run build
```

Create a development build for easier debugging.

```bash
npm run build:dev
```

## Debugging

The component can be debugged locally by starting `webpack-dev-server`. This will start and launch the entrypoint `src/dev.js`.

```bash
npm run start
```

## External Dependencies

The Remote Component is self contained with all of it's dependencies bundled with webpack. Any dependencies that will be provided by the app should be marked as `external` in the `webpack.config.js`.

In this example, `react` and `prop-types` are added to `externals`. They will not be included in the bundle. The web application is expected to provide these dependencies.

```javascript
module.exports = {
  output: {
    libraryTarget: "commonjs"
  },
  externals: {
    react: "react",
    "prop-types": "prop-types"
  }
};
```

## Commiting

Commits are added to the repository with commitizen compatible `cit-cz`.

```bash
# stage all changes
git add .

# run commitizen
npm run cz
```

## Contributors

Joel Thoms (https://twitter.com/joelnet)

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com)

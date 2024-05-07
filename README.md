# vite-plugin-vue-examples

## Issues
- Eslint package can't be updated to latest '9.x.x' version, because the package 'typescript-eslint' has eslint 8.56.x as a peer dependency. For a fresh install downgrade eslint to ^8.56.0" to get a working application again.

## Developing
[Nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is used to ensure consistency in
Node.js and npm versions. Install the specified Node.js version with the following command:
```shell
nvm install
```

The package source is located in `./package/src`, and the development app to test the package is in `./dev-app`. Before beginning development, install the npm dependencies by running:
```shell
npm install
```

### Useful commands

Rebuilding package `./package` continuously:
```shell
npm run dev -w package
```

Run dev-app `./dev-app`:
```shell
npm run dev -w dev-app
```

Run tests in watch mode:
```shell
npm run test -w package
```

Build package in `./package/dist`:
```shell
npm run build -w package
```

Run linter for all files in repository:
```shell
npm run lint
```

Automatically fix lint errors in all files in repository:
```shell
npm run fix-lint-errors
```

Verify vite-plugin-vue-examples package by linting, type checking, and running tests:
```shell
npm run verify
```

### Publishing
For continuous integration and package publishing a multistage Docker build is used. This enables ci/cd execution both locally and on a ci server.

Building the Docker image will install dependencies, verify code, and build the package:
```shell
docker build -t publish_vue_examples .
```

Running the Docker image will publish the package to npm:
```shell
docker run -e NPM_AUTH_TOKEN="<Npm Auth Token>" publish_vue_examples
```

### Updating Dependencies

Check for updated dependencies
```shell
npx npm-check-updates
```

Update version in package.json
```shell
npx npm-check-updates -u
```

Updated modules and package-lock file
```shell
npm update
```
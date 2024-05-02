# vite-plugin-vue-examples

## Issues
- Eslint package can't be updated to latest '9.x.x' version, because the package 'typescript-eslint' has eslint 8.56.x as a peer dependency. For a fresh install downgrade eslint to ^8.56.0" to get a working application again.

## Development

Install nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

Install and initialize node with version used in project
```
nvm install
npm install
```

Run example app locally
```
npm run dev
```

Build app locally (bundle will be created in `/dist` folder)
```
npm run build
```

Check code format issues
```
npm run lint
```

Fix automatically fixable format/lint issues
```
npm run fix-lint-errors
```

Check typescript types
```
npm run check-types
```

Run vitest test runner in watch mode
```
npm run test
```

Check format/lint issues, typescript types and run tests
```
npm run verify
```

### Continuous integration and publishing
For continuous integration and package publishing a multistage Docker build is used. this enables ci/cd execution both locally and on a ci server.

Install dependencies:
```shell
docker build -t publish_vue_examples --target install_dependencies .
```

Verify package:
```shell
docker build -t publish_vue_examples --target verify .
```

Build package:
```shell
docker build -t publish_vue_examples --target build .
```

Publish package:
```shell
docker build -t publish_vue_examples .
docker run -e NPM_AUTH_TOKEN="<Npm Auth Token>" publish_vue_examples
```

### Dependencies

Check for updated dependencies
```
npx npm-check-updates
```

Update version in package.json
```
npx npm-check-updates -u
```

Updated modules and package-lock file
```
npm update
```
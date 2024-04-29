# vite-plugin-vue-examples

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

### Publish

```sh
docker build -t publish_vue_examples --progress plain .
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
# Hiking My Desk - The Blog

![Published](https://github.com/crfroehlich/blog/workflows/Publish/badge.svg)|![CodeQL](https://github.com/crfroehlich/blog/workflows/CodeQL/badge.svg)
This is the repo behind [the blog](https://blog.luddites.me).

## Attributions

First

## `package.json` scripts

- `yarn build`: Produces the production build of the site
- `yarn build:codegen`: Generate schema from GraphQL interfaces
- `yarn build:prep`: Preps the codebase for building
- `yarn clean`: Purges all temporary and generated folders/content
- `yarn debug:dev`: Start the app in development mode with the debugger attached
- `yarn debug:prod`: Start the app in production mode with the debugger attached
- `yarn deploy`: Publish the app to Github Pages
- `yarn docs:standardize`: Creates or updates a new readme with a standard set of readme sections, including a toc, yarn script documentation, links to repo documentation files and "The Unlicense" license.
- `yarn lint`: Lints the codebase.
- `yarn lint:md`: Runs lint rules on the Markdown content
- `yarn lint:pretty`: Run prettier rules and automatically fix content
- `yarn lint:sort`: Sorts all tracked JSON files
- `yarn lint:ts`: Runs ESLint on the TypeScript files
- `yarn lint:type-check`: Runs the tsc compiler against the code
- `yarn serve`: Starts the app in production mode
- `yarn start`: Starts the app in development mode

## Environment Variables

- `GATSBY_ALGOLIA_ADMIN_API_KEY`: Algolia Search Admin API Key
  - Default Value: "x"
- `GATSBY_ALGOLIA_APPLICATION_ID`: Algolia Search Application Id
  - Default Value: "x"
- `GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY`: Alogolia Search API Key
  - Default Value: "x"
- `DOCS_CREATE_README_INDEX`: If true, creates an index in the main README file for all markdown content
  - Default Value: "true"
- `DOCS_CREATE_TOC`: If true, create a Table of Contents for each markdown file
  - Default Value: "false"
- `GH_ACCESS_TOKEN`: A read-write access token used for CI/CD
  - Default Value: "x"
- `IGNORE_MARKDOWN_FILES`: A comma-delimited list of markdown files to exclude from processing
  - Default Value: ".yarn,.vscode,.github,.tmp,temp,node_modules,.git,.cache,public"
- `IGNORE_PEER_DEPENDENCIES`: A list of packages to exclude from peer dependencies.
  - Default Value: ""
- `NODE_ENV`: Environment. Options are: dev, test and prod.
  - Default Value: "dev"
- `SYNC_PEER_DEPENDENCIES`: If true, sets all project dependencies as peer dependencies
  - Default Value: "false"

## License

See [License](./LICENSE)
© [CRF](https://blog.luddites.me)

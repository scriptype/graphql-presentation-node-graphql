# Node-GraphQL

[![Travis build badge](https://api.travis-ci.org/scriptype/graphql-presentation-node-graphql.svg?branch=master&status=passed)](https://travis-ci.org/github/scriptype/graphql-presentation-node-graphql)

This is the GraphQL API that talks to an existing REST API. It's built on Node.js. You can check out the [presentation!](https://slides.com/mustastum/react-graphql)

In short:

- A REST API url should be supplied from .env file
- Server is implemented using Express with express-graphql middleware.
- Written in Typescript
- Uses nodemon to auto-refresh the server on changes in local development.
- Uses morgan for logging to stdout
- Uses prettier, husky and lint-staged to ensure coding standards are intact.
- It has a Dockerfile, so it can be `docker-compose`d by the [Hub](https://github.com/scriptype/graphql-presentation-hub).

## Development

After cloning the repo, and changing directory to node-graphql, run the following commands:

```sh
# Replace the placeholder with the actual REST API url
echo "API_BASE_URL=<REST_URL>" > .env

# Install dependencies
npm install

# Start the local development server
npm start
```

Then the server should start on http://localhost:4000.

`GraphiQL` UI can be accessed at http://localhost:4000/graphql

## Deployment

Pushing to master branch will trigger a deployment job in Travis. Production
environment is handled by the [Hub](https://github.com/scriptype/graphql-presentation-hub).

In case you want to deploy this separately, you can run the following commands to
start the server in production mode:

```sh
# Typescript should compile the source code and output the result into build folder
NODE_ENV=production npm run build

# Start the compiled server in production mode
NODE_ENV=production npm run start-prod
```

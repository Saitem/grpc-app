# grpc-app
# grpc-app

# Production start

- `docker-compose up -d`

# Local start

- `npm start apps/path/to/service/app.ts`

Example: `npm start apps/gateway/src/app.ts`

# Usage run.js script
### Show all apps

- `node ./run.js apps:list`

### Build apps

- `node ./run.js apps:build`

### Add new app (microservice)

- `node ./run.js apps:new <new app name>`

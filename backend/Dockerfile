FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY tsconfig.json ./tsconfig.json
COPY data ./data
COPY src ./src
RUN npm run build
RUN npm prune --omit=dev

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/data ./data
EXPOSE 4000
CMD ["node", "dist/server.js"]


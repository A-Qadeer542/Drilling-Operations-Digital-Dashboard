FROM node:18-alpine AS base
WORKDIR /app
ARG VITE_GRAPHQL_HTTP=http://backend:4000/graphql
ARG VITE_GRAPHQL_WS=ws://backend:4000/graphql
ENV VITE_GRAPHQL_HTTP=$VITE_GRAPHQL_HTTP
ENV VITE_GRAPHQL_WS=$VITE_GRAPHQL_WS
COPY package.json package-lock.json* ./
RUN npm install
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
EXPOSE 4173
CMD ["npm", "run", "preview"]



FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG VITE_SITE_URL=""
ARG VITE_PUBLIC_INDEXING="false"
ARG VITE_CONTACT_EMAIL=""
ARG VITE_CONTACT_PHONE=""
ARG VITE_CONTACT_ADDRESS=""
ARG VITE_CONTACT_HOURS=""
ARG VITE_API_BASE=""
ENV VITE_SITE_URL=$VITE_SITE_URL VITE_PUBLIC_INDEXING=$VITE_PUBLIC_INDEXING VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL VITE_CONTACT_PHONE=$VITE_CONTACT_PHONE VITE_CONTACT_ADDRESS=$VITE_CONTACT_ADDRESS VITE_CONTACT_HOURS=$VITE_CONTACT_HOURS VITE_API_BASE=$VITE_API_BASE
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=8080
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json /app/server.js ./
COPY --from=build --chown=node:node /app/server ./server
COPY --from=build --chown=node:node /app/shared ./shared
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD node -e "fetch('http://127.0.0.1:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]

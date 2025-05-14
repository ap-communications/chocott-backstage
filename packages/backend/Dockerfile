FROM node:24-bookworm-slim AS base

# Set up a virtual environment for mkdocs-techdocs-core.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-venv python3-pip  g++ build-essential && \
    rm -rf /var/lib/apt/lists/*
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip3 install mkdocs mkdocs-techdocs-core
RUN yarn config set python /usr/bin/python3

# Stage 1 - Create yarn install skeleton layer
FROM base AS packages

WORKDIR /app
COPY package.json yarn.lock ./

COPY packages packages

# Comment this out if you don't have any internal plugins
COPY plugins plugins

RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -exec rm -rf {} \+

# for yarn3
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY backstage.json ./

# Stage 2 - Install de`endencies and build packages
FROM base AS build


# Install sqlite3 dependencies. You can skip this if you don't use sqlite3 in the image,
# in which case you should also move better-sqlite3 to "devDependencies" in package.json.
# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
#     --mount=type=cache,target=/var/lib/apt,sharing=locked \
#     apt-get update && \
#     apt-get install -y --no-install-recommends libsqlite3-dev

USER node
WORKDIR /app

COPY --from=packages --chown=node:node /app .

# Stop cypress from downloading it's massive binary.
ENV CYPRESS_INSTALL_BINARY=0
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --immutable --network-timeout 600000

COPY --chown=node:node . .
RUN cp ./app-config.chocott-production.yaml ./app-config.production.yaml && \
    rm ./app-config.chocott-production.yaml

RUN yarn tsc
RUN yarn --cwd packages/backend build
# If you have not yet migrated to package roles, use the following command instead:
# RUN yarn --cwd packages/backend backstage-cli backend:bundle --build-dependencies

RUN mkdir packages/backend/dist/skeleton packages/backend/dist/bundle \
    && tar xzf packages/backend/dist/skeleton.tar.gz -C packages/backend/dist/skeleton \
    && tar xzf packages/backend/dist/bundle.tar.gz -C packages/backend/dist/bundle

# Stage 3 - Build the actual backend image and install production dependencies
FROM base


# Install sqlite3 dependencies. You can skip this if you don't use sqlite3 in the image,
# in which case you should also move better-sqlite3 to "devDependencies" in package.json.
# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
#     --mount=type=cache,target=/var/lib/apt,sharing=locked \
#     apt-get install -y --no-install-recommends libsqlite3-dev

# From here on we use the least-privileged `node` user to run the backend.
USER node

# This should create the app dir as `node`.
# If it is instead created as `root` then the `tar` command below will fail: `can't create directory 'packages/': Permission denied`.
# If this occurs, then ensure BuildKit is enabled (`DOCKER_BUILDKIT=1`) so the app dir is correctly created as `node`.
WORKDIR /app

# Copy the install dependencies from the build stage and context
COPY --from=build --chown=node:node /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton/ ./

# Copy the yarn dependencies from the build stage and context
COPY --from=build --chown=node:node /app/.yarn ./.yarn
COPY --from=build --chown=node:node /app/.yarnrc.yml  ./
COPY --from=build --chown=node:node /app/backstage.json  ./

RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"

# Copy the built packages from the build stage
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./

# Copy any other files that we need at runtime
COPY --chown=node:node app-config.yaml ./
COPY --chown=node:node app-config.chocott-production.yaml ./app-config.production.yaml

# Copy sample catalog files
COPY --chown=node:node examples/ ./examples/


# This switches many Node.js dependencies to production mode.
ENV NODE_ENV=production
# When using Node.js version 20 or newer, the scaffolder backend plugin requires that it be started with the --no-node-snapshot option. 
# Make sure that you have NODE_OPTIONS=--no-node-snapshot in your environment
ENV NODE_OPTIONS=--no-node-snapshot

ENTRYPOINT [ "node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml" ]

# CMD ["node", "packages/backend", "--config", "app-config.yaml"]
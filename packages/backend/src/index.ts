/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createBackend } from '@backstage/backend-defaults';
import { ConfigSources } from '@backstage/config-loader';

/*
 * 実行時に有効にするPluginを判定するため、独自にConfiguration filesの読み込みを行っています。
 * 通常は必要とするPluginだけをImportするため、
 * ```typescript
 * const backend = createBackend();
 * ...
 * backend.start(); 
 * ```
 * の指定だけで問題ありません。
 */
const source = ConfigSources.default({});
ConfigSources.toConfig(source).then(config => {
  const backend = createBackend();

  backend.add(import('@backstage/plugin-app-backend/alpha'));
  
  // auth plugin
  backend.add(import('@backstage/plugin-auth-backend'));
  // See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
  backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

  // catalog plugin
  backend.add(import('@backstage/plugin-catalog-backend/alpha'));
  backend.add(import('@backstage/plugin-catalog-backend-module-github/alpha'));
  backend.add(import('@backstage/plugin-catalog-backend-module-github-org'));
  backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));

  // permissions plugin
  backend.add(import('@backstage/plugin-permission-backend/alpha'));
  backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);
  
  backend.add(import('@backstage/plugin-proxy-backend/alpha'));
  
  backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
  
  backend.add(import('@backstage/plugin-search-backend/alpha'));
  backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
  backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));
  if (config.getOptionalConfig('search.pg')) {
    backend.add(import('@backstage/plugin-search-backend-module-pg/alpha'));
  }
  
  backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
  
  backend.start();
});

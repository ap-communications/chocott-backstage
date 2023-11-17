import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { GithubMultiOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-github';
import { Config } from '@backstage/config';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { Router } from 'express';
import { Logger } from 'winston';
import { PluginEnvironment } from '../types';

interface GitHubProviderEnvironment {
  config: Config;
  logger: Logger;
  scheduler:  PluginTaskScheduler;
};

export function githubOrgProviderOption(env: GitHubProviderEnvironment) {
  const gitHubOrgConfig = env.config?.getOptionalConfig('catalog.providers.githubOrg');
  if (!gitHubOrgConfig) {
    return undefined;
  }
  return {
    id: gitHubOrgConfig.getString('id'),
    githubUrl: gitHubOrgConfig.getOptionalString('githubUrl') ?? 'https://github.com',
    // Set the following to list the GitHub orgs you wish to ingest from. You can
    // also omit this option to ingest all orgs accessible by your GitHub integration
    orgs: gitHubOrgConfig.getOptionalStringArray('orgs') ?? [],
    logger: env.logger,
    schedule: env.scheduler.createScheduledTaskRunner({
      frequency: { minutes: 60 },
      timeout: { minutes: 15 },
      initialDelay: { seconds: 15 }      
    }),
  };
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const gitHubProviderOption = githubOrgProviderOption(env);
  const providers = gitHubProviderOption ? [GithubMultiOrgEntityProvider.fromConfig(env.config, gitHubProviderOption)] : [];
  const builder = await CatalogBuilder.create(env)
  builder
    .addProcessor(new ScaffolderEntitiesProcessor())
    .addEntityProvider(providers);
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}

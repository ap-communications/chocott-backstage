import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import {
  authProvidersExtensionPoint,
  commonSignInResolvers,
  createOAuthProviderFactory
} from '@backstage/plugin-auth-node';
import {
  githubAuthenticator,
  githubSignInResolvers
} from '@backstage/plugin-auth-backend-module-github-provider';
import { githubAsGuestSigninResolvers } from './resolvers';

export const authModuleGithubAsGuestProvider = createBackendModule({
  pluginId: 'auth',
  moduleId: 'github-as-guest-provider',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger,
        providers: authProvidersExtensionPoint
      },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'github',
          factory: createOAuthProviderFactory({
            authenticator: githubAuthenticator,
            signInResolverFactories: {
              ...githubAsGuestSigninResolvers,
              ...githubSignInResolvers,
              ...commonSignInResolvers,
            }
          }),
        });
      },
    });
  },
});

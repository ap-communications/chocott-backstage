import { createSignInResolverFactory } from '@backstage/plugin-auth-node';

export namespace githubAsGuestSigninResolvers {
  export const allMatchersAsGuest = createSignInResolverFactory({
    create() {
      return async (_, ctx) => {
        const userRef = 'user:default/guest';
        return ctx.issueToken({
          claims: { sub: userRef, ent: [userRef] },
        })
      };
    }
  });
};

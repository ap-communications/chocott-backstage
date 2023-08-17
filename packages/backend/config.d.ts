export interface Config {
  catalog?: {
    providers?: {
      /**
       * for GitHub Multiple organizations entity provider
       */
      githubOrg?: {
        [name: string]: {
          /**
           * unique stable identifier for this provider
           * @example "production"
           */
          id: string;
          /**
           * gitHub url needs to match a configuraton integrations.github entry
           * 
           * @defaultValue "https://github.com"
           * @example "https://github.com"
           */
          githubUrl?: string;
          /**
           * The list of the GitHub orgs to consume. By default will consume all accessible
           * orgs on the given GitHub instance (support for GitHub App integration only).
           * @example ["org-a", "org-b"]
           */
          orgs?: Array<string>;            
        }
      }
    }
  }
}
  
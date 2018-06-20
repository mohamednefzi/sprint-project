interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'gxBxzpLOV3FvDQrQctODHhWqSJvnwd4h',
  domain: 'mohamednefzi.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};

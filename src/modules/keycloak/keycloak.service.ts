import { Injectable } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakService {
  constructor() {
    KeycloakConnectModule.register({
      authServerUrl: process.env.IDP_KEYCLOAK,
      realm: process.env.IDP_REALM,
      clientId: process.env.IDP_CLIENT_ID,
      secret: process.env.IDP_CLIENT_SECRET,
    });
  }
}

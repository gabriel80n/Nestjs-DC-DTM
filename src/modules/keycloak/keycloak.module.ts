import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';

@Global()
@Module({
  exports: [],
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.IDP_KEYCLOAK,
      realm: process.env.IDP_REALM,
      clientId: process.env.IDP_CLIENT_ID,
      secret: process.env.IDP_CLIENT_SECRET,
    }),
  ],
  providers: [
    // check token in header and return 401
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ],
})
export class KeycloakModule {}

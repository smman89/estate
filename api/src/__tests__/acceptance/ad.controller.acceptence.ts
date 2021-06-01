// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AnyObject} from '@loopback/repository';
import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import {AccessControlApplication} from '../../';


describe('AccessControlApplication - permissions', () => {
  let app: AccessControlApplication;
  let client: Client;
  let token: string;

  before(givenRunningApplication);

  before(() => {
    client = createRestAppClient(app);
  });
  after(async () => {
    process.env.SEED_DATA = undefined;
    await app.stop();
  });

  const USER_CREDENTIAL_MAPPING: AnyObject = {
    admin: ['username', 'username'],
  };

  context('admin', () => {
    const permissions = {
      view: true,
      create: true,
      update: true,
      delete: true,
    };
    testPermission('admin', permissions);
  });


  context('anonymous', () => {
    const permissions = {
      view: true,
      create: false,
      update: false,
      delete: false,
    };
    testPermission('anonymous', permissions);
  });

  /**
   * Test a role's permission when visit the 5 endpoints in the
   * ad controller
   * @param role
   * @param permissions
   */
  function testPermission(
    role: string,
    permissions: {[operation: string]: boolean},
  ) {
    it(`role ${role} login successfully`, async () => {
      const credentials = USER_CREDENTIAL_MAPPING[role];
      // for anonymous user
      if (!credentials) return;

      const res = await client
        .post('/api/users/login')
        .send({username: credentials[0], password: credentials[1]})
        .expect(200);

      token = res.body.token;
    });

    it(`view returns ${permissions.view} for role ${role}`, async () => {
      const errorCode = role === 'anonymous' ? 401 : 403;
      const expectedStatus = permissions.view ? 200 : errorCode;

      if (role === 'anonymous') {
        await client.get('/api/ads').expect(expectedStatus);
        return;
      }

      await client
        .get('/api/ads')
        .set('Authorization', 'Bearer ' + token)
        .expect(expectedStatus);
    });

    it(`delelete returns ${permissions.delete} for role ${role}`, async () => {
      const errorCode = role === 'anonymous' ? 401 : 403;
      const expectedStatus = permissions.delete ? 200 : errorCode;

      if (role === 'anonymous') {
        await client.delete('/api/ads/1').expect(expectedStatus);
        return;
      }

      await client
        .get('/api/ads')
        .set('Authorization', 'Bearer ' + token)
        .expect(expectedStatus);
    });


  }


  async function givenRunningApplication() {
    process.env.SEED_DATA = '1';
    app = new AccessControlApplication({
      rest: givenHttpServerConfig(),
    });

    app.bind('datasources.config.db').to({
      name: 'db',
      connector: 'memory',
    });

    await app.boot();
    // Start Application
    await app.start();
  }
});

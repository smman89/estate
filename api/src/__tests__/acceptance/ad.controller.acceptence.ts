// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AnyObject} from '@loopback/repository';
import {
  Client,
  createRestAppClient,
  givenHttpServerConfig, StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import {AccessControlApplication} from '../../';
import {AdController} from '../../controllers';
import {Ad} from '../../models';
import {AdRepository} from '../../repositories';




describe('AccessControlApplication - permissions', () => {
  let app: AccessControlApplication;
  let client: Client;
  let token: string;
  let adRepo: StubbedInstanceWithSinonAccessor<AdRepository>;
  let controller: AdController;
  let ad: Ad;
  let adWithId: Ad;
  let changedAd: Ad;
  let listOfAds: Ad[];



  // before(givenRunningApplication);

  // beforeEach(resetRepositories);



  before(() => {
    client = createRestAppClient(app);
  });
  after(async () => {
    process.env.SEED_DATA = undefined;
    await app.stop();
  });

  const USER_CREDENTIAL_MAPPING: AnyObject = {
    admin: ['bob@projects.com', 'opensesame'],
    owner: ['john@doe.com', 'opensesame']
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

  context('owner', () => {
    const permissions = {
      view: true,
      create: true,
      update: true,
      delete: false,
    };
    testPermission('owner', permissions);
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
   * project controller
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
        .send({email: credentials[0], password: credentials[1]})
        .expect(200);

      token = res.body.token;
    });

    // it(`list-projects returns ${permissions.list} for role ${role}`, async () => {
    //   if (role === 'anonymous') {
    //     await client.get('/list-projects').expect(200);
    //     return;
    //   }

    //   await client
    //     .get('/list-projects')
    //     .set('Authorization', 'Bearer ' + token)
    //     .expect(200);
    // });

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

    it(`create returns ${permissions.create} for role ${role}`, async () => {
      const errorCode = role === 'anonymous' ? 401 : 403;
      const expectedStatus = permissions.create ? 200 : errorCode;

      if (role === 'anonymous') {
        await client.get('/ads/1/show-balance').expect(expectedStatus);
        return;
      }

      await client
        .get('/projects/1/show-balance')
        .set('Authorization', 'Bearer ' + token)
        .expect(expectedStatus);
    });

    it(`donate returns ${permissions.donate} for role ${role}`, async () => {
      const errorCode = role === 'anonymous' ? 401 : 403;
      const expectedStatus = permissions.donate ? 204 : errorCode;

      if (role === 'anonymous') {
        await client.patch('/projects/1/donate').expect(expectedStatus);
        return;
      }

      await client
        .patch('/projects/1/donate')
        .set('Authorization', 'Bearer ' + token)
        .expect(expectedStatus);
    });

    it(`withdraw returns ${permissions.withdraw} for role ${role}`, async () => {
      const errorCode = role === 'anonymous' ? 401 : 403;
      const expectedStatus = permissions.withdraw ? 204 : errorCode;

      if (role === 'anonymous') {
        await client.patch('/projects/1/withdraw').expect(expectedStatus);
        return;
      }

      await client
        .patch('/projects/1/withdraw')
        .set('Authorization', 'Bearer ' + token)
        .expect(expectedStatus);
    });
  }

  /*
   ============================================================================
   TEST HELPERS
   These functions help simplify setup of your test fixtures so that your tests
   can:
   - operate on a "clean" environment each time (a fresh in-memory database)
   - avoid polluting the test with large quantities of setup logic to keep
   them clear and easy to read
   - keep them DRY (who wants to write the same stuff over and over?)
   ============================================================================
   */

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

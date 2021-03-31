import * as casbin from 'casbin';
import PostgresAdapter from "casbin-pg-adapter";
import path from 'path';
import {CONNECTION_STRING_PG_ESTATE} from '../../../config';

export async function getCasbinEnforcerByName(name: string): Promise<casbin.Enforcer | undefined> {
  const CASBIN_ENFORCERS: {[key: string]: Promise<casbin.Enforcer>} = {
    admin: createEnforcerByRole(),
    authenticated: createEnforcerByDenyRole(),
  };
  if (Object.prototype.hasOwnProperty.call(CASBIN_ENFORCERS, name)) return CASBIN_ENFORCERS[name];
  return undefined;
}

export async function createEnforcerByRole(): Promise<casbin.Enforcer> {
  const a = await PostgresAdapter.newAdapter({
    connectionString: CONNECTION_STRING_PG_ESTATE,
    migrate: false
  });
  const conf = path.resolve(__dirname, './../../../../fixtures/casbin/rbac_model.conf');
  return await casbin.newEnforcer(conf, a);
}

export async function createEnforcerByDenyRole(): Promise<casbin.Enforcer> {
  const a = await PostgresAdapter.newAdapter({
    connectionString: CONNECTION_STRING_PG_ESTATE,
    migrate: false
  });
  const conf = path.resolve(__dirname, './../../../../fixtures/casbin/rbac_model_deny.conf');
  return await casbin.newEnforcer(conf, a);
}

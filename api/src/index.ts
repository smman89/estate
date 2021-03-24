import {AccessControlApplication, ApplicationConfig} from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new AccessControlApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}

// re-exports for our benchmark, not needed for the tutorial itself
export * from '@loopback/rest';
export * from './application';
export * from './models';
export * from './repositories';

// Start the server when loaded via `node .`
if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 4000),
      host: process.env.HOST ?? '0.0.0.0',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

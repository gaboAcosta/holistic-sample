# HolisticJS sample output #

The only dependency for the host (there are internal dependencies) is:

<a href="https://www.docker.com/community-edition" target="_blank">Docker CE</a>

To run de project:

`yarn dev:up`

If you add dependencies or change the package.json of any of the sub projects you need to stop and run the containers again so they are built again, this is because dependencies get installed only on build, also the package.json, webpack.config.js and others are copied at build time (look inside Dockerfile, anything there is on build time only)

To test the project:

Open a browser:

`http://localhost:4000/`

To run e2e tests

`yarn e2e`

Please keep in mind, this will leave all the dependencies for e2e running, so make sure to run this after

`yarn e2e:down`

The test run will produce videos on `/e2e/src/videos`

## License
Copyright Gabriel Acosta and other contributors 2017, Licensed under [MIT][].

#HolisticJS sample output

The only dependency for the host (there are internal dependencies) is:

<a href="https://www.docker.com/community-edition" target="_blank">Docker CE</a>

To run de project:

`docker-compose up`

If you add dependencies or change the package.json of any of the sub projects you need to run:

`docker-compose up --build`

This is because dependencies get installed only on build, also the package.json, webpack.config.js and others
are copied at build time (look inside Dockerfile, anything there is on build time only)
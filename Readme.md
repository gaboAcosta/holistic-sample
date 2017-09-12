# HolisticJS sample output #

The only dependency for the host (there are internal dependencies) is:

<a href="https://www.docker.com/community-edition" target="_blank">Docker CE</a>

To run de project:

First we initializa our Mongo volume to store our data

`gulp init`

Then we start our project

`gulp`

If you add dependencies or change the package.json of any of the sub projects you need to stop and run the containers again so they are built again, this is because dependencies get installed only on build, also the package.json, webpack.config.js and others are copied at build time (look inside Dockerfile, anything there is on build time only)

To test the project:

Open a browser:

`http://localhost:4000/`

To add a new dependency through Yarn:

`gulp command`

and then

`add myDependency`

This is needed because dependencies live inside of the containers

To run tests

First make sure to build your images with the test env

`gulp build --env=test`

Then you can run your tests with

`gulp test`

Support for running tests without building comming up

Please keep in mind, this will leave all the dependencies for test running, so make sure to run this after

`gulp down --env=test`

And if you want to go back to dev mode you need to

`gulp build && gulp`

So that your dependencies are again on dev mode

The test run will produce videos on `/e2e/src/videos`

## License
Copyright Gabriel Acosta and other contributors 2017, Licensed under [MIT][].

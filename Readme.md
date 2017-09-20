# HolisticJS sample output #

The only dependency for the host (there are internal dependencies) is:

<a href="https://www.docker.com/community-edition" target="_blank">Docker CE</a>

To run the project we first initialize our MongoDB volume to store our data by running:

`gulp init`

Then we start our project:

`gulp`

If you add dependencies, or change the package.json of any of the sub projects you need to stop, and run the containers again so they get built again. This is because dependencies get installed only on build, also the package.json, webpack.config.js, and others are copied at build time (look inside Dockerfile, anything there is on build time only)

To test the project:

Open a browser:

`http://localhost:8080/`

To add a new dependency through Yarn:

`gulp command`

and then

`add myDependency`

This is needed because dependencies live inside of the containers

To run tests

First make sure to build your images with the correct env

`gulp build` to build on develop mode or `gulp build --env=production`

Then you can run your tests with

`gulp test`

Support for running tests without building coming up

When testing develop, webpack dev server takes a lot of time to compile, almost 50 seconds, but subsequent runs will use the same build or rebuilds which are a lot faster

To make it easier, you can run `gulp -e` and when asked what environment to use, select testDevelop, then wait for webpack message to say it is completed, then you can run `gulp test`, select nightwatch and tests should run a lot faster!

Please keep in mind, this will leave all the dependencies for test running, so make sure to run this after

`gulp down` and select testDevelop or testProduction depending on the environment you selected for e2e

And if you want to go back to dev mode you need to

`gulp build && gulp`

So that your dependencies are again on dev mode

The test run will produce videos on `/e2e/src/videos`

TUTORIAL

Checkout the PR for the movie section to get a better idea of the flow to add things to your system:

https://github.com/gaboAcosta/holistic-sample/pull/34

https://github.com/gaboAcosta/holistic-sample/pull/35

https://github.com/gaboAcosta/holistic-sample/pull/36

https://github.com/gaboAcosta/holistic-sample/pull/37

https://github.com/gaboAcosta/holistic-sample/pull/38


Here you can see a PR with all the changes in one!

https://github.com/gaboAcosta/holistic-sample/pull/41


## License
Copyright Gabriel Acosta and other contributors 2017, Licensed under [MIT][].

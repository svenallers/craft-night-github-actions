# craft-night-github-actions

In this workshop we want to setup a repository with an arbitrary project and perform some tasks on it using github actions. You can use github actions to build your software, to deploy an application or many other things. The trigger for these actions can be different events like a `git push` or a created pull request.

## Preperation and requirements
You will only need a github account and an editor. If you have a project hosted at github you can also use this. You do not need a paid account. Github actions is included in the free account and you can use up to 2000 action minutes per Month for free.

Please make sure you have a repository you can use or fork this one.

## Creating a simple action
We will first create an action workflow without using a template. Please create a branch `github-actions` and enable an action workflow by placing a file in the  directory `.github/workflows/`. You can choose whatever name you want, but it has to be a `.yml` file. Example: `.github/workflows/build.yml`.

A workflow can have multiple jobs and every job can execute multiple steps, which consist of multiple actions and is triggered by events. But first we will name the workflow:

```
name: Silpion Craft-Night example
```

Then we need to define on which events we want the workflow to be executed:

```
on: pull_request
```

By default this triggers the workflow, whenever a PR is created, synchonized (something is pushed into the branch) or reopened. But you can add types, if needed:

```
on:
  pull_request:
      types: [ opened, edited, synchronize, reopened ]
```

You can also define multiple events or a webhook to trigger the workflow. But we will come to that later.

Now lets define a Job and a step to test, that our setup works:

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: print something
        run: ls
```

With this snippet we defined a job called `build`, that runs on the latest ubuntu, checks out the repo and lists the files in the repository. In order to test this push the branch and create a PR. You should then see a check on your PR. Open the details and check the output. 

In order to do something useful, like executing some tests or start a build please create a project in this repository and adjust the build file to execute tests and build (if needed). To make it easy lets create an npm project with jest to execute a test:

```
npm init
```

Answer all the questions and add jest and npx as a dependency

```
npm install -s jest npx
```

Now add a test file `test.spec.js` and put a simple test there. Please write a test that fails to make the failing test visible in your PR:

```
describe('example', function() {
  it('should execute a test', function() {
    expect(true).toBe(false)
  })
})

```

Now run the test to make sure, it is executed and fails:

```
npx jest
```

The test should fail, as we expected `true` to be `false`. 

### Task 
Alter your build.yml and make sure the tests are executed in your build job. Commit and push the changes, create a PR and take a look at your build. You should find the failing test there. Then make sure, the failed test is also reflected in your PR.

## Using secrets
Everybody has secrets, rights? Sometimes we need the SSH Key to be confidential and sometimes it is an access token for a repository or some user credentials to download something we need for our application. We can store a secret in either the github organization or the repository. To store a secret in the repository open the Settings and go to Secrets. Create a new repository secret `test` and set the Value to `42`.

Now you can use this secret in your workflow file (in our case the build.yml) like this:

```
${{ test }}
```

But what, if you want to use it in a build script? You can set it as an environment variable:

```
 - name: Steup name
        env:
          super_secret: ${{ secrets.SUPERSECRET }}
```          

This environment variable will be available in the step (not the job!) you defined it for. Having a separate step to setup your environment sectes does not work!

### Task
Setup a secret and use this secret in a jest test. To access an environment variable in javascript use `process.env.<VARIABLE_NAME>`


## Build matrix
When building a product that might be used in different environments by the customer (e.g. on different JVM or Node Version) we would like to make sure, that the product we build works in for all versions, we promised the customer.

In order to execute a build for different versions of node add the following to the file:

```
...
    runs_on: ubuntu-latest
    strategy:
      matrix:
        node: [8, 10, 12]
...
``` 

Add this to the `build.yml`, commit and push this and create a PR. Take a look at your checks. There should be three builds running, for node 8, 10 and 12. 


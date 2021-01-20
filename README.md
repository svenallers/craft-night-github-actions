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

In order to do something useful, like executing some tests or start a build please create a project in this repository and adjust the build file to execute tests and build (if needed). To make 

## Triggering with a webhook


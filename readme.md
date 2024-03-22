# My implementation of the svelte todo app

Trying to develop a sense for good practices through following [the mdn tutorial on svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started) and building on top of it.

The source code, which this repo is a fork of, can be found at <https://github.com/opensas/mdn-svelte-tutorial>.

There are two svelte apps in this repo, each under their own directory:

1. `/02-starting-our-todo-app`
2. `/todo-app-typescript`

The two are intended to be functionally identical, but with architectural / tooling differences.

The first contains a svelte project, with svelte version 3 (and slightly older versions of the related packages) and additional javascript. The second contains a svelte project with sveltekit (svelte version 4) and typescript, hence the directory name.

After choosing which project to use, run

```bash
npm install
```

inside the corresponding directory to install the dependencies and then run

```bash
npm run dev
```

to start the development server.

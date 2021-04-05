let exampleOnResolvePlugin = {
    name: 'example',
    setup(build) {
        let path = require('path')

        // Redirect all paths starting with "images/" to "./public/images/"
        build.onResolve({ filter: /^react$/ }, args => {
            return { path: "preact/compat" }
        })

        // Mark all paths starting with "http://" or "https://" as external
        build.onResolve({ filter: /^react$/ }, args => {
            return { path: "preact/compat" }
        })
    },
}

const pages = require("glob").sync('src/pages/**/*.tsx');
const {build, serve} = require('esbuild');
serve({servedir: "www"}, {
    entryPoints: ['src/index.tsx', 'src/vendors.tsx', ...pages],
    bundle: true,
    splitting: true,
    format: "esm",
    outdir: 'www/dist',
    plugins: [exampleOnResolvePlugin],
    chunkNames: "[name]-[hash]",
}).catch(() => process.exit(1))
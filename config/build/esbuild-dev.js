const ESBuild = require('esbuild')
const path = require('path')
const config = require('./esbuild-config')

const PORT = Number(process.env.PORT) || 3000;

let ctx = ESBuild.context({
    ...config
}).then(ctx => {
    ctx.watch({})
    ctx.serve({
        servedir: config.outdir,
        port: PORT
    }).then(() => {
        console.log('server started on http://localhost:' + PORT)
    }).catch(err => console.log(err))
})

// const http = require("http");
// const ESBuild = require('esbuild');
// const path = require('path');
// const config = require('./esbuild-config');
// const { stringify } = require('querystring');
//
// const port = process.env.PORT || 3030;
//
// const serve = async (listen) => {
//     const context = await ESBuild.context(config);
//     // Start esbuild's local web server. Random port will be chosen by esbuild.
//     const { host, port } = await context.serve({ servedir: config.outdir }, {});
//
//     // Create a second (proxy) server that will forward requests to esbuild.
//     const proxy = http.createServer((req, res) => {
//         // forwardRequest forwards an http request through to esbuid.
//         const forwardRequest = (path) => {
//             const options = {
//                 hostname: 'localhost',
//                 port: 3030,
//                 path,
//                 method: req.method,
//                 headers: req.headers,
//             };
//
//             const proxyReq = http.request(options, (proxyRes) => {
//                 if (proxyRes.statusCode === 404) {
//                     // If esbuild 404s the request, assume it's a route needing to
//                     // be handled by the JS bundle, so forward a second attempt to `/`.
//                     return forwardRequest("/");
//                 }
//
//                 // Otherwise esbuild handled it like a champ, so proxy the response back.
//                 res.writeHead(proxyRes.statusCode, proxyRes.headers);
//                 proxyRes.pipe(res, { end: true });
//             });
//
//             req.pipe(proxyReq, { end: true });
//         };
//
//         // When we're called pass the request right through to esbuild.
//         forwardRequest(req.url);
//     });
//
//     // Start our proxy server at the specified `listen` port.
//     proxy.listen(listen);
// };
//
// (async () => {
//     // const context = await ESBuild.context(config);
//     // context
//     //   .serve({
//     //     servedir: config.outdir,
//     //     port,
//     //   })
//     //   .then(() => {
//     //     console.log(`Development server is running on http://10.130.6.34:${port}`);
//     //   })
//     //   .catch((err) => {
//     //     console.log("error ==>", err)
//     //     process.exit(1);
//     //   });;
//     serve(3030);
// })();

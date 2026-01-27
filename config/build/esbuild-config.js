const path = require('path');

const mode = process.env.MODE || 'production'

const isProd = mode === 'production'

module.exports = {
    outdir: path.resolve(__dirname, '..', '..', 'build'),
    entryPoints: [path.resolve(__dirname, '..', '..', 'src', 'index.jsx')],
    entryNames: 'index',
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    loader: {
        '.png': 'file',
        '.svg': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
    }
}

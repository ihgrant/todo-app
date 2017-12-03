var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    entry: "./app.ts",
    module: {
        loaders: [
            // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "index_bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({ title: "todo" })],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"] // note if using webpack 1 you'd also need a '' in the array as well
    }
};

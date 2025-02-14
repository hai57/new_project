const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const fs = require("fs");
const webpack = require("webpack");
const path = require("path");
const directoryPath = path.resolve("public");

const handleDir = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject("Unable to scan directory: " + err);
            }
            resolve(files);
        });
    });
};

module.exports = async (env, args) => {
    const isDev = args.mode === "development";
    const dirs = await handleDir();
    const copyPluginPatterns = dirs
        .filter((dir) => dir !== "index.html")
        .map((dir) => {
            return {
                from: dir,
                to: "",
                context: path.resolve("public"),
            };
        });
    const basePlugins = [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html",
            favicon: "public/logo.ico",
            minify: {
                removeAttributeQuotes: true, //Remove double quotes from html
                collapseWhitespace: true, //Fold into a line
            },
            hash: true,
        }),
        new CopyPlugin({
            patterns: copyPluginPatterns,
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? "[name].css" : "static/css/[name].[contenthash:6].css",
        }),
    ];

    const devPlugins = [...basePlugins, new ProgressBarPlugin({ width: "50" }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()];
    const prodPlugins = [...basePlugins, new ProgressBarPlugin({ width: "50" }), new CleanWebpackPlugin()];

    return {
        mode: isDev ? "development" : "production",
        entry: "./src/index.tsx",
        target: isDev ? "web" : "browserslist",
        module: {
            // loaders: [
            //     {
            //         exclude: /node_modules(?!\/quill)/,
            //         loader: "babel",
            //         query: {
            //             presets: ["react", "es2015", "stage-1"],
            //         },
            //     },
            // ],
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                compilerOptions: {
                                    noEmit: false,
                                },
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.js$/,
                //     use: [
                //         {
                //             loader: "babel-loader",
                //             options: {
                //                 presets: ["@babel/preset-env"],
                //                 plugins: ["@babel/plugin-syntax-dynamic-import"],
                //             },
                //         },
                //     ],
                //     exclude: /node_modules/,
                // },
                // {
                //     test: /.js$/,
                //     use: ["source-map-loader"],
                //     enforce: "pre",
                // },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: { sourceMap: isDev ? true : false },
                        },
                    ],
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: isDev ? "[path][name].[ext]" : "static/fonts/[name].[ext]",
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.(png|svg|jpg|gif|ico|jpeg)$/,
                //     use: [
                //
                //     ],
                //     exclude: /node_modules/,
                // },
                {
                    test: /\.(png|svg|jpg|gif|ico|jpeg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000 /* nếu dưới 10000 bytes thì tự động chuyển về base64*/,
                                name: isDev ? "[path][name].[ext]" : "assets/images/[name].[contenthash:6].[ext]",
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
            // modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
            modules: ["src", "node_modules"],
            alias: {
                esri: path.resolve(__dirname, "node_modules/arcgis-js-api/"),
                "dom-helpers/addClass": path.resolve(__dirname, "node_modules/dom-helpers/class/addClass"),
                "dom-helpers/removeClass": path.resolve(__dirname, "node_modules/dom-helpers/class/removeClass"),
            },
        },
        plugins: isDev ? devPlugins : prodPlugins,
        cache: true,
        devtool: false,
        // devServer: {
        //     contentBase: "public",
        //     port: 3000,
        //     hot: true,
        //     historyApiFallback: {
        //         disableDotRule: true,
        //     },
        // },
        output: {
            path: path.resolve("build"),
            publicPath: "/",
            filename: "static/js/main.[contenthash:6].js",
            environment: {
                arrowFunction: false,
                bigIntLiteral: false,
                const: false,
                destructuring: false,
                dynamicImport: false,
                forOf: false,
                module: false,
            },
        },
        performance: {
            hints: false,
            maxEntrypointSize: 800000, //  Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
            ],
        },
    };
};

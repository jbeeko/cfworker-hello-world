module.exports = env => {
    return {
        entry: {worker: ['./Worker.fsproj']},
        target: 'webworker',
        output: {
            path: __dirname + '/worker',
        },
        mode: "production",
        resolve: {
            // See https://github.com/fable-compiler/Fable/issues/1490
            symlinks: false
        },
        plugins: [ ],
        module: {
            rules: [
                // - fable-loader: transforms F# into JS
                {
                    test: /\.fs(x|proj)?$/,
                    use: {
                        loader: "fable-loader",
                        options: {
                            babel: {
                                // More info at https://github.com/babel/babel/blob/master/packages/babel-preset-env/README.md
                                presets: [
                                    ["@babel/preset-env", {
                                        "modules": false,
                                        "useBuiltIns": false,
                                        "loose": true,
                                        // Use babel-preset-env to generate JS compatible with latest Chrome V8
                                        "targets": "last 2 Chrome versions"}
                                    ]
                                ]
                            }
                        }
                    }
                }
            ]
        }
    }
}


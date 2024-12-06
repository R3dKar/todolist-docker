import path from 'node:path';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = import.meta.dirname;

const config = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [ { from: path.resolve(__dirname, './src/index.html'), to: path.resolve(__dirname, './dist/') } ]
        })
    ]
};

export default (env, argv) => {
    if (argv.mode !== undefined)
        config.mode = argv.mode;
    else
        config.mode = 'production';

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.devServer = {
            static: {
                directory: path.resolve(__dirname, './dist/')
            },
            compress: true,
            port: 8000
        };        
    }

    return config;
}
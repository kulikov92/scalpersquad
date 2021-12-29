import TerserJSPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default {
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!profile.json',
                '!tsconfig.tsbuildinfo',
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({})]
    }
}
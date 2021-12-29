import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {
    port
} from './conf/server.js'

export default {
    devtool: 'cheap-module-source-map',
    plugins: [
        new ReactRefreshWebpackPlugin()
    ],
    devServer: {
        port,
        historyApiFallback: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        hot: true,
        compress: true,
        open: true,
        client: {
            progress: true,
            overlay: true
        }
    }
}
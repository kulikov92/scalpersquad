import { merge } from 'webpack-merge'
import { isProd } from './webpack/utils/env.js'
import baseConfig from './webpack/base.js'
import devConfig from './webpack/dev.js'
import prodConfig from './webpack/prod.js'

export default () => isProd ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig)
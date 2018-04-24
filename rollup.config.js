// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/es6/src/index.js',
  moduleName: 'index',
  output: {
    file: 'index.bundle.js',
    format: 'iife'
  },
  plugins: [ resolve() ]
};

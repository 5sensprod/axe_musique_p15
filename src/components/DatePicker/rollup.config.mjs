import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'

const config = {
  input: 'src/index.jsx', // Votre point d'entrée
  output: {
    file: 'dist/index.js', // Fichier de sortie
    format: 'cjs',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    postcss({
      extract: false, // cela injecte le CSS dans le JavaScript
      modules: true, // utilise CSS Modules
      use: ['sass'], // ajoute sass
    }),
    image(),
    json(),
  ],
  external: ['react', 'react-dom'],
}

export default config

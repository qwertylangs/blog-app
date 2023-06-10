import { ResolveOptions } from 'webpack';
import path from 'path';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      widgets: path.resolve(__dirname, 'src/widgets'),
    },
  };
}

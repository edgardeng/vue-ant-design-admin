import type {UserConfig, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path' // @types/node: 16.11.7
import { viteMockServe } from 'vite-plugin-mock';


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({command, mode}: ConfigEnv): UserConfig => {
    console.log('command', command, 'mode',mode)
    return {
        server: {
            host: true,
            port: 3000,
            // proxy: createProxy(VITE_PROXY),
        },
        plugins: [
            vue(),
            viteMockServe({
                // default
                mockPath: 'src/mock',
                localEnabled: command === 'serve',
            }),],
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                }
            ]
        }
    }
}

import type {UserConfig, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path' // @types/node: 16.11.7

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({command, mode}: ConfigEnv): UserConfig => {
    return {
        server: {
            host: true,
            port: 3000,
            // proxy: createProxy(VITE_PROXY),
        },
        plugins: [vue()],
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

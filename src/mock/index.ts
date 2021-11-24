import {MockMethod} from 'vite-plugin-mock';
import auth from './service/auth'

export default [
    ...auth,
] as MockMethod[];
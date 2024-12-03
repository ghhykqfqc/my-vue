import {createPinia} from 'pinia';
 
const Pinia = createPinia();
 
//导出单独的store
export {useUserStore} from './modules/user';
 
//导出Pinia实例
export default Pinia;
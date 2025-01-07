import { ElMessage } from 'element-plus';
import type { messageType } from 'element-plus';

const showMsg = (msg: string, type: messageType): void => {
    ElMessage({
      message: msg,
      type: type,
      duration: 1000,
    });
}

export { showMsg }
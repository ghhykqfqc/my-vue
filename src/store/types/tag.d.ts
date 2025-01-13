// 定义标签的类型接口
import type { TagProps } from 'element-plus'

export interface TagType {
    name: string;
    path: string;
    type: TagProps['type'];
}
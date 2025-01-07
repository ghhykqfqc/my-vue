import { defineStore } from "pinia";
import type { UserType } from "../types/user";
import { ref } from 'vue';
 
export const useUserStore = defineStore("user", () => {
    //定义状态
    const user = ref<UserType>({
        name: "admin",
        role: 1, // 0-普通用户; 1-管理员
    });
    //定义修改状态的方法 改变用户信息
    const changeUserInfo = (person: UserType) => {
        user.value.name = person.name;
        user.value.role = person.role;
    };
 
    return {
        user,
        changeUserInfo
    }
});
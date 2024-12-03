import { defineStore } from "pinia";
import type { UserType } from "../types/user";
import { ref } from 'vue';
 
export const useUserStore = defineStore("user", () => {
    //定义状态
    const user = ref<UserType>(
        {
            name: "张三",
            age: 22,
            sex: '男',
            address: '江苏省南京市',
        });
    //定义修改状态的方法
    //改变用户信息
    const changeUserInfo = (person: UserType) => {
        user.value.name = person.name;
        user.value.age = person.age;
        user.value.sex = person.sex;
        user.value.address = person.address;
    };
 
    return {
        user,
        changeUserInfo
    }
});
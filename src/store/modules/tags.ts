import { defineStore } from "pinia";
import type { TagType } from "../types/tag";
import { ref } from 'vue';
 
export const useTagsStore = defineStore("tags", () => {
    const tags = ref<TagType[]>([]);

    const addTag = (tag: TagType) => {
        const exists = tags.value.some((t) => t.path === tag.path);
        if (!exists) {
            tags.value.push(tag);
        } else {
            const index = tags.value.findIndex((t) => t.path === tag.path);
            if (index !== -1) {
                tags.value.splice(index, 1);
                tags.value.push(tag);
            }
        }
    }
    const removeTag = (path: string) => {
        tags.value = tags.value.filter((t) => t.path !== path);
    }
    const getTags = () => {
        return tags.value;
    }
 
    return {
        tags,
        removeTag, getTags, addTag
    }
});
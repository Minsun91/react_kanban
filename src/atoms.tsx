import { atom, selector } from "recoil";

// type categories = "DONE" | "DOING" | "TODO"

// export enum Categories {
//     "TODO" = "TODO",
//     "DOING" = "DOING",
//     "DONE"= "DONE"
// }

// export interface IToDo {
//     text: string;
//     id: number;
//     category: categories;
// }
// export const categoryState = atom<categories>({
//     key: "category",
//     default:  "TODO",
// });

// export const toDoState = atom<IToDo[]>({
//     key: "toDo",
//     default: [],
// });

// export const toDoSelector = selector({
//     key: "toDoSelector",
//     get: ({ get }) => { //get function은 selector가 어떤 것을 반환할지 결정
//         const toDos = get(toDoState);
//         const category = get(categoryState);
//         return toDos.filter((toDo)=> toDo.category === category);
//     },
// });

interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key:"toDo",
    default:{
        "To Do" :["1", "2", "3", "4", "5", "6"],
        "Doing": [],
        "Done":[]
    },
})

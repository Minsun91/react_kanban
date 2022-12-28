import { useForm } from "react-hook-form";

interface IForm {
    toDo:string;
}

function ToDoList() {
    const {register, handleSubmit, setValue} = useForm<IForm>()
    const handleValid = (data:IForm)=>{
        console.log("add to do", data.toDo)
        setValue("toDo", "")  //
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "Please write to-do-list"
                })}
                    placeholder="Write to do"
                />
                <button>Add</button>
            </form>
        </div>
    );
}

// function ToDoList() {
//     //handleSubmit is for validation and preventDefault
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//     } = useForm<IForm>({
//         defaultValues: {
//             Email: "@gmail.com",
//         },
//     });
//     const onValid = (data: IForm) => {
//         if (data.Password1 !== data.Password2) {
//             setError(
//                 "Password1",
//                 { message: "Password are not the same." },
//                 { shouldFocus: true }
//             ); //password1에서 에러 나면 커서가 이리고 옮겨진다.
//             setError("extraError", { message: "Server offline" });
//         }
//     };
//     console.log(errors);

//     return (
//         <div>
//             <form
//                 style={{ display: "flex", flexDirection: "column" }}
//                 onSubmit={handleSubmit(onValid)}>
//                 <input
//                     {...register("Email", {
//                         required: "Email is required",
//                         minLength: 10,
//                         pattern: {
//                             value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
//                             message: "Only gmail.com is allowed.",
//                         },
//                     })}
//                     placeholder="Email"
//                 />
//                 <span>{errors?.Email?.message}</span>

//                 <input
//                     {...register("LastName", {
//                         required: "LastName is required",
//                     })}
//                     placeholder="LastName"
//                 />
//                 <span>{errors?.LastName?.message}</span>

//                 <input
//                     {...register("FirstName", {
//                         required: "FirstName is required",
//                         validate: {
//                             noKim:(value)=>
//                             value.includes("Kim") ? "No more Kim family" : true, //true면 통과 false면 에러 호출
//                             noBenz: (value) => value.includes("Benz") ? "Just No" :true,
//                         }
//                         })}
//                     placeholder="FirstName"
//                 />
//                 <span>{errors?.FirstName?.message}</span>

//                 <input
//                     {...register("Password1", {
//                         required: "Password1 is required",
//                         minLength: {
//                             value: 3,
//                             message: "Password1 is too short.",
//                         },
//                     })}
//                     placeholder="Password"
//                 />
//                 <span>{errors?.Password1?.message}</span>

//                 <input
//                     {...register("Password2", {
//                         required: "Password2 is required",
//                         minLength: {
//                             value: 3,
//                             message: "Password2 is too short.",
//                         },
//                     })}
//                     placeholder="Password2"
//                 />
//                 <span>{errors?.Password2?.message}</span>
//                 <button>Add</button>
//                 <span>{errors?.extraError?.message}</span>
//             </form>
//         </div>
//     );
// }

export default ToDoList;

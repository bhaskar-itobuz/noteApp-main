// import React, { useRef } from "react";
// import { useForm } from "react-hook-form";

// const RegisterForm = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm();
//     const handleRegistration = (data) => console.log(data);
//     const handleError = (errors) => { };
//     const password = useRef({});
//     password.current = watch("password", "");

//     const registerOptions = {
//         name: { required: "Name is required" },
//         email: { required: "Email is required" },
//         password: {
//             required: "Password is required",
//             minLength: {
//                 value: 8,
//                 message: "Password must have at least 8 characters",
//             },
//         },
//         conform_password: {
//             required: "conform password is required",
//             validate: (value) =>
//                 value === password.current || "The passwords do not match",
//         },
//     };

//     return (
//         <>
//             <p className=" flex flex-row justify-center text-[14px] md:text-[30px] lg:text-[40px]">
//                 Regestration
//             </p>
//             <form onSubmit={handleSubmit(handleRegistration, handleError)}>
//                 <div>
//                     <label>Name</label>
//                     <input
//                         name="name"
//                         type="text"
//                         {...register("name", registerOptions.name)}
//                     />
//                     <p className="text-danger text-red-500">
//                         {errors?.name && errors.name.message}
//                     </p>
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         {...register("email", registerOptions.email)}
//                     />
//                     <small className="text-danger">
//                         {errors?.email && errors.email.message}
//                     </small>
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         {...register("password", registerOptions.password)}
//                     />
//                     <small className="text-danger">
//                         {errors?.password && errors.password.message}
//                     </small>
//                 </div>
//                 <div>
//                     <label>Conform Password</label>
//                     <input
//                         type="password"
//                         name="conform_password"
//                         {...register("conform_password", registerOptions.conform_password)}
//                     />
//                     <small className="text-danger">
//                         {errors?.conform_password && errors.conform_password.message}
//                     </small>
//                 </div>
//                 <button>Submit</button>
//             </form>
//         </>
//     );
// };
// export default RegisterForm;


import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        {...register("firstName", { required: true })}
        placeholder="First name"
      />

      <input
        {...register("lastName", { minLength: 2 })}
        placeholder="Last name"
      />

      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input {...register("checkbox")} type="checkbox" value="A" />
      <input {...register("checkbox")} type="checkbox" value="B" />
      <input {...register("checkbox")} type="checkbox" value="C" />

      <input {...register("radio")} type="radio" value="A" />
      <input {...register("radio")} type="radio" value="B" />
      <input {...register("radio")} type="radio" value="C" />

      <input type="submit" />
    </form>
  )
}
export default RegisterForm;
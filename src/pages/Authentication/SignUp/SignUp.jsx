import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";


const SignUp = () => {
    const {createUser}=useAuth();
     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data)
        createUser(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user)
        })
        .catch(error=>{
            console.error(error)
        })
    };
    
    return (
         <div className="w-full max-w-xs mx-auto">
      {/* --- Title section --- */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold">Create an Account</h3>
        <p className="text-gray-600">Register with Profast</p>
      </div>

      {/* --- Form --- */}
      <form className="card-body p-0" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">
            {/* Email */}
          <label className="label font-bold text-base">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Name"
            {...register("name")}
          />
         

          {/* Email */}
          <label className="label font-bold text-base">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-800 text-sm">
              Email is required
            </p>
          )}

          {/* Password */}
          <label className="label mt-3 font-bold text-base">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-800 text-sm">
              Password is required
            </p>
          )}

          {/* Forgot password */}
          <div className="mt-2">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          {/* Button */}
          <button className="btn w-full mt-4 bg-[#CAEB66] text-black font-bold border-none">
            SignUp
          </button>
        </fieldset>
        <p>Aleady Have an Account <Link to='/login' className="mx-1 underline text-purple-600">Login</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
    );
};

export default SignUp;
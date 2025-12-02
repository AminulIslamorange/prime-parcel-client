import { useForm } from "react-hook-form";


const Login = () => {
    const {
        register,
        handleSubmit} = useForm()

    const onSubmit = (data) => console.log(data)
    
    return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset w-full max-w-xs mx-auto">
                <label className="label font-bold text-base">Email</label>
                <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Email" {...register("email")}
                />


                <label className="label mt-3 font-bold text-base">Password</label>
                <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Password" {...register("password")}
                />

                <div className="mt-2">
                    <a className="link link-hover">Forgot password?</a>
                </div>

                <button className="btn btn-neutral w-full mt-4 bg-[#CAEB66] text-black font-bold">
                    Login
                </button>
            </fieldset>
        </form>

    );
};

export default Login;
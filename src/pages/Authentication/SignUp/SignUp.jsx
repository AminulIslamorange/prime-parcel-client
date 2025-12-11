import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import { useState } from "react";



const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        // update user info to the database

        // update user profile to the firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      // এখানে image URL console এ দেখাবে
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
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

          <label className="label font-bold text-base">Your Picture</label>

          <div className="flex items-center gap-3 p-3 border rounded-xl hover:bg-base-200 transition cursor-pointer">
            <input onChange={handleImageUpload}
              type="file"
              className="file-input file-input-bordered w-full rounded-lg"
            />

            <span className="text-base-content/70">
              📁
            </span>
          </div>



          {/* Name */}
          <label className="label font-bold text-base">Your Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-800 text-sm">
              name is required
            </p>
          )}
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
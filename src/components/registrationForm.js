import React from 'react';
import { useForm , Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import ReactDatePicker from "react-datepicker";
import './style.css'
function RegistrationForm() {

    const { register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm();

    const formSubmit = (data) => {
        console.log("Form Submitted: ", data);
    };



    return (
        <form onSubmit={handleSubmit(formSubmit)} className='form'>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            // Regex to validate email
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address"
                        }
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
            <label htmlFor="dateOfBirth">date Of Birth:</label>
            <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ReactDatePicker selected={field.value} onChange={field.onChange} />
          )}
        />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        }
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match"
                    })}
                />
                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}
            </div>

            <button type="submit" className='btn btn-primary'>Register</button>
        </form>
    )
}
export default RegistrationForm;
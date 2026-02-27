import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Submit:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h2>Registration</h2>

      <div>
        <label>Username</label>
        <input
          {...register("username", {
            required: "Логин обязателен",
            minLength: {
              value: 4,
              message: "Минимум 4 символа",
            },
          })}
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

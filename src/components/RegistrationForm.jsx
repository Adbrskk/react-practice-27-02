import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Submit:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h2>Registration Form</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Username</label>
        <br />
        <input {...register("username", { required: "Логин обязателен" })} />
        {errors.username && (
          <p style={{ color: "crimson" }}>{errors.username.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

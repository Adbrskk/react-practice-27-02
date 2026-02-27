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
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20, maxWidth: 520 }}>
      <h2>Registration</h2>

      {/* Username */}
      <div style={{ marginBottom: 14 }}>
        <label>Username</label>
        <input
          {...register("username", {
            required: "Логин обязателен",
            minLength: { value: 4, message: "Минимум 4 символа" },
            maxLength: { value: 20, message: "Максимум 20 символов" },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: "Только латиница, цифры и _",
            },
          })}
        />
        {errors.username && <p style={{ color: "crimson" }}>{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div style={{ marginBottom: 14 }}>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email",
            },
          })}
        />
        {errors.email && <p style={{ color: "crimson" }}>{errors.email.message}</p>}
      </div>

      {/* First Name */}
      <div style={{ marginBottom: 14 }}>
        <label>First Name</label>
        <input
          {...register("firstName", {
            required: "Имя обязательно",
            minLength: { value: 2, message: "Минимум 2 символа" },
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/,
              message: "Только буквы (кириллица или латиница)",
            },
          })}
        />
        {errors.firstName && <p style={{ color: "crimson" }}>{errors.firstName.message}</p>}
      </div>

      {/* Last Name */}
      <div style={{ marginBottom: 14 }}>
        <label>Last Name</label>
        <input
          {...register("lastName", {
            required: "Фамилия обязательна",
            minLength: { value: 2, message: "Минимум 2 символа" },
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/,
              message: "Только буквы (кириллица или латиница)",
            },
          })}
        />
        {errors.lastName && <p style={{ color: "crimson" }}>{errors.lastName.message}</p>}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

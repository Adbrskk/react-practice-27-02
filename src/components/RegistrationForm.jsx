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
        <input
          {...register("username", {
            required: "Логин обязателен",
            minLength: {
              value: 4,
              message: "Минимум 4 символа",
            },
            maxLength: {
              value: 20,
              message: "Максимум 20 символов",
            },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: "Только латиница, цифры и _",
            },
          })}
        />

        {errors.username && (
          <p style={{ color: "crimson" }}>
            {errors.username.message}
          </p>
        )}
      </div>

            <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <br />
        <input
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email",
            },
          })}
        />

        {errors.email && (
          <p style={{ color: "crimson" }}>{errors.email.message}</p>
        )}
      </div>

              <div style={{ marginBottom: 12 }}>
        <label>First Name</label>
        <br />
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
        {errors.firstName && (
          <p style={{ color: "crimson" }}>{errors.firstName.message}</p>
        )}
      </div>


      <button type="submit">Submit</button>
    </form>
  );
}

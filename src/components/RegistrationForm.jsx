import { useForm, Controller } from "react-hook-form";

function formatPhone(input) {
  const digits = String(input || "").replace(/\D/g, "").slice(0, 10);
  const a = digits.slice(0, 6);
  const b = digits.slice(6, 8);  
  const c = digits.slice(8, 10); 

  let result = "+65";
  if (a) result += a;
  if (b) result += ` ${b}`;
  if (c) result += `-${c}`;

  return result;
}

function digitsAfterCode(masked) {
  const allDigits = String(masked || "").replace(/\D/g, "");
  if (allDigits.startsWith("65")) return allDigits.slice(2).length;
  return allDigits.length;
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    console.log("Submit:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h2>Registration Form</h2>

      {/* Username */}
      <div style={{ marginBottom: 12 }}>
        <label>Username</label>
        <br />
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
        {errors.username && (
          <p style={{ color: "crimson" }}>{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
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

      {/* First Name */}
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

      {/* Last Name */}
      <div style={{ marginBottom: 12 }}>
        <label>Last Name</label>
        <br />
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
        {errors.lastName && (
          <p style={{ color: "crimson" }}>{errors.lastName.message}</p>
        )}
      </div>

      {/* Password */}
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <br />
        <input
          type="password"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: { value: 6, message: "Минимум 6 символов" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
              message: "Нужна минимум 1 заглавная буква и 1 цифра",
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "crimson" }}>{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div style={{ marginBottom: 12 }}>
        <label>Confirm Password</label>
        <br />
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Подтверждение обязательно",
            validate: (value) =>
              value === passwordValue || "Пароли не совпадают",
          })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "crimson" }}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Age */}
      <div style={{ marginBottom: 12 }}>
        <label>Age</label>
        <br />
        <input
          type="number"
          {...register("age", {
            required: "Возраст обязателен",
            valueAsNumber: true,
            min: { value: 18, message: "Минимум 18 лет" },
            max: { value: 100, message: "Максимум 100 лет" },
          })}
        />
        {errors.age && <p style={{ color: "crimson" }}>{errors.age.message}</p>}
      </div>

      {/* Phone */}
      <div style={{ marginBottom: 12 }}>
        <label>Phone</label>
        <br />

        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Телефон обязателен",
            validate: (value) => {
              const count = digitsAfterCode(value);
              if (count !== 10) return "Ровно 10 цифр после +65";
              const okFormat = /^\+65\d{6}\s\d{2}-\d{2}$/.test(value);
              return okFormat || "Формат: +65XXXXXX XX-XX";
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="+65XXXXXX XX-XX"
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
            />
          )}
        />

        {errors.phone && (
          <p style={{ color: "crimson" }}>{errors.phone.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

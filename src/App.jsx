import React from 'react';
import { useForm, useWatch } from 'react-hook-form';

const App = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // Usamos useWatch para observar el valor del campo 'password'
  const watchPassword = useWatch({
    control,
    name: "password",
    defaultValue: "", // Valor por defecto para el campo observado
  });

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      {/* Nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: { value: true, message: "El nombre es requerido" },
          minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
          maxLength: { value: 20, message: "El nombre debe tener máximo 20 caracteres" },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      {/* Correo */}
      <label htmlFor="Correo">Correo</label>
      <input
        type="email"
        {...register("Correo", {
          required: { value: true, message: "El correo es requerido" },
          pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, message: "Correo inválido" },
        })}
      />
      {errors.Correo && <span>{errors.Correo.message}</span>}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: { value: true, message: "El password es requerido" },
          minLength: { value: 8, message: "El password debe tener al menos 8 caracteres" },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* Confirmar Password */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: { value: true, message: "El confirmar password es requerido" },
          validate: (value) => value === watchPassword || "Las contraseñas no coinciden",
        })}
      />
      {errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}

      {/* Fecha de Nacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: { value: true, message: "La fecha de nacimiento es requerida" },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            return edad >= 18 || "La edad debe ser mayor o igual a 18 años";
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

      {/* País */}
      <label htmlFor="pais">País</label>
      <select {...register("pais")}>
        <option value="">Seleccione País</option>
        <option value="Mexico">México</option>
        <option value="Argentina">Argentina</option>
        <option value="Brasil">Brasil</option>
      </select>

      {/* Foto */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" {...register("foto")} />

      {/* Términos y Condiciones */}
      <label htmlFor="terminos">Aceptar Términos y Condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Aceptar los términos y condiciones es requerido",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>} {/* Corrección aquí */}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default App;

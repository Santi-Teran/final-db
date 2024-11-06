"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Si el tipo es "password" usamos showPassword para cambiar entre "text" y "password"
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`flex items-center border p-2 gap-2 rounded-lg text-white`}>
      <label>{label}</label>
      {icon}
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-300"
      />
      {/* Si el input es de tipo password, mostramos el ícono de ojo */}
      {type === "password" &&
        (showPassword ? (
          <FaEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-white"
          />
        ) : (
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-white"
          />
        ))}
    </div>
  );
};

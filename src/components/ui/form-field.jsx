import { cn } from "@/utils/cn";

const FormField = ({
  label,
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    {type === "text-area" ? (
      <textarea
        className={cn(
          "w-full border rounded-lg ml-1 p-2 required:border-red-500",
          className
        )}
        rows={6}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
    ) : (
      <input
        className={cn(
          "w-full h-10 border rounded-lg ml-1 p-2 required:border-red-500",
          className
        )}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
    )}
    {error && (
      <span className="normal-case text-red-500 text-xs pl-2">
        {error.message}
      </span>
    )}
  </>
);
export default FormField;

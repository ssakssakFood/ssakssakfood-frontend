import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  errorMsg?: string | undefined;
  className?: string;
  onClick?: () => void;
  register?: UseFormRegister<FieldValues>;
  disabled?: boolean;
  icon?: boolean;
  imgSrc?: string;
  type?: string;
}

export default function InputField2({
  register,
  placeholder = "",
  className,
  errorMsg,
  type = "text",
  icon = false,
  // imgSrc = "",
  ...props
}: InputFieldProps) {
  return (
    // <div className="text-left flex flex-col gap-2 relative  pb-5">
    <div className={`relative ${className}`}>
      <input
        type={type}
        className={`w-full px-4 flex body-r-14 items-center py-4 border-1 rounded-xl  focus:border-main1
          bg-grey-5 border-grey-5 focus:outline-none`}
        {...register}
        {...props}
        placeholder={placeholder}
      />
      {errorMsg && <p className="body-r-14 text-main2">{errorMsg}</p>}
      {icon && (
        <div className="absolute right-3 top-4">
          <img src="/icons/close-eye.svg" alt="" />
        </div>
      )}
    </div>
    // </div>
  );
}

import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  errorMsg?: string | undefined;
  className?: string;
  InputLength?: number | null;
  InputMaxLength?: number | null;
  onClick?: () => void;
  register?: UseFormRegister<FieldValues>;
  disabled?: boolean;
  isTextArea?: boolean;
}

export default function InputField({
  register,
  placeholder = "",
  className,
  ...props
}: InputFieldProps) {
  return (
    // <div className="text-left flex flex-col gap-2 relative  pb-5">
    <div className={`${className}`}>
      <input
        type="text"
        className={`w-full px-4 flex items-center py-4 border-1 rounded-xl  focus:border-main1
          border-grey-2 focus:outline-none`}
        {...register}
        {...props}
        placeholder={placeholder}
      />
    </div>
    // </div>
  );
}

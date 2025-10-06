interface ButtonProps {
  labelName: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  labelName = "",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`w-full flex h-12 py-4 px-5.32rem rounded-lg items-center justify-center text-white subtitle-b-16 ${className} ${disabled ? "bg-grey-4" : "bg-main1"}`}
      onClick={onClick}
    >
      {labelName}
    </button>
  );
}

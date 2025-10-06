interface ProgressBarProps {
  width: string;
  className?: string;
}

export const ProgressBar = ({ width, className }: ProgressBarProps) => {
  return (
    <div
      className={`h-2 bg-main1  rounded-lg ${className}`}
      style={{ width: `${width}px` }}
    ></div>
  );
};

interface TermTextProps {
  text: string;
}

export default function TermText({ text = "" }: TermTextProps) {
  return (
    <div className="flex pl-4 justify-between items-center self-stretch">
      <div className="flex">
        <img src="/icons/check-circle.svg" alt="" className="pr-2" />
        <p className="body-r-16">{text}</p>
      </div>
      <img src="/icons/chevron-right.svg" alt="" />
    </div>
  );
}

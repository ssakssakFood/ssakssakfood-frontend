import SearchIcon from '@/assets/search-md.svg';

interface SearchInputProps {
  className?: string;
}

export default function SearchInput({ className }: SearchInputProps) {
  return (
    <div className={`flex items-center gap-[12px] ${className}`}>
      <img src={SearchIcon} alt="검색" className="w-5 h-5" />
      <input
        type="text"
        placeholder="식품, 매장 이름을 검색해보세요"
        className="flex-1 outline-none text-[16px] font-[400]"
      />
    </div>
  );
}

import ChevronL from "@assets/icons/chevron-left.svg";
import { LocationField } from "../../components/Location/LocationField";
import SearchLocationBtn from "../../components/Location/SearchLocationBtn";
import { useNavigate } from "react-router-dom";
//api연결
export default function LocationSearch() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col">
      <header className="h-12 relative flex items-center self-stretch justify-center mb-8">
        <img
          src={ChevronL}
          alt="뒤로가기"
          className=" absolute left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="subtitle-b-18 text-center">위치관리</p>
      </header>
      <LocationField mode="fill-only" />
      <span className=" h-1 bg-grey-5 mb-4"></span>
      <SearchLocationBtn className="mb-6" />
    </div>
  );
}

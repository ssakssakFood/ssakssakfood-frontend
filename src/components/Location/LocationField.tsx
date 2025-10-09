import type { UseFormRegisterReturn } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@/assets/icons/search.svg?url";

interface LocationFieldProps {
  register?: UseFormRegisterReturn;

  returnPath?: string;
  mode?: "fill-only" | "call-api";
}

export const LocationField = ({
  register,
  // mode = "call-api",
  // returnPath,
}: LocationFieldProps) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleClick = () => {
  //   navigate("/location/search", {
  //     state: {
  //       returnPath: returnPath || location.pathname,
  //       mode,
  //     },
  //   });
  // };

  return (
    <>
      <div className="text-left ">
        <div className="flex ">
          <button className="cursor-pointer">
            <img src={SearchIcon} alt="검색" className="size-6 mr-3" />
          </button>
          <input
            type="text"
            className="w-full rounded-xl   py-[0.625rem] px-3 focus:outline-none cursor-pointer placeholder:text-grey-3 font-"
            placeholder="도로명 또는 지번으로 검색해보세요"
            {...register}
            readOnly
            // onClick={handleClick}  //여기서 위치검색으로 넘어가야함
          />
        </div>
      </div>
    </>
  );
};

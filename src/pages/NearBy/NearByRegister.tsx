import InputField2 from "@/components/InputField2";
import PageHeader from "@/components/PageHeader";
import Switch from "@/assets/icons/switch.svg";
import BDot from "@/assets/icons/blue-dot.svg";
import RDot from "@/assets/icons/red-dot.svg";
import Button from "@/components/Button";

export default function NearbyRegister() {
  return (
    <div className="flex flex-col min-h-dvh">
      <PageHeader title="루트 등록" />
      <div className="my-6">
        <p className="mb-4 subtitle-b-16">루트 이름</p>
        <InputField2 placeholder="루트 이름 입력" />
      </div>

      <section className="flex-1">
        {/* 인풋 */}
        <div className="mb-4">
          <p className="mb-4 subtitle-b-16">루트 설정</p>
          {/* 인풋필드 */}
          <div className="p-4 flex gap-4 bg-grey-5 rounded-xl">
            <img src={Switch} alt="출발지 도착지" />
            <div className="flex flex-col w-full">
              <div className="flex gap-2 border-b border-b-grey-4 pb-4">
                <img src={RDot} alt="출발지" />
                <p className="text-grey-3 body-r-14">출발지입력</p>
              </div>
              <div className="flex gap-2 pt-4">
                <img src={BDot} alt="도착지" />
                <p className="text-grey-3 body-r-14 cursor-pointer">
                  도착지입력
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 지도 */}

        <div></div>
      </section>

      <Button labelName="루트 등록하기" className="mb-8" />
    </div>
  );
}

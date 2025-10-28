import ImgUrl from "@/assets/images/logo.png";
import Arrow from "@/assets/icons/chevron-right.svg";
import FooterNav from "@/layout/FooterNav";

export default function MyPage() {
  return (
    <div className="min-h-dvh flex flex-col ">
      <p className="text-xl font-bold mt-6 mb-8">마이페이지</p>

      <div className="flex items-center flex-col justify-center">
        <img
          src={ImgUrl}
          alt=""
          className="size-30 rounded-full shrink-0 mb-6"
        />
        <p className="text-2xl font-bold mb-3">싹싹푸드</p>
        <p className="body-r-16 text-grey-2 mb-4">saksakfood25@gmail.com</p>

        <button className="px-4 py-2 rounded-[20px] bg-grey-5 mb-8">
          내 정보 수정
        </button>
      </div>

      <section>
        <div className="p-6 bg-grey-5 mb-2 rounded-xl flex flex-col gap-4">
          <p className="button-sb-14">설정</p>
          <div className="flex">
            <p>계정 관리</p>
            <img src={Arrow} alt="보기" className="ml-auto" />
          </div>
          <div className="flex">
            <p>알림 설정</p>
            <img src={Arrow} alt="보기" className="ml-auto" />
          </div>
        </div>

        <div className="p-6 bg-grey-5 rounded-xl">
          <p className="button-sb-14 mb-4">고객지원</p>
          <div className="flex">
            <p>약관 및 정책</p>
            <img src={Arrow} alt="보기" className="ml-auto" />
          </div>
        </div>
      </section>
      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-[401px] bg-white border-t border-gray-100 z-10 mx-auto">
        <FooterNav />
      </footer>
    </div>
  );
}

import Close from "@assets/icons/x-close.svg";

interface Modal {
  closeModal: () => void;
}

export default function EmailSentModal({ closeModal }: Modal) {
  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center mb-3">
            <p className="text-xl font-bold">인증번호가 전송되었어요!</p>
            <img
              src={Close}
              alt="닫기"
              className="ml-auto cursor-default"
              onClick={closeModal}
            />
          </div>

          <p className="body-r-14 text-grey-2">이메일함을 확인해보세요</p>
        </div>
      </div>
    </div>
  );
}

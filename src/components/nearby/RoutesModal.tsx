interface RoutesModalProps {
  onCloseModal: () => void;
  data: object;
}

export default function RoutesModal({ onCloseModal, data }: RoutesModalProps) {
  return (
    <>
      <div
        className="absolute inset-0 bg-black/40 z-[1100]"
        onClick={onCloseModal}
      />
      <div
        className="fixed left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[401px]
                       pt-5 pb-8 bg-white rounded-t-2xl z-[1101]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col w-full items-start gap-1 px-6">
          <span className="subtitle-b-16">내 루트</span>

          {data ? (
            <span className="body-r-14 mb-6">s</span>
          ) : (
            <div className="flex flex-col justify-center items-center w-full text-grey-2 mb-6">
              <p>등록된 루트가 없어요!</p>
              <p>루트를 등록해볼까요?</p>
            </div>
          )}

          <button
            className="w-full flex h-12 py-4 px-5.32rem rounded-lg items-center justify-center
                           text-main1 subtitle-b-16 border-dashed border border-main1"
            // onClick={}
          >
            루트 등록하기
          </button>
        </div>
      </div>
    </>
  );
}

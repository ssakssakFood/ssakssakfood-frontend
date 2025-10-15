import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuHeader } from "@/components/Headers";
import chevronDownImg from "@/assets/icons/chevron-down.svg";
import Button from "@/components/Button";
import DialPicker from "@/components/DialPicker"; // DialPicker 임포트

// --- 상태 인터페이스 정의 ---
interface ReserveState {
  quantity: number;
  title?: string;
  salePrice?: number;
  storeName?: string;
  pickupTime?: string;
}

// --- 유틸리티 및 데이터 ---
const formatToTwoDigits = (num: number) => String(num).padStart(2, "0");

const getDayOfWeek = (date: Date) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const todayDay = getDayOfWeek(today);
const tomorrowDay = getDayOfWeek(tomorrow);

const dateItems = [
  { value: "today", label: `오늘(${todayDay})` },
  { value: "tomorrow", label: `내일(${tomorrowDay})` },
];

const generateTimeItems = (start: number, end: number, step: number = 1) => {
  const items = [];
  for (let i = start; i <= end; i += step) {
    items.push({
      value: i,
      label: formatToTwoDigits(i),
    });
  }
  return items;
};

// 🚨 상수 정의는 그대로 유지 (함수 내부에서 재정의할 것이므로) 🚨
const MINUTE_STEP = 10;
const minuteItems = generateTimeItems(0, 59, MINUTE_STEP);

// --- ReservePage 컴포넌트 시작 ---
export default function ReservePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReserveState | null;

  // 🚨 1. 픽업 시간 파싱 및 범위 계산 🚨
  const pickupTimeRange = state?.pickupTime?.match(
    /(\d{2}):\d{2}\s*~\s*(\d{2}):\d{2}/
  );

  // 파싱에 실패하면 기본값 (9시 ~ 18시)을 사용
  const startHour = pickupTimeRange ? parseInt(pickupTimeRange[1], 10) : 9;
  const endHour = pickupTimeRange ? parseInt(pickupTimeRange[2], 10) : 18;

  // 🚨 2. 범위에 맞는 hourItems를 동적으로 생성 🚨
  const hourItems = generateTimeItems(startHour, endHour);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // 🚨 3. selectedHour의 초기값을 동적으로 생성된 hourItems의 첫 번째 값으로 설정 🚨
  const [selectedDate, setSelectedDate] = useState<"today" | "tomorrow">(
    dateItems[0].value as "today" | "tomorrow"
  );
  const [selectedHour, setSelectedHour] = useState<number>(
    hourItems[0].value as number
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    minuteItems[0].value as number
  );

  useEffect(() => {
    if (!state || !state.quantity) {
      navigate(`/menu/${id}`, { replace: true });
    }
  }, [state, id, navigate]);

  if (!state) {
    return null;
  }

  const { quantity, title, salePrice, storeName, pickupTime } = state;
  const totalPrice = (salePrice || 0) * quantity;

  const selectedDateLabel =
    dateItems.find((item) => item.value === selectedDate)?.label || "";
  const formattedHour = formatToTwoDigits(selectedHour);
  const formattedMinute = formatToTwoDigits(selectedMinute);

  return (
    <div className="relative min-h-screen">
      <MenuHeader title="예약하기" />

      {/* 메뉴 정보 */}
      <div className="flex gap-[16px] w-full bg-[#F3F3F3] p-[24px]">
        <div className="w-[72px] h-[72px] bg-gray-400 rounded-2xl"></div>
        <div className="flex flex-col justify-center">
          <div className="flex gap-4 items-center">
            <span className="text-[16px] font-bold">{title}</span>
            <span className="text-[14px] font-semibold text-[#7f7f7f]">
              {storeName}
            </span>
          </div>
          <div className="text-[14px] font-normal text-[#7f7f7f]">
            <div>
              수량 <span> {quantity}</span>
            </div>
            <div>
              픽업 가능 시간 <span>{pickupTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[24px] pb-[24px] space-y-8">
        {/* 픽업 날짜 및 시간 선택 영역 (토글 버튼) */}
        <div
          className="flex justify-between items-center pt-[24px]"
          onClick={() => setIsPickerOpen((prev) => !prev)}
        >
          <div className="text-[16px] font-normal text-[#7f7f7f]">
            픽업 날짜 및 시간
          </div>

          {/* 닫혔을 때의 가로 정렬 및 스타일 */}
          <div className="flex items-center text-[18px] font-bold cursor-pointer">
            <span
              className={isPickerOpen ? "text-[#FE7549]" : "text-black"}
            >{`${selectedDateLabel} ${formattedHour}:${formattedMinute}`}</span>

            <img
              src={chevronDownImg}
              alt="chevron down"
              className={`inline ml-2 w-4 h-4 transition-transform ${isPickerOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        {/* 다이얼 컴포넌트 영역 */}
        {isPickerOpen && (
          <div className="w-[260px] mx-auto bg-white py-4  mb-4">
            <div className="flex justify-center">
              <DialPicker
                items={dateItems}
                selectedValue={selectedDate}
                onValueChange={(val) =>
                  setSelectedDate(val as "today" | "tomorrow")
                }
              />
              <DialPicker
                // 🚨 동적으로 계산된 hourItems 전달 🚨
                items={hourItems}
                selectedValue={selectedHour}
                onValueChange={(val) => setSelectedHour(val as number)}
                unit="시"
              />
              <DialPicker
                items={minuteItems}
                selectedValue={selectedMinute}
                onValueChange={(val) => setSelectedMinute(val as number)}
                unit="분"
              />
            </div>
          </div>
        )}

        {/* 결제 금액 */}
        <div className="flex justify-between items-center pt-4">
          <div className="text-[16px] font-normal text-[#7f7f7f]">
            결제 금액
          </div>
          <span className="text-[18px] font-bold">
            {totalPrice.toLocaleString()} 원
          </span>
        </div>
      </div>

      {/* 예약하기 버튼 (하단 고정) */}
      {/* <div className="p-4 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <Button labelName="예약하기" disabled={false} />
            </div> */}
    </div>
  );
}

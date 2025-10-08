// src/pages/Home.tsx

import React, { useRef, useState } from "react";
import DateAndTimePicker, {
  type DateAndTimePickerHandle,
} from "./components/Date_Time/DateAndPicker";
import InputField from "./components/InputField";

/**
 * 프로젝트의 메인 홈 페이지 컴포넌트
 */
const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const pickerRef = useRef<DateAndTimePickerHandle>(null);

  const handleCloseOverlay = () => {
    if (pickerRef.current) {
      const date = pickerRef.current.getDueString();
      setSelectedDate(date);
    }
    setOpenModal(false);
  };

  return (
    <div>
      <nav className="flex space-x-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        헤더
      </nav>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">TEST!</h2>
      <p className="text-gray-600">TEST TEST.</p>
      <InputField
        onClick={() => setOpenModal(true)}
        readOnly
        value={selectedDate}
      />
      {openModal && (
        <div
          id="date-picker-overlay"
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.id === "date-picker-overlay") {
              handleCloseOverlay();
            }
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DateAndTimePicker ref={pickerRef} showTime={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MenuHeader } from "@/components/Headers";
import Button from "@/components/Button";

interface ReserveState {
  quantity: number;
  title?: string;
  salePrice?: number;
  storeName?: string;
  pickupTime?: string;
}

export default function ReservePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReserveState | null;

  // state가 없으면 메뉴 상세 페이지로 리다이렉트
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

  return (
    <div>
      <MenuHeader title="예약하기" />

      {/* 예약하기 버튼 */}
      <Button labelName="예약하기" disabled={false}/>
    </div>
  );
}

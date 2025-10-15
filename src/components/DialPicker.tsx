import React, { useRef, useState, useEffect, useCallback } from 'react';

interface PickerItem {
  value: string | number;
  label: string;
}

interface DialPickerProps {
  items: PickerItem[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  unit?: string;
}

const ITEM_HEIGHT = 40; 
const VISIBLE_ITEMS = 3; 
const HALF_VISIBLE = Math.floor(VISIBLE_ITEMS / 2);

const PADDING_ARRAY: (PickerItem | null)[] = Array(HALF_VISIBLE).fill(null);
const SCROLL_SPEED_MULTIPLIER = 0.33; // 마우스 휠 스크롤 속도 조정

const DialPicker: React.FC<DialPickerProps> = ({ 
  items, 
  selectedValue, 
  onValueChange, 
  unit = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const snapTimerRef = useRef<number | null>(null);

  const selectedIndex = items.findIndex(item => item.value === selectedValue);
  
  const snapToClosestItem = useCallback(() => {
    if (!containerRef.current) return;

    const currentScrollTop = containerRef.current.scrollTop;
    let newIndex = Math.round(currentScrollTop / ITEM_HEIGHT);

    newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
    const snapToPosition = newIndex * ITEM_HEIGHT;

    containerRef.current.scrollTo({
      top: snapToPosition,
      behavior: 'smooth',
    });

    const newValue = items[newIndex].value;
    if (newValue !== selectedValue) {
      onValueChange(newValue);
    }
  }, [items, selectedValue, onValueChange]);

  useEffect(() => {
    if (containerRef.current && selectedIndex !== -1) {
      const initialOffset = selectedIndex * ITEM_HEIGHT;
      containerRef.current.scrollTop = initialOffset;
    }
  }, [items, selectedIndex]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    event.preventDefault();

    const scrollAmount = event.deltaY;
    const adjustedScrollAmount = scrollAmount * SCROLL_SPEED_MULTIPLIER;
    
    containerRef.current.scrollTop += adjustedScrollAmount;

    if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
    }
    snapTimerRef.current = setTimeout(() => {
        snapToClosestItem();
    }, 150) as unknown as number;
  };

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
    }

    setIsDragging(true);
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    setStartY(clientY);
    setStartScrollTop(containerRef.current.scrollTop);
    
    if ('touches' in event) {
        containerRef.current.style.touchAction = 'none';
    }
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const deltaY = clientY - startY; 
    
    containerRef.current.scrollTop = startScrollTop - deltaY;
  };

  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
          containerRef.current.style.touchAction = 'auto';
      }
      snapToClosestItem();
    }
  };

  const allItems = [...PADDING_ARRAY, ...items, ...PADDING_ARRAY];

  return (
    <div className="relative flex flex-col items-center w-1/3"> 
      <div
        ref={containerRef}
        className={`w-full overflow-y-scroll no-scrollbar`} 
        style={{ height: VISIBLE_ITEMS * ITEM_HEIGHT }}
        
        onWheel={handleWheel} 
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd} 
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {allItems.map((item, index) => {
          if (!item) {
            return (<div key={`padding-${index}`} className="h-10" />);
          }
          const isSelected = item.value === selectedValue;
          
          return (
            <div key={item.value} className="h-10 flex items-center justify-center transition-colors duration-100 cursor-grab">
              
              {/* 🚨 정렬 개선: 텍스트 영역의 최소 너비를 고정하고 중앙 정렬 🚨 */}
              <span
                className={`text-xl transition-all duration-100 min-w-[2.5rem] text-center
                  ${isSelected ? 'text-[#FE7549] font-bold text-2xl' : 'text-gray-600'}`
                }
              >
                {item.label}
              </span>
              
              {/* 단위 영역: 단위가 없거나 선택되지 않았을 때도 공간을 확보 (opacity-0) */}
              <span className={`text-sm text-[#FE7549] font-bold ml-1 transition-opacity ${unit && isSelected ? 'opacity-100' : 'opacity-0'}`}>
                  {unit || '분'} 
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialPicker;
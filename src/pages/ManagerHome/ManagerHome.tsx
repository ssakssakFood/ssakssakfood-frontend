import CurrentDateDisplayWithDateObject from '@/utils/CurrentDate';

export default function ManagerHome() {
  return (
    <>
      <div className='font-bold text-[20px] mt-[24px]'>{CurrentDateDisplayWithDateObject()}</div>
    </>
  );
}
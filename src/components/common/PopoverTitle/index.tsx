import DarkArrowDown from 'assets/icons/DarkArrowDown';

export default function PopoverTitle({ title }: { title: string }) {
  return (
    <div
      className="flex h-[2.2rem] items-center justify-center gap-x-1 rounded-md border border-[#bc9dc7] p-2 text-xs font-semibold capitalize tracking-wider text-[#818181] 2xl:text-[12px]"
      onClick={() => {}}
    >
      {title} <DarkArrowDown />
    </div>
  );
}

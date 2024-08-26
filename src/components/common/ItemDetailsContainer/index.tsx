import { UpdateRequestIcon } from 'assets/icons';

interface ContainerProps {
  title: string;
  titleExtension?: React.ReactNode;
  children: React.ReactNode;
}

export default function ItemDetailsContainer({ title, titleExtension, children }: ContainerProps) {
  return (
    <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
      <div className="border-grayInput flex items-center justify-between border-b-[1px]">
        <p className="my-3 text-lg font-semibold">{title}</p>
        {titleExtension}
      </div>
      <div className="mt-6 flex flex-col justify-start gap-5 md:flex-row md:gap-x-5">
        {children}
      </div>
    </div>
  );
}

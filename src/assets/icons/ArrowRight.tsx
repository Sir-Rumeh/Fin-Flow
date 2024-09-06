type ArrowIconProps = {
  style?: string;
};

export default function ArrowIcon({ style }: ArrowIconProps) {
  return (
    <svg
      width="6"
      height="11"
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path
        d="M1 9.5L5 5.5L1 1.5"
        stroke="#334335"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 9.5L5 5.5L1 1.5"
        stroke="white"
        stroke-opacity="0.3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

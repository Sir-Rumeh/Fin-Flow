type DarkArrowDownProps = {
  styles?: string;
  width?: string;
  height?: string;
};

export default function DarkArrowDown({ styles, width, height }: DarkArrowDownProps) {
  return (
    <svg
      className={styles}
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#707B71"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import * as React from 'react';
import { SVGProps } from 'react';
const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="scale-125"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#5C068C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </svg>
);
export default ArrowDown;

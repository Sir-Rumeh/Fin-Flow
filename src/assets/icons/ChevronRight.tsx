import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <div className="scale-[110%] opacity-65">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="scale-[70%]"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="#222823"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 18 6-6-6-6"
      />
    </svg>
  </div>
);
export default SvgComponent;

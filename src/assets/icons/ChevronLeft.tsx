import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={14} fill="none" {...props}>
    <path fill="#535353" d="M8 12 3 7l5-5-1-2-7 7 7 7 1-2Z" />
  </svg>
);
export default SvgComponent;

import * as React from 'react';
import { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <div className="opacity-70">
    <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
      <path
        stroke="#5C068C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.5 11.332v2c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333v-2M5.833 8 8.5 10.667 11.167 8M8.5 1.332v9.333"
      />
    </svg>
  </div>
);
export default SvgComponent;

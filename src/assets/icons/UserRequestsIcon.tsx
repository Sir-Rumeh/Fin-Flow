import * as React from 'react';
import { SVGProps } from 'react';

export default function UserRequestsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="items relative flex justify-between">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M15 13.327C14.0152 13.1071 13.009 12.9974 12 13C7.582 13 4 15.015 4 17.5C4 19.985 4 22 12 22C17.687 22 19.331 20.982 19.807 19.5"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M18 20C20.2091 20 22 18.2091 22 16C22 13.7909 20.2091 12 18 12C15.7909 12 14 13.7909 14 16C14 18.2091 15.7909 20 18 20Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M18 14.668V17.334M16.667 16.001H19.333"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="absolute bottom-[10px] left-[14px] scale-50"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
      >
        <path
          fill="#fff"
          stroke="#fff"
          d="M19.5 15.075V8.25a3.75 3.75 0 0 0-3.75-3.75h-2.685l1.71-1.725c.3-.285.3-.765 0-1.05a.725.725 0 0 0-1.05 0l-3 3c-.3.285-.3.765 0 1.05l3 3c.285.3.765.3 1.05 0 .3-.285.3-.765 0-1.05L13.065 6h2.685A2.247 2.247 0 0 1 18 8.25v6.825a3.75 3.75 0 1 0 1.5 0ZM18.75 21a2.247 2.247 0 0 1-2.25-2.25 2.247 2.247 0 0 1 2.25-2.25A2.247 2.247 0 0 1 21 18.75 2.247 2.247 0 0 1 18.75 21ZM9 5.25a3.75 3.75 0 1 0-4.5 3.675v6.151c-1.71.348-3 1.863-3 3.674a3.754 3.754 0 0 0 3.75 3.75A3.754 3.754 0 0 0 9 18.75a3.754 3.754 0 0 0-3-3.674V8.925A3.75 3.75 0 0 0 9 5.25Zm-6 0A2.247 2.247 0 0 1 5.25 3 2.247 2.247 0 0 1 7.5 5.25 2.247 2.247 0 0 1 5.25 7.5 2.247 2.247 0 0 1 3 5.25Zm4.5 13.5C7.5 19.99 6.49 21 5.25 21S3 19.99 3 18.75s1.01-2.25 2.25-2.25 2.25 1.01 2.25 2.25Z"
        />
      </svg>
    </div>
  );
}

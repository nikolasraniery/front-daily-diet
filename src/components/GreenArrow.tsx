interface GreenArrowProps {
  className: string;
  fill?: string;
}

export function GreenArrow({ className, fill }: GreenArrowProps) {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M18.53 5.47a.75.75 0 010 1.06l-12 12a.75.75 0 01-1.06-1.06l12-12a.75.75 0 011.06 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M7.5 6a.75.75 0 01.75-.75H18a.75.75 0 01.75.75v9.75a.75.75 0 01-1.5 0v-9h-9A.75.75 0 017.5 6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

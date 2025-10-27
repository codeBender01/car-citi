interface PriceTagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function PriceTag({ width = 60, height = 60, className }: PriceTagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_7208_85168)">
        <path
          d="M8.75573 36.7479L35.3054 10.1981C37.136 8.36753 40.104 8.36753 41.9345 10.1981L36.8955 5.15907C35.0649 3.32849 32.0969 3.32849 30.2663 5.15907L3.71668 31.7088C1.88611 33.5394 1.88611 36.5074 3.71668 38.3379L8.75573 43.3769C6.92515 41.5463 6.92515 38.5785 8.75573 36.7479Z"
          fill="#EEF1FB"
        />
        <path
          d="M50.1537 18.417C51.9843 20.2476 51.9843 23.2156 50.1537 25.0462L23.6039 51.5958C21.7733 53.4264 18.8053 53.4264 16.9748 51.5958L3.71668 38.3376C1.88611 36.5071 1.88611 33.5391 3.71668 31.7085L30.2663 5.15882C32.0969 3.32824 35.0649 3.32824 36.8955 5.15882L43.5247 11.788L52.9689 2.34375"
          stroke="#88BA00"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9629 31.0456C18.7626 32.4552 19.2046 33.9386 20.2889 35.0229C22.1195 36.8535 25.0875 36.8535 26.9181 35.0229C28.7487 33.1923 28.7487 30.2243 26.9181 28.3937C25.0875 26.5631 25.0875 23.5951 26.9181 21.7645C28.7487 19.934 31.7167 19.934 33.5473 21.7645C34.6316 22.8489 35.0737 24.3322 34.8734 25.7419"
          stroke="#88BA00"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9746 38.338L20.2891 35.0234"
          stroke="#88BA00"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33.5479 21.7648L36.8624 18.4502"
          stroke="#88BA00"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M43.5938 57.6562L57.6562 43.5938"
          stroke="black"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7208_85168">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

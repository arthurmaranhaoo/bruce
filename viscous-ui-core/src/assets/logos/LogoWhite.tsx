interface LogoWhiteProps {
  width?: number
  height?: number
  className?: string
}

export function LogoWhite({ width = 100, height = 28, className }: LogoWhiteProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Trillia wordmark in white */}
      <text
        x="0"
        y="21"
        fontFamily="Inter, sans-serif"
        fontWeight="900"
        fontSize="20"
        fill="white"
        letterSpacing="-0.04em"
        textAnchor="start"
      >
        TRILLIA
      </text>
    </svg>
  )
}

export default LogoWhite

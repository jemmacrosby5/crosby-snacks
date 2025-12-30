import { icons } from '@/utils/icons';

type IconName = keyof typeof icons;

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: Props) {
  const iconPath = icons[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      className={className}
      aria-hidden
    >
      {iconPath}
    </svg>
  );
}

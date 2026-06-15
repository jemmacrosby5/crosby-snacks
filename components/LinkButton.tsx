import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  type: ButtonVariant;
  label: string;
  link: string;
}

export default function LinkButton({ type, label, link }: ButtonProps) {
  const baseClasses = 'rounded-md px-5 py-2 inline-flex items-center justify-center';
  const variantClasses =
    type === 'primary'
      ? 'bg-primary-green text-white'
      : type === 'secondary'
        ? 'bg-primary-coral text-white'
        : 'bg-transparent text-primary-green underline underline-offset-4';

  return (
    <Link href={link} className={`${baseClasses} ${variantClasses}`} aria-label={label}>
      {label}
    </Link>
  );
}

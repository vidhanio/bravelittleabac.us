type Props = {
  href?: string;
  children: React.ReactNode;
};

export default function A({ href, children }: Props): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-green-500 underline"
    >
      {children}
    </a>
  );
}

type Props = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: Props): JSX.Element {
  return (
    <div
      id="introduction"
      className="flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-8"
    >
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
        {title}
      </h2>
      <p className="text-xl">{children}</p>
    </div>
  );
}

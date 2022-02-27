import Link from "next/link";

type FooterItemProps = {
  name: string;
  url: string;
};

type Props = {
  footerItems: FooterItemProps[];
};

function FooterItem({ name, url }: FooterItemProps): JSX.Element {
  return (
    <li>
      <Link href={url}>
        <a className="text-sm font-light text-stone-800 transition-colors hover:text-green-500 dark:text-stone-200">
          {name}
        </a>
      </Link>
    </li>
  );
}

export default function Footer({ footerItems }: Props): JSX.Element {
  return (
    <footer className="flex flex-col items-center gap-4 p-8">
      <p className="text-lg text-stone-800 dark:text-stone-200">
        {"made with <3 by vidhan."}
      </p>
      <ul className="flex flex-row justify-center gap-4">
        {footerItems.map((item) => (
          <FooterItem {...item} key={item.name} />
        ))}
      </ul>
      <a
        href="https://github.com/vidhanio/site/blob/main/LICENSE"
        className="text-xs font-thin text-stone-800 transition-colors hover:text-green-500 dark:text-stone-200"
      >
        {"site licensed under agpl-3.0."}
      </a>
    </footer>
  );
}

import Link from "next/link";

type NavItemProps = {
  name: string;
  url: string;
};

type Props = {
  navItems: NavItemProps[];
};

function NavItem({ name, url }: NavItemProps): JSX.Element {
  return (
    <li>
      <Link href={url}>
        <a className="text-xl font-extrabold text-black transition-colors hover:text-green-500 dark:text-white">
          {name}
        </a>
      </Link>
    </li>
  );
}

export default function Nav({ navItems }: Props): JSX.Element {
  return (
    <nav className="p-8">
      <ul className="flex flex-row justify-center gap-4">
        {navItems.map((item) => (
          <NavItem {...item} key={item.name} />
        ))}
      </ul>
    </nav>
  );
}

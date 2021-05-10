import { Link, useLocation } from 'react-router-dom';

interface Props {
  path: string;
  text: string;
}

export const NavbarLink = ({ path, text }: Props) => {
  const location = useLocation();
  const url = `/${path}`;
  return (
    <Link
      to={{ pathname: url, state: { from: location } }}
      className={`${
        location.pathname === url ? 'font-semibold' : ''
      } text-white px-8`}
    >
      {text}
    </Link>
  );
};

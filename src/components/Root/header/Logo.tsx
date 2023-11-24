import { Link } from "react-router-dom";

interface LogoProps {
  path?: string;
}
const Logo = ({ path = "/" }: LogoProps) => {
  return (
    <Link to={path}>
      <img src="/images/logo.svg" alt="Logo" />
    </Link>
  );
};

export default Logo;

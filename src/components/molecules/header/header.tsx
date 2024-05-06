import { DeelSvg } from "../../../assets";
import "./header.css";

export const Header = () => {
  return (
    <header className="header" role="banner">
      <img className="deel-logo" src={DeelSvg} />
    </header>
  );
};

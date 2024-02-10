import Image from "next/image";

const nav = () => {
  return (
    <nav>
      <figure className="nav__logo--img--wrapper">
        <img
          src="https://dev.d24jig8s1lr7n9.amplifyapp.com/img/blinker-icon.4f9b2663.png"
          alt="logo"
          className="nav__logo--img"
        />
      </figure>
      <ul className="nav__link--list">
        <li className="nav__link">HOME</li>
      </ul>
    </nav>
  );
};

export default nav;

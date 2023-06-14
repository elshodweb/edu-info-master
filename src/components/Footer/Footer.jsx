import React from "react";
import "./Footer.scss";
import telegram from "./../../assets/isons/telegram.svg";
import instagram from "./../../assets/isons/instagram.svg";
import gmail from "./../../assets/isons/gmail.svg";
import phone from "./../../assets/isons/phone.png";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__row">
          <div className="footer__section">
            <div className="footer__logo">EDU-INFO</div>
          </div>
          <div className="footer__section">
            <div className="footer__title">Phone numbers: </div>
            <div className="footer__contact">
              <a target="_blank" href="tel:+998931730403">
                <img width={20} src={phone} alt="phone" />
                <span>+998 93-173-04-03</span>
              </a>
            </div>
            <div className="footer__contact">
              <a target="_blank" href="tel:+998902226403">
                <img width={20} src={phone} alt="phone" />
                <span>+998 90-222-64-03</span>
              </a>
            </div>
          </div>

          <div className="footer__section">
            <div className="footer__title">Social network address: </div>

            <div className="footer__contact">
              <a target="_blank" href="https://t.me/the_elshod">
                <img width={20} src={telegram} alt="telegram" />
                <span>the_elshod</span>
              </a>
            </div>
            <div className="footer__contact">
              <a target="_blank" href="https://www.instagram.com/elshodbek.t/">
                <img width={20} src={instagram} alt="instagram" />
                <span>elshodbek.t</span>
              </a>
            </div>

            <div className="footer__contact">
              <a target="_blank" href="mailto:elshodtukhtamurodov13@gamil.com">
                <img width={20} src={gmail} alt="gmail" />
                <span>elshodtukhtamurodov13@gamil.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer__licences">© 2023 EDU-INFO from elshod</div>
      </div>
    </div>
  );
}

export default Footer;

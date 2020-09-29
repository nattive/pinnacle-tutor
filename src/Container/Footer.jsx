import React from "react";

import logo from "../Assets/logoWhite.png";
import { primaryBlueDefault } from "../constants/colours";
export default function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: primaryBlueDefault }}>
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <div className="footer_logo">
                  <a href="#">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <p>
                  <a href="#"> info @pinnacleconsult.org </a> <br /> +234 873
                  672 6782 <br /> 600 / D, Green road, NewYork
                </p>
                <div className="socail_links">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="ti-facebook"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-twitter-alt"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram"> </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title"> Services </h3>
                <ul>
                  <li>
                    <a href="#"> Pinnacle Online </a>
                  </li>
                  <li>
                    <a href="#"> Startup </a>
                  </li>
                  <li>
                    <a href="#"> Careers of the Future </a>
                  </li>
                  <li>
                    <a href="#">Pinnacle Personalised Coaching and Trainings</a>
                  </li>
                  <li>
                    <a href="#"> Research and development </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-lg-2">
              <div className="footer_widget">
                <h3 className="footer_title"> Useful Links </h3>
                <ul>
                  <li>
                    <a href="#"> About </a>
                  </li>
                  <li>
                    <a href="#"> Blog </a>
                  </li>
                  <li>
                    <a href="#"> Contact </a>
                  </li>
                  <li>
                    <a href="#"> Internship </a>
                  </li>
                  <li>
                    <a href="#"> Volunteering </a>
                  </li>
                  <li>
                    <a href="#"> Work with us </a>
                  </li>
                  <li>
                    <a href="#"> Our Partners </a>
                  </li>
                  <li>
                    <a href="#"> Content library </a>
                  </li>
                  <li>
                    <a href="#"> Contact </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-lg-4">
              <div className="footer_widget">
                <h3 className="footer_title"> Subscribe </h3>
                <form action="#" className="newsletter_form">
                  <input type="text" placeholder="Enter your mail" />
                  <button type="submit"> Subscribe </button>
                </form>
                <p className="newsletter_text">
                  Be the first to know what we are up to by subscribing to our
                  mailing list, you can unsubscribe at any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right_text">
        <div className="container">
          <div className="footer_border"> </div>
          <div className="row">
            <div className="col-xl-12">
              <p className="copy_right text-center">
                Copyright & copy; All rights reserved | Pinnacle Consult
              </p>
            </div>
            {/* <small classNameName="text-center">
                This website was designed and developed by
                <a href="http://www.github.com/nattive"> Nattive inc </a>
              </small> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

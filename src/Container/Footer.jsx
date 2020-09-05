import React from "react";

import logo from "../Assets/logoWhite.png";
export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer_top">
        <div class="container">
          <div class="row">
            <div class="col-xl-3 col-md-6 col-lg-3">
              <div class="footer_widget">
                <div class="footer_logo">
                  <a href="#">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <p>
                  <a href="#"> info @pinnacleconsult.org </a> <br /> +234 873
                  672 6782 <br /> 600 / D, Green road, NewYork
                </p>
                <div class="socail_links">
                  <ul>
                    <li>
                      <a href="#">
                        <i class="ti-facebook"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="ti-twitter-alt"> </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-instagram"> </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-6 col-lg-3">
              <div class="footer_widget">
                <h3 class="footer_title"> Services </h3>
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
            <div class="col-xl-2 col-md-6 col-lg-2">
              <div class="footer_widget">
                <h3 class="footer_title"> Useful Links </h3>
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
            <div class="col-xl-4 col-md-6 col-lg-4">
              <div class="footer_widget">
                <h3 class="footer_title"> Subscribe </h3>
                <form action="#" class="newsletter_form">
                  <input type="text" placeholder="Enter your mail" />
                  <button type="submit"> Subscribe </button>
                </form>
                <p class="newsletter_text">
                  Be the first to know what we are up to by subscribing to our
                  mailing list, you can unsubscribe at any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copy-right_text">
        <div class="container">
          <div class="footer_border"> </div>
          <div class="row">
            <div class="col-xl-12">
              <p class="copy_right text-center">
                Copyright & copy; All rights reserved | Pinnacle Consult
              </p>
            </div>
              {/* <small className="text-center">
                This website was designed and developed by
                <a href="http://www.github.com/nattive"> Nattive inc </a>
              </small> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

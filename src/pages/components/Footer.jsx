import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex bg-background justify-center">
      <div className="bg-background py-10 border-t">
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-heading mb-4">Useful Links</h3>
            <ul>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Legal & Privacy
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Contact</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Gift Card</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Customer Service
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">My Account</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-heading mb-4">Shop</h3>
            <ul>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Televisions
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Washing Machines
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Air Conditioners
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Laptops</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-heading mb-4">My Account</h3>
            <ul>
              <li>
                <a className="text-heading hover:text-heading/40">My Profile</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  My Order History
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  My Wish List
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Order Tracking
                </a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">
                  Shopping Cart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-heading mb-4">Company</h3>
            <ul>
              <li>
                <a className="text-heading hover:text-heading/40">About Us</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Careers</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Our Blog</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Affiliate</a>
              </li>
              <li>
                <a className="text-heading hover:text-heading/40">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center text-heading">
          <p>&copy; 2022 TailGrids. All Rights Reserved.</p>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <img
              src="https://www.example.com/path/to/paypal-logo.png"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="https://www.example.com/path/to/visa-logo.png"
              alt="VISA"
              className="h-6"
            />
            <img
              src="https://www.example.com/path/to/amex-logo.png"
              alt="American Express"
              className="h-6"
            />
            <img
              src="https://www.example.com/path/to/mastercard-logo.png"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://www.example.com/path/to/discover-logo.png"
              alt="Discover"
              className="h-6"
            />
          </div>

          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p>Need Help? Call Us Now</p>
            <p className="text-heading">+99 0214 2542 223</p>
            <p className="text-sm">
              Monday - Friday: 9:00-20:00
              <br />
              Saturday: 11:00 - 15:00
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <a className="text-heading hover:text-heading/40">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="text-heading hover:text-heading/40">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="text-heading hover:text-heading/40">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="text-heading hover:text-heading/40">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

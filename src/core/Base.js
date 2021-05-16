import React from "react";
import Menu from "./Menu";
import "../styles/footer.css"
import "../styles/footer-dark.css"
const Base = ({
  
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    
    <div className="container-fluid">
      
      <div className={className}>{children}</div>
    </div>
    <footer className="footer footer-dark  mt-auto py-3">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                    <li><a href="#">Web design</a></li>
                    <li><a href="#">Development</a></li>
                    <li><a href="#">Hosting</a></li>
                </ul>
            </div>
            <div class="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                    <li><a href="#">Company</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
            </div>
            <div class="col-md-6 item text">
                <h3>Company Name</h3>
                <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
            </div>
            <div class="col item social">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-github"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a></div>
        </div>
        <p class="copyright">Company Name © 2021</p>
    </div>
      </footer>
  </div>
);

export default Base;


import React, { useState} from 'react';
import url_img from '../assets/img/home-bg.jpg';
function Header(props) {
    const [ title ] = useState(props.title);
    const [ subheading ] = useState(props.subheading);
    const cover = props.cover ? props.cover : url_img;
    return(
        <header className="masthead" style={{ backgroundImage: `url('${cover}')`}}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1  className="title" >{title}</h1>
                <span className="subheading">{subheading}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
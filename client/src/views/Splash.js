import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
            <div className="col-xl-4 mx-auto">
              <h1>Voyage!</h1>
            </div>
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">Your one-stop shop for travel plans.</h1>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div>
                  <a href="./input" className="btn btn-lg btn-primary" role="button">Start your adventure today!</a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="features-icons bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-screen-desktop m-auto text-primary"></i>
                  </div>
                  <h3>Input your preferences</h3>
                  <p className="lead mb-0">Tell us your travel method, budget, and what city you want to explore</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary"></i>
                  </div>
                  <h3>Pick your locations</h3>
                  <p className="lead mb-0">Pick from the different markers on the map generated just for you</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-check m-auto text-primary"></i>
                  </div>
                  <h3>Get your unique schedule</h3>
                  <p className="lead mb-0">Embark on your journey and have fun!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-6 order-lg-2 text-white showcase-img" styles="background-image: url(img/bg-showcase-1.jpg);">
                <img className="" src="img/travel-1.jpg" alt=""></img>
              </div>
              <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                <h2>What is Voyage?</h2>
                <p className="lead mb-0">Voyage is a web application that optimizes schedules for your traveling needs!
                All you have to do is select the places you want to visit, 
                and our algorithm will generate efficient paths connecting your points of interest.</p>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-lg-6 order-lg-2 text-white showcase-img" styles="background-image: url(img/bg-showcase-2.jpg);">
                <img className="" src="img/bg-showcase-2.jpg" alt=""></img>
              </div>
              <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                <h2>Who is it for?</h2>
                <p className="lead mb-0">Voyage is for anyone who hates the tedious process of planning a day trip. 
                From first-time traveller to seasoned sightseer, we can customize your itinerary. 
                Let us remove the boring part of planning so you arrive at your fun destination stress-free.</p>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-lg-6 order-lg-2 text-white showcase-img" styles="background-image: url(img/bg-showcase-3.jpg);">
                <img className="" src="img/bg-showcase-3.jpg" alt=""></img>
              </div>
              <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                <h2>Easy to Use &amp; Customize</h2>
                <p className="lead mb-0">With intuitive controls and navigations, we promise to cut down on your planning time. 
                Don't spend time on the mundane planning. Spend time with the people who truly matters: your family. 
                So what are you waiting for? Get started today!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials text-center bg-light">
          <div className="container">
            <h2 className="mb-5">Meet the team!</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src="img/kevin_profile.jpg" alt=""></img>
                  <h5>Kevin Mao</h5>
                  <p className="font-weight-light mb-0">Kevin is a fourth year ECE student with a focus in Software Engineering.
                  Graduating in May 2019, he plans on working full-time in the Fall as a Software Development Engineer. 
                  In his spare time, he enjoys long walks in the park and gazing at the stars.
                  <br></br>
                  <br></br><b> Major Responsibilities: </b> Maps</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src="img/phyllis_profile.jpg" alt=""></img>
                  <h5>Phyllis Ang</h5>
                  <p className="font-weight-light mb-0">Phyllis is a fourth year ECE student with a focus in Software Engineering and Embedded Sytems.
                  She plans on pursuing a PhD in computer science after graduating in May 2019. Her hobbies includes baking but only on a full moon
                  <br></br>
                  <br></br><b> Major Responsibilities: </b> Scheduling</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src="img/troy_profile.jpg" alt=""></img>
                  <h5>Troy Stidd</h5>
                  <p className="font-weight-light mb-0">Troy is a fourth year ECE student with a focus in Software Engineering.
                  Graduating in May 2019, he plans on working full-time in the Fall as a Software Development Engineer.
                  To relax, he hunting for albino squirrels and throwing popcorn at passerbys.
                  <br></br>
                  <br></br><b> Major Responsibilities: </b> Results</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src="img/brian_profile.jpg" alt=""></img>
                  <h5>Brian Wang</h5>
                  <p className="font-weight-light mb-0">Brian is a fourth year ECE student with a focus in Software Engineering. 
                  After graduating in May 2019, he plans to work full-time as a software engineer. Afterwards, he plans on moving to Alaska to pursue
                  his life-long passion of crab-fishing. 

                  <br></br>
                  <br></br><b> Major Responsibilities: </b> API Calls, Hosting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="displayStats"> 
          <div class="row">
            <div class="col-sm-2">
             <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Commits</h5>
                  <p class="card-text"><b>Total:</b> 62<br></br>
                  Phyllis: 18<br></br>
                  Brian: 20<br></br>
                  Troy: 13<br></br>
                  Kevin: 3<br></br></p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Issues</h5>
                  <p class="card-text"><b>Total:</b> 20<br></br>
                  Phyllis: 5<br></br>
                  Brian: 6<br></br>
                  Troy: 4<br></br>
                  Kevin: 5<br></br></p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Unit Tests</h5>
                  <p class="card-text"><b>Total:</b> 25<br></br>
                  Phyllis: 8<br></br>
                  Brian: 9<br></br>
                  Troy: 8<br></br>
                  Kevin: 8<br></br></p>

                </div>
              </div>
            </div>

            <div class="col-sm-2">
              <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Tools</h5>
                  <p class="card-text">
                  <table styles="width:100%">
                    <tr>
                      <td>React</td>
                      <td></td>
                      <td>Heroku</td> 
                    </tr>
                    <tr>
                      <td>Bootstrap</td>
                      <td></td>
                      <td>Express</td> 
                    </tr>
                    <tr>
                      <td>NodeJS</td>
                      <td></td>
                      <td>Enzyme</td> 
                    </tr>
                    <tr>
                      <td>SocketIO</td>
                      <td></td>
                      <td>Jest</td> 
                    </tr>
                    <tr>
                      <td>Postman</td>
                      <td></td> 
                    </tr>
                    <tr>
                      <td>HTML</td>
                      <td></td>
                      <td>CSS</td> 
                    </tr>
                  </table></p>

                </div>
              </div>
            </div>

            <div class="col-sm-2">
              <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Data</h5>
                  <p class="card-text"><a href="https://maps.google.com">Google Maps</a><br></br>
                  <a href="https://yelp.com">Yelp</a><br></br>
                  <a href="https://tripadvisor.com">Trip Advisor</a><br></br></p>

                </div>
              </div>
            </div>

            <div class="col-sm-2">
              <div class="card" styles="width: 8rem;">            
                <div class="card-body">
                  <h5 class="card-title">Github link</h5>
                  <a href="https://github.com/wangbri/voyage"class="card-text">https://github.com/wangbri/voyage</a>

                </div>
              </div>
            </div>

          </div>
        </section> 

        <section className="call-to-action text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h2 className="mb-4">Ready to get started?</h2>
              </div>
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form>
                  <div className="form-row">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                <ul className="list-inline mb-2">
                  <li className="list-inline-item">
                    <a href="#">About</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Contact</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Terms of Use</a>
                  </li>
                  <li className="list-inline-item">&sdot;</li>
                  <li className="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
                <p className="text-muted small mb-4 mb-lg-0">&copy; Your Website 2018. All Rights Reserved.</p>
              </div>
              <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item mr-3">
                    <a href="#">
                      <i className="fab fa-facebook fa-2x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item mr-3">
                    <a href="#">
                      <i className="fab fa-twitter-square fa-2x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-instagram fa-2x fa-fw"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Splash;
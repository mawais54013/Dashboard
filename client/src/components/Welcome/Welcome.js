import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../Welcome/Welcome.css";
import anime from 'animejs';
import Particles from 'react-particles-js';

const logoAnimation = anime.timeline({ 
  autoplay: true,
  delay: 200
});

logoAnimation.add({
  targets: '#logo',
  translateY: [-100, 0],
  opacity: [0, 1],
  elasticity: 600,
  duration: 1600
}).add({
  targets: '#logo-hexagon',
  rotate: [-90, 0],
  duration: 1200,
  elasticity: 600,
  offset: 100
}).add({
  targets: '#logo-circle',
  scale: [0, 1],
  duration: 1200,
  elasticity: 600,
  offset: 500
}).add({
  targets: '#logo-mask',
  scale: [0, 1],
  duration: 1000,
  elasticity: 600,
  offset: 550
}).add({
  targets: '#logo-text',
  translateX: ['-100%', 0],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutExpo',
  offset: 1000
})

class Welcome extends Component {
    render() {
        return(

<div className="App">
<div>
  <Particles className="visibleInBack"
        params={{
            particles: {
                line_linked: {
                    color: "#ff78ff",

                },
                number:{
                    value:120,
                },
                shape:{
                    type:"circle",
                },
                move:
                    {
                        enable:true,
                        speed:6,
                    }
            }
            ,
            interactivity: {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 50,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 200,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 5
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 300
                    },
                    "remove": {
                        "particles_nb": 10
                    }
                }
            },
            detect_on:"canvas",
        }}
        style={{
            width: '100%',
            backgroundColor: "black"
        }}
/>
</div>
<div className="overlap">
{/* <div> */}
                <div className="site-logo">
                 <figure id="logo">
                 <svg width="100%" height="100%" viewBox="0 0 148 128">
                     <defs>
                     <mask id="circle-mask">
                         <rect fill="white" width="100%" height="100%"></rect>
                         <circle id="logo-mask" fill="black" cx="120" cy="96" r="28"></circle>
                     </mask>
                     </defs>
                     <polygon id="logo-hexagon" fill="#216c83" points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96" mask="url(#circle-mask)"></polygon>
                     <circle id="logo-circle" fill="#3F3C3C" cx="120" cy="96" r="20"></circle>
                 </svg> 
                 </figure>
                 <div class="site-title">
                 <div id="logo-text" class="site-title-text">
                     Dash<span>Board</span>
                 </div>
                 </div>
                 </div> 
               

                 <div>
                   
                    <Link to="/signin"><button class="button-restart">Login</button></Link>  
                    <Link to="/register"><button class="button-restart">Register</button></Link>  
                </div>
</div>
</div>
            
        )
    }
}

export default Welcome;
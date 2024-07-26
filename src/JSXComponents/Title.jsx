import React from 'react'
import '../Styles/Title.css'
import GlitchSquiggly from 'react-glitch-effect/core/GlitchSquiggly';
import Glitch from 'react-glitch-text'


export default function Title(props) {

    function sigmoid(z) {
        return 1 / (1 + Math.exp(-z));
    }

    function normalDistribution(z, adjest) {
        return Math.exp(-Math.pow(z - adjest,2) / 300);
    }

    return (
        <div className='title-container'>

            {/* <Glitch color='whitesmoke' fontSize='42px'> */}
                <GlitchSquiggly disabled={false}>
                    <h1 className='title-text' 
                        style={{'letterSpacing': `${props.spacing/40}px`, 'opacity': normalDistribution(props.spacing/40, 40)}}>
                        BOWEI PRESENTS
                    </h1>
                    <p className='subtext' 
                        style={{'opacity': normalDistribution(props.spacing/40, 0)}}>
                        Scroll Down to Experience
                    </p>
                </GlitchSquiggly>
                
            {/* </Glitch> */}
        </div>
    )
}
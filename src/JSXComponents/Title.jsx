import React from 'react'
import '../Styles/Title.css'
import GlitchSquiggly from 'react-glitch-effect/core/GlitchSquiggly';


export default function Title() {
    return (
        <div className='title-container'>
            <GlitchSquiggly disabled={false}>
                <h1 className='title-text'>
                    BOWEI DOMAIN
                </h1>
            </GlitchSquiggly>
        </div>
    )
}
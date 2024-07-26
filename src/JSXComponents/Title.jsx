import React from 'react'
import '../Styles/Title.css'
import GlitchSquiggly from 'react-glitch-effect/core/GlitchSquiggly';
import Glitch from 'react-glitch-text'


export default function Title(props) {
    return (
        <div className='title-container'>

            <Glitch color='whitesmoke' fontSize='42px'>
                <GlitchSquiggly disabled={false}>
                    <h1 className='title-text' style={{'letterSpacing': props.spacing}}>
                        BOWEI DOMAIN
                    </h1>
                </GlitchSquiggly>
            </Glitch>
        </div>
    )
}
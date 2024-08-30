import React from 'react';
import Typewriter from 'typewriter-effect';
import '../styles/TypeWriter.css';

const TypeWriter = () => {
    return (
        <div className="typewriter-container">
            <div className="typewriter typewriter-active">
                <Typewriter
                    options={{
                        strings: ['Welcome to CookKarlo',
                            'Delicious Meals Delivered',
                             'Experience Culinary Excellencez'],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        deleteSpeed: 60,
                        onLoopComplete: () => {
                            document.querySelector('.typewriter').classList.remove('typewriter-active');
                            setTimeout(() => {
                                document.querySelector('.typewriter').classList.add('typewriter-active');
                            }, 60);
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default TypeWriter;

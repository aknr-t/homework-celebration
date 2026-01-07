import React, { forwardRef, useImperativeHandle } from 'react';

// Web implementation of Celebration component
// react-native-confetti-cannon is not compatible with web, so we render nothing.
const Celebration = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        start: () => {
            // No-op for web
            console.log('Celebration triggered (Web implementation: no effect)');
        }
    }));

    return null;
});

export default Celebration;

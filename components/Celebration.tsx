import React, { forwardRef } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

import { Platform, View, Text } from 'react-native';

const Celebration = forwardRef((props, ref: any) => {
  if (Platform.OS === 'web') {
    return null; // ConfettiCannon may cause issues on web
  }

  return (
    <ConfettiCannon
      count={200}
      origin={{ x: -10, y: 0 }}
      autoStart={false}
      ref={ref}
      fadeOut={true}
      fallSpeed={3000}
      colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
    />
  );
});

export default Celebration;

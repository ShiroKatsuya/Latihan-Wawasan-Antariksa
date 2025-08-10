import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';

type PlanetSpec = {
  name: string;
  color: string;
  size: number; // diameter in dp
  periodSec: number; // orbital period in seconds
};

// Basic planet styling; not to scale, but relatively sized
const PLANETS: PlanetSpec[] = [
  { name: 'Mercury', color: '#b1b1b1', size: 6, periodSec: 8 },
  { name: 'Venus', color: '#c9a161', size: 8, periodSec: 12 },
  { name: 'Earth', color: '#4ea5d9', size: 9, periodSec: 16 },
  { name: 'Mars', color: '#db504a', size: 7, periodSec: 20 },
  { name: 'Jupiter', color: '#d1b07f', size: 14, periodSec: 28 },
  { name: 'Saturn', color: '#d9c79e', size: 12, periodSec: 36 },
  { name: 'Uranus', color: '#78c6c7', size: 10, periodSec: 44 },
  { name: 'Neptune', color: '#4f7cac', size: 10, periodSec: 54 },
];

const StarsBackground: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Size the whole system to fit inside the screen with margin
  const systemSize = Math.min(screenWidth, screenHeight) * 0.9;
  const systemRadius = systemSize / 2;

  // Create evenly spaced orbital radii, leaving room for the Sun in the middle
  const orbitRadii = useMemo(() => {
    const innerGap = 20; // space around the Sun
    const outerPadding = 8;
    const usableRadius = systemRadius - outerPadding;
    const step = (usableRadius - innerGap) / (PLANETS.length + 1);
    return PLANETS.map((_, index) => innerGap + step * (index + 1));
  }, [systemRadius]);

  // Animated rotation for each planet
  const rotations = useRef<Animated.Value[]>(
    PLANETS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = rotations.map((value, index) => {
      const duration = PLANETS[index].periodSec * 1000;
      return Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    });
    animations.forEach((a) => a.start());
    return () => {
      // Reset values on unmount to avoid stale animations
      rotations.forEach((v) => v.stopAnimation(() => v.setValue(0)));
    };
  }, [rotations]);

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Central container to keep the system centered */}
      <View
        style={{
          width: systemSize,
          height: systemSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Sun */}
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: '#FDB813',
            shadowColor: '#FDB813',
            shadowOpacity: 0.9,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
          }}
        />

        {/* Orbits + Planets */}
        {PLANETS.map((planet, index) => {
          const radius = orbitRadii[index];
          const rotation = rotations[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          });

          return (
            <Animated.View
              key={planet.name}
              style={{
                position: 'absolute',
                width: radius * 2,
                height: radius * 2,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ rotate: rotation }],
              }}
            >
              {/* Orbit ring */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: radius,
                }}
              />

              {/* Planet positioned at the top of the orbit circle */}
              <View
                style={{
                  position: 'absolute',
                  top: -planet.size / 2,
                  left: radius - planet.size / 2,
                  width: planet.size,
                  height: planet.size,
                  borderRadius: planet.size / 2,
                  backgroundColor: planet.color,
                }}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default StarsBackground;
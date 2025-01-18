import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const COLLAPSED_HEIGHT = 200;
const HALF_EXPANDED_HEIGHT = height * 0.5;
const EXPANDED_HEIGHT = height * 0.7;
const VELOCITY_THRESHOLD = 0.5;

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  dragHandle: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  parkingLotItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parkingLotName: {
    fontSize: 18,
    fontWeight: '600',
  },
  parkingLotDistance: {
    fontSize: 14,
    color: '#888',
  },
});

export default function BottomNavBar({ filteredParkingLots, animatedHeight }) {
  const initialHeightRef = useRef(COLLAPSED_HEIGHT);

  // Update the `initialHeightRef` based on animated value changes
  useEffect(() => {
    const listenerId = animatedHeight.addListener(({ value }) => {
      initialHeightRef.current = value;
    });

    return () => {
      animatedHeight.removeListener(listenerId);
    };
  }, [animatedHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = initialHeightRef.current - gestureState.dy;
        newHeight = Math.max(COLLAPSED_HEIGHT, Math.min(newHeight, EXPANDED_HEIGHT));
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        let finalHeight = animatedHeight._value || COLLAPSED_HEIGHT;
        let toHeight;

        if (gestureState.vy < -VELOCITY_THRESHOLD) {
          toHeight = finalHeight < HALF_EXPANDED_HEIGHT ? HALF_EXPANDED_HEIGHT : EXPANDED_HEIGHT;
        } else if (gestureState.vy > VELOCITY_THRESHOLD) {
          toHeight = finalHeight > HALF_EXPANDED_HEIGHT ? HALF_EXPANDED_HEIGHT : COLLAPSED_HEIGHT;
        } else {
          const nearest = [COLLAPSED_HEIGHT, HALF_EXPANDED_HEIGHT, EXPANDED_HEIGHT].reduce((prev, curr) =>
            Math.abs(finalHeight - curr) < Math.abs(finalHeight - prev) ? curr : prev
          );
          toHeight = nearest;
        }

        Animated.spring(animatedHeight, {
          toValue: toHeight,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View style={[styles.bottomNav, { height: animatedHeight }]}>
      <View style={styles.dragHandle} {...panResponder.panHandlers}>
        <View style={styles.dragBar} />
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={filteredParkingLots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.parkingLotItem}>
              <Text style={styles.parkingLotName}>{item.name}</Text>
              <Text style={styles.parkingLotDistance}>{item.distance}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Animated.View>
  );
}

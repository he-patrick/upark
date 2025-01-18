// BottomNavBar.js
import React, { useRef } from 'react';
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

const VELOCITY_THRESHOLD = 0.1;

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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        initialHeightRef.current = animatedHeight._value || COLLAPSED_HEIGHT;
      },
      onPanResponderMove: (_, gestureState) => {
        let newHeight = initialHeightRef.current - gestureState.dy;
        newHeight = Math.max(COLLAPSED_HEIGHT, Math.min(newHeight, EXPANDED_HEIGHT));
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        let finalHeight = animatedHeight._value;
        let toHeight;

        if (gestureState.vy < -VELOCITY_THRESHOLD || gestureState.dy < -10) {
          if (finalHeight < HALF_EXPANDED_HEIGHT) {
            toHeight = HALF_EXPANDED_HEIGHT;
          } else {
            toHeight = EXPANDED_HEIGHT;
          }
        } else if (gestureState.vy > VELOCITY_THRESHOLD || gestureState.dy > 10) {
          if (finalHeight > HALF_EXPANDED_HEIGHT) {
            toHeight = HALF_EXPANDED_HEIGHT;
          } else {
            toHeight = COLLAPSED_HEIGHT;
          }
        } else {
          const distances = [
            { height: COLLAPSED_HEIGHT, distance: Math.abs(finalHeight - COLLAPSED_HEIGHT) },
            { height: HALF_EXPANDED_HEIGHT, distance: Math.abs(finalHeight - HALF_EXPANDED_HEIGHT) },
            { height: EXPANDED_HEIGHT, distance: Math.abs(finalHeight - EXPANDED_HEIGHT) },
          ];

          distances.sort((a, b) => a.distance - b.distance);
          toHeight = distances[0].height;
        }

        Animated.timing(animatedHeight, {
          toValue: toHeight,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View style={[styles.bottomNav, { height: animatedHeight }]}>
      {/* Drag Handle */}
      <View style={styles.dragHandle} {...panResponder.panHandlers}>
        <View style={styles.dragBar} />
      </View>

      {/* Content */}
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

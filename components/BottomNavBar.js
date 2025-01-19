import React, { useRef, useEffect, useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

const COLLAPSED_HEIGHT = 150;
const HALF_EXPANDED_HEIGHT = height * 0.5;
const EXPANDED_HEIGHT = height * 0.75;
const VELOCITY_THRESHOLD = 0.3;

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
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Optional: Add shadow for a card-like appearance
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedParkingLotItem: {
    backgroundColor: '#e0f7fa', // Highlight color
    borderWidth: 2,
    borderColor: '#00796B', // Teal color for the border
  },
  parkingLotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  parkingLotDetails: {
    flex: 1,
  },
  parkingLotName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  parkingLotDistance: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  parkingLotPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  parkingLotRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
});

export default function BottomNavBar({
  filteredParkingLots,
  animatedHeight,
  selectedParkingLotId,
  setSelectedParkingLotId,
  appleID,
}) {
  const initialHeightRef = useRef(COLLAPSED_HEIGHT);
  const flatListRef = useRef(null);

  const [parkingLotsWithPrices, setParkingLotsWithPrices] = useState([]);

  // Function to calculate parking price
  function calculateParkingPrice(time) {
    const hours = time.getHours();
    let basePricePerHour;

    if (hours >= 8 && hours < 18) {
      // Peak hours
      basePricePerHour = 5; // $5 per hour during peak hours
    } else {
      // Off-peak hours
      basePricePerHour = 2; // $2 per hour during off-peak hours
    }

    // Add random noise between -$0.50 and +$0.50
    const noise = Math.random() - 0.5;

    const finalPricePerHour = basePricePerHour + noise;

    // Round to two decimal places
    const pricePerHour = Math.round(finalPricePerHour * 100) / 100;

    return pricePerHour;
  }

  // Calculate prices and ratings when filteredParkingLots changes
  useEffect(() => {
    const time = new Date();
    const updatedParkingLots = filteredParkingLots.map((lot) => {
      const price = calculateParkingPrice(time);

      // Add a random rating between 4.0 and 5.0, rounded to one decimal place
      const rating = parseFloat(
        (Math.random() * (5 - 4) + 4).toFixed(1)
      );

      return {
        ...lot,
        price,
        rating,
      };
    });
    setParkingLotsWithPrices(updatedParkingLots);
  }, [filteredParkingLots]);

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
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 20,
      onPanResponderMove: (_, gestureState) => {
        // Apply a scaling factor to gestureState.dy
        const scalingFactor = 3; // Adjust this value as needed
        const scaledDy = gestureState.dy / scalingFactor;
        let newHeight = initialHeightRef.current - scaledDy;
        newHeight = Math.max(
          COLLAPSED_HEIGHT,
          Math.min(newHeight, EXPANDED_HEIGHT)
        );
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        let finalHeight = animatedHeight._value || COLLAPSED_HEIGHT;
        let toHeight;

        if (gestureState.vy < -VELOCITY_THRESHOLD) {
          toHeight =
            finalHeight < HALF_EXPANDED_HEIGHT
              ? HALF_EXPANDED_HEIGHT
              : EXPANDED_HEIGHT;
        } else if (gestureState.vy > VELOCITY_THRESHOLD) {
          toHeight =
            finalHeight > HALF_EXPANDED_HEIGHT
              ? HALF_EXPANDED_HEIGHT
              : COLLAPSED_HEIGHT;
        } else {
          const nearest = [
            COLLAPSED_HEIGHT,
            HALF_EXPANDED_HEIGHT,
            EXPANDED_HEIGHT,
          ].reduce((prev, curr) =>
            Math.abs(finalHeight - curr) < Math.abs(finalHeight - prev)
              ? curr
              : prev
          );
          toHeight = nearest;
        }

        // Adjust the spring animation parameters
        Animated.spring(animatedHeight, {
          toValue: toHeight,
          friction: 10, // Increase friction to slow down
          tension: 80, // Adjust tension as needed
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
          ref={flatListRef}
          data={parkingLotsWithPrices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const distanceText =
              item.distance < 1
                ? `${Math.round(item.distance * 1000)} m`
                : `${item.distance.toFixed(1)} km`;

            return (
              <TouchableOpacity
                style={[
                  styles.parkingLotItem,
                  item.id === selectedParkingLotId &&
                    styles.selectedParkingLotItem,
                ]}
                onPress={() => {
                  setSelectedParkingLotId(item.id);
                  try {
                    flatListRef.current.scrollToIndex({
                      index,
                      animated: true,
                    });
                  } catch (error) {
                    console.warn('scrollToIndex error:', error);
                  }
                }}
              >
                <View style={styles.parkingLotContent}>
                  {/* Parking Lot Details */}
                  <View style={styles.parkingLotDetails}>
                    <Text style={styles.parkingLotName}>{item.name}</Text>
                    <Text style={styles.parkingLotDistance}>{distanceText}</Text>
                    <Text style={styles.parkingLotPrice}>
                      ${item.price} / hour
                    </Text>
                  </View>
                  {/* Rating */}
                  <View style={styles.parkingLotRating}>
                    {/* Optional: Display numerical rating */}
                    <Text style={styles.ratingText}>{item.rating}</Text>

                    {/* Display star icons based on rating */}
                    {Array.from({ length: 5 }).map((_, index) => {
                      const ratingValue = index + 1;
                      let iconName = 'star-o';

                      if (ratingValue <= item.rating) {
                        iconName = 'star';
                      } else if (ratingValue - 0.5 <= item.rating) {
                        iconName = 'star-half-o';
                      }

                      return (
                        <Icon
                          key={index}
                          name={iconName}
                          size={16}
                          color="#FFD700"
                        />
                      );
                    })}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          // Optional: Adjust if items have fixed height
          // getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
        />
      </View>
    </Animated.View>
  );
}

import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
  } from 'react-native';

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: 200,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 10,
        paddingTop: 10,
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: -2 }, // iOS shadow
        shadowOpacity: 0.25, // iOS shadow
        shadowRadius: 3.84, // iOS shadow
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

export default function BottomNavBar({ filteredParkingLots }) {
    return (
        <View style={styles.bottomNav}>
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
    );
}

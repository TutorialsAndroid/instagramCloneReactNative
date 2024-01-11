/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, FlatList, Text, StyleSheet} from 'react-native';

const CircleImageList = ({data}) => {
  const renderCircleImage = ({item}) => (
    <View style={styles.container}>
        <View style={styles.circleImageContainer}>
          <Image source={item.image} style={styles.circleImage} />
        </View>
        <Text style={styles.imageText}>{item.text}</Text>
    </View>
  );

  return (
    <View >
      <FlatList
        data={data}
        renderItem={renderCircleImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  circleImageContainer: {
    width: 65,
    height: 65,
    borderRadius: 250,
    overflow: 'hidden',
    marginHorizontal: 5,
    borderColor: '#AA336A',
    borderWidth: 4,
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    width: 65,
    fontSize: 10,
    marginTop: 5,
    marginStart: 6,
    textAlign: 'center',
    color: 'black', // You can set the desired color for the text
  },
});

export default CircleImageList;

/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CircleImageList = ({data}) => {
  const renderCircleImage = ({item}) => (
    <View style={styles.circleImageContainer}>
        <Image source={item} style={styles.circleImage} />
    </View>
  );

  return (
    <View style={styles.container}>
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
});

export default CircleImageList;

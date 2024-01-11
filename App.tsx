import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './resource/styles';
import CircleImageList from './instagramclone/CircleImageList';
import PostView from './instagramclone/PostView';

function App(): React.JSX.Element {
  const imageData = [
    {image: require('./assets/images/image5.jpg'), text: 'itss_sonalii'},
    {image: require('./assets/images/image6.jpg'), text: 'rohit30619...'},
    {image: require('./assets/images/image7.jpg'), text: 'android'},
    {image: require('./assets/images/image8.jpg'), text: 'marvelstud...'},
    {image: require('./assets/images/image9.jpg'), text: 'google'},
    {image: require('./assets/images/image10.jpg'), text: '_off_track___'},
    // Add more image sources and text as needed
  ];

  const postData = [
    {
      username: 'lovethenature95',
      userAvatar: require('./assets/images/lovethenature95.jpg'),
      userPostImage: require('./assets/post/post01.jpg'),
    },
    {
      username: 'nature_beauty511',
      userAvatar: require('./assets/images/nature_beauty511.jpg'),
      userPostImage: require('./assets/post/post02.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Toolbar />
          <CircleImageList data={imageData} />
          <ScrollView>
            {postData.map((post, index) => (
              <PostView key={index} post={post} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Toolbar = () => {
  return (
    <View style={styles.toolbar}>
      <Image
        source={require('./assets/icons/instagram_logo_text.png')}
        style={styles.toolbarLogo}
      />
      <View style={styles.toolbarButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Activity button pressed...')}>
          <Image
            source={require('./assets/icons/ic_activity_button.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Messaging button pressed...')}>
          <Image
            source={require('./assets/icons/ic_messaging_button.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

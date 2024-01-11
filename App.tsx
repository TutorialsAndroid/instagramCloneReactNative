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
    require('./assets/images/image1.jpg'),
    require('./assets/images/image2.jpg'),
    require('./assets/images/image3.jpg'),
    require('./assets/images/image4.jpg'),
    require('./assets/images/image1.jpg'),
    require('./assets/images/image2.jpg'),
    require('./assets/images/image3.jpg'),
    require('./assets/images/image4.jpg'),
    // Add more image sources as needed
  ];

  const postData = [
    {
      username: 'ipsum',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
    },
    {
      username: 'ipsumview',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
    },
    {
      username: 'loremipsum',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
    },
    {
      username: 'ipsumworld',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
    },
    {
      username: 'helloworld',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
    },
    {
      username: 'hello',
      userAvatar: require('./assets/images/image2.jpg'),
      userPostImage: require('./assets/post/image01.jpeg'),
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

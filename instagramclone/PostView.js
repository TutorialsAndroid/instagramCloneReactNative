/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const PostView = ({ post }) => {
    return (
        <View style={styles.container}>
            <View style={styles.postUserInfoView}>
                <Image style={styles.userProfilePhoto}
                source={post.userAvatar}
                />
                <Text style={styles.userName}>{post.username}</Text>
            </View>
            <Image style={styles.postImage}
            source={post.userPostImage}
            />
            <View style={styles.postUserLikeContainer}>
                <TouchableOpacity style={styles.postButtons}
                    onPress={() => console.log('like button pressed...')}>
                    <Image
                        source={require('./images/ic_like.png')}
                        style={{width: 24, height: 24}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('comment button pressed...')}>
                    <Image
                        source={require('./images/ic_comment.png')}
                        style={{width: 24, height: 24}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userProfilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    postUserInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    postUserLikeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    postButtons: {
        marginStart: 16,
        marginEnd: 6,
    },
});

export default PostView;
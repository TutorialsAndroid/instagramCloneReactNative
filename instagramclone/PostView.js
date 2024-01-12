/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const PostView = ({ post }) => {
    return (
        <View style={styles.container}>
            <View style={styles.postUserInfoView}>
                {/* User profile photo */}
                <Image style={styles.userProfilePhoto}
                source={post.userAvatar}
                />
                {/* User name */}
                <Text style={styles.userName}>{post.username}</Text>

                {/* Follow and Menu button */}
                <View style={styles.postUserInfoView1}>
                    {/* Follow button */}
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => console.log('Follow button pressed...')}>
                        <Text style={styles.buttonText}>Follow</Text>
                    </TouchableOpacity>

                    {/* Menu button */}
                    <TouchableOpacity
                        // style={styles.buttonContainer}
                        onPress={() => console.log('Follow button pressed...')}>
                        <Image
                            source={require('./images/ic_more.png')}
                            style={{width: 24, height: 30}}
                        />
                    </TouchableOpacity>
                </View>
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
                <TouchableOpacity style={styles.postButtons1}
                    onPress={() => console.log('comment button pressed...')}>
                    <Image
                        source={require('./images/ic_comment.png')}
                        style={{width: 24, height: 24}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButtons1}
                    onPress={() => console.log('comment button pressed...')}>
                    <Image
                        source={require('./images/ic_send.png')}
                        style={{width: 24, height: 24}}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.savedButton}
                    onPress={() => console.log('comment button pressed...')}>
                    <Image
                        source={require('./images/ic_saved.png')}
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
        color: '#373737',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userProfilePhoto: {
        width: 30,
        height: 30,
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
        marginEnd: 20,
    },
    postButtons1: {
        marginEnd: 20,
    },
    savedButton: {
        marginEnd: 10,
        marginLeft: 'auto',
    },
    buttonContainer: {
        backgroundColor: '#EFEFEF',
        padding: 4,
        width: 60,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
    postUserInfoView1: {
        flexDirection: 'row',
        marginEnd: 10,
        marginLeft: 'auto',
    },
    moreButton: {

    },
});

export default PostView;
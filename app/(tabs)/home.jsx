import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Image,
  Animated,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const animateValue = new Animated.Value(0);
const translateX = animateValue.interpolate({
  inputRange: [0, 1],
  outputRange: [WIDTH, -WIDTH],
});
const rotate = animateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});
export default function FeedScreen() {
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <Item item={item} shouldPlay={index === currentViewableItemIndex} />
        )}
        keyExtractor={(item) => item}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          gap: 57,
          backgroundColor: "black",
          width: WIDTH,
          height: 50,
          bottom: 0,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        <Ionicons
          name={"home-outline"}
          color={"white"}
          size={EStyleSheet.value("1.3rem")}
        />
        <Ionicons
          name={"search-outline"}
          color={"white"}
          size={EStyleSheet.value("1.4rem")}
        />
        <Ionicons
          name={"play-circle-outline"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
        />

        <Ionicons
          name={"storefront-outline"}
          color={"white"}
          size={EStyleSheet.value("1.3rem")}
        />
        <FontAwesome
          name={"user-circle-o"}
          color={"white"}
          size={EStyleSheet.value("1.3rem")}
        />
      </View>
    </View>
  );
}

const Item = ({ item, shouldPlay }) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!video.current) return;

    if (shouldPlay) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
      video.current.setPositionAsync(0);
    }
  }, [shouldPlay]);

  return (
    <Pressable
      onPress={() =>
        status.isPlaying
          ? video.current?.pauseAsync()
          : video.current?.playAsync()
      }
    >
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          source={{ uri: item }}
          style={styles.video}
          isLooping
          resizeMode={ResizeMode.COVER}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <Text
          style={{
            fontWeight: 900,
            fontSize: EStyleSheet.value("1.5rem"),
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          Reels
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 43,
          right: 30,
        }}
      >
        <MaterialCommunityIcons
          name={"camera-outline"}
          color={"white"}
          size={EStyleSheet.value("2rem")}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 150,
          left: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.logo}
          source={{
            uri: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
          }}
        ></Image>
        <View
          style={{
            position: "absolute",
            paddingLeft: 50,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontWeight: 400,
              fontSize: EStyleSheet.value("1.2rem"),
              color: "white",
              textShadowColor: "#585858",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}
          >
            ramdomusername . Follow
          </Text>
          <Text
            style={{
              paddingBottom: 9,
              fontWeight: 300,
              fontSize: EStyleSheet.value("1rem"),
              color: "white",
              textShadowColor: "#585858",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}
          >
            A Random User Account
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 105,
          left: 30,
        }}
      >
        <Text
          style={{
            fontWeight: 300,
            paddingRight: 70,
            fontSize: EStyleSheet.value("1rem"),
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing. Eaque beatae sunt
          harum quam...{" "}
          <Text style={{ textDecorationLine: "underline" }}>more</Text>
        </Text>
      </View>

      <View
        style={{
          bottom: 65,
          left: 30,
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          gap: 25,
        }}
      >
        <MaterialCommunityIcons
          name={"heart"}
          color={"white"}
          size={EStyleSheet.value("1.6rem")}
        />
        <FontAwesome
          name={"comment"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
        />
        <FontAwesome
          name={"paper-plane"}
          color={"white"}
          size={EStyleSheet.value("1.4rem")}
        />
        <Entypo
          name={"dots-three-horizontal"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
        />
      </View>

      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          right: 30,
          bottom: 60,
        }}
      >
        <MaterialCommunityIcons
          name={"heart"}
          color={"white"}
          size={EStyleSheet.value("1rem")}
        />
        <Text
          style={{
            fontWeight: 300,
            paddingLeft: 5,
            paddingBottom: 10,
            paddingRight: 15,
            fontSize: EStyleSheet.value("0.8rem"),
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          55.2 K
        </Text>
        <FontAwesome
          name={"comment"}
          color={"white"}
          size={EStyleSheet.value("1rem")}
        />
        <Text
          style={{
            fontWeight: 300,
            paddingLeft: 5,
            paddingBottom: 10,
            fontSize: EStyleSheet.value("0.8rem"),
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          1.2 K
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 22,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
});

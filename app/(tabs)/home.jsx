import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const videos = [
  "https://r1---sn-5pgoxu-cvhz.googlevideo.com/videoplayback?expire=1717023635&ei=M19XZo-oGK6fi9oP9ZCl8Aw&ip=2a03%3Ab0c0%3A3%3Ad0%3A%3A1a49%3A6002&id=o-AP5q5HnwllXrBnqF7rvyIv7jlhPBcOl5jFOV-tkUtMtd&itag=136&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=7306246&dur=24.766&lmt=1686054496603541&keepalive=yes&c=IOS&txp=631A224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgbTDi_jHPaqR6qCk2tbeb2ImXZPl9miLXoQeWKKiSO68CIE0gHhPOCBI63UMANCHhTicsVMrEFSr5RGV4YIHws2_I&title=Top+7+Most+Dangerous+Natural+Disasters+%23shorts+%23Crazy-7&title=Top%207%20Most%20Dangerous%20Natural%20Disasters%20%23shorts%20%23Crazy-7&cms_redirect=yes&mh=pF&mip=103.196.78.122&mm=31&mn=sn-5pgoxu-cvhz&ms=au&mt=1717001595&mv=m&mvi=1&pcm2cms=yes&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHWaYeowRAIgCMvkvV28JJ-thDp2x3WI52NsVjBepK2U6pxgnsKyP3ECIDlbU-39vIaBfRWenSXLhk6H_dh45o-ipi5MaYUq7y3_",
  "https://r2---sn-5pgoxu-cvhe.googlevideo.com/videoplayback?expire=1717031141&ei=hXxXZrj6JPWni9oP_e6egA4&ip=2a03%3Ab0c0%3A3%3Ad0%3A%3A1a49%3A6002&id=o-AKIR2nI_j17-3yrL12jxZXKPjFM9uxcWkyR_dNZ479Bl&itag=136&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1176884&dur=8.833&lmt=1683959160610286&keepalive=yes&c=IOS&txp=631A224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAKNmtUXP7Fz1rM3SW9dSBonGI-RL8lZc6PBjFZpmjmITAiEA01JZf_uTmjcuE63T8XR14DzutCJbjqdzPUZbr2veGPk%3D&title=VN+editing+%23nature+%23trendingshorts+%23shorts+%23youtubeshorts+%23cinematography+%23rain+%23shortvideo&title=VN%20editing%20%23nature%20%23trendingshorts%20%23shorts%20%23youtubeshorts%20%23cinematography%20%23rain%20%23shortvideo&cms_redirect=yes&mh=5S&mip=103.196.78.122&mm=31&mn=sn-5pgoxu-cvhe&ms=au&mt=1717009286&mv=m&mvi=2&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRQIgZcfxHLmQMtMcOHGn5xHL02KkEzmNh8FCUGeOKj-9P7QCIQDLK9tyL7I0rvnVxIbzlLlbXgVgrfd3QJwm3nksLwqYyg%3D%3D",
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
        <FontAwesome
          name={"heart"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
        />
        <FontAwesome
          name={"comment"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
        />
        <FontAwesome
          name={"paper-plane"}
          color={"white"}
          size={EStyleSheet.value("1.5rem")}
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

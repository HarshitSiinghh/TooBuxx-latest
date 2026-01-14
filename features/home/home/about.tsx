


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type Card = {
  id: number;
  img: any;
  title: string;
  time: string;
};

export const About = () => {
  const cards: Card[] = [
    {
      id: 1,
      img: require("../../../images/family-image.jpg"),
      title: "I saved daily and bought 24K gold",
      time: "12 days ago",
    },
    {
      id: 2,
      img: require("../../../images/car.webp"),
      title: "Invested every month now I own a car!",
      time: "1 month ago",
    },
    {
      id: 3,
      img: require("../../../images/saving.webp"),
      title: "Started saving ₹100 daily — small steps matter!",
      time: "3 weeks ago",
    },
    {
      id: 4,
      img: require("../../../images/car.webp"),
      title: "Started saving ₹100 daily — small steps matter!",
      time: "3 weeks ago",
    },
    {
      id: 5,
      img: require("../../../images/car.webp"),
      title: "Started saving ₹100 daily — small steps matter!",
      time: "3 weeks ago",
    },
    {
      id: 6,
      img: require("../../../images/saving.webp"),
      title: "Started saving ₹100 daily — small steps matter!",
      time: "3 weeks ago",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        USER <Text style={styles.highlight}>SUCCESS STORIES</Text>
      </Text>

      <FlatList
        horizontal
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 8 }}
        renderItem={({ item }) => (
          <Pressable style={styles.item}>
            <View style={styles.card}>
              <View style={styles.imageWrap}>
                <Image source={item.img} style={styles.image} />
                <View style={styles.overlay} />
              </View>

              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};




const CARD_WIDTH = width * 0.75;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  heading: {
    fontSize: 10,
    fontWeight: "900",
    color: "#6b7280",
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 8,
  },

  highlight: {
    color: "#c084fc",
  },

  item: {
    paddingLeft: 8,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#2f2360",
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff10",
  },

  imageWrap: {
    height: 160,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(47,35,96,0.6)",
  },

  content: {
    padding: 16,
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 6,
  },

  time: {
    fontSize: 10,
    fontWeight: "900",
    color: "#6b7280",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

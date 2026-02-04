import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export const ForYouSection = () => {
  const router = useRouter();
  const items = [
    {
      img: require("../../images/box.webp"),
      title: "Daily Savings",
      route: "/savings/daily-saving",
    },
    {
      img: require("../../images/instant-saving.png"),
      title: "Instant Savings",
      route: "/savings/instant-saving",
    },
    {
      img: require("../../images/spins.png"),
      title: "Spins",
      route: "/spin-and-win/spin-wheel",
    },
    {
      img: require("../../images/box.webp"),
      title: "Rewards",
      route: "/profile/reward",
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={styles.item}
          onPress={() => {
            router.push(item.route as any);
          }}
        >
          <Image source={item.img} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

/* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 14,
//     backgroundColor: "#2f2360",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderRadius: 18,
//     marginHorizontal: 16,
//   },

//   item: {
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   image: {
//     width: 48,
//     height: 48,
//     marginBottom: 6,
//     resizeMode: "contain",
//   },

//   title: {
//     color: "#d1d5db",
//     fontSize: 11,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });




const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#0b3442",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flex: 1,
  },

  image: {
    width: 46,
    height: 46,
    resizeMode: "contain",
  },

  title: {
    color: "#8fbac4",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

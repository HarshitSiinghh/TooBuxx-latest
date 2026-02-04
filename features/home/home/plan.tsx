import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export const Plan = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Gold <Text style={styles.white}>Saving Plans</Text>
      </Text>

      {/* ===== Plan 1 ===== */}
      <Pressable onPress={()=>router.push("/savings/daily-saving",)}> 
      {/* <LinearGradient
        colors={["#5f37cb", "#9b59b6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      > */}


      <LinearGradient
  colors={["#104e64", "#062530"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
>

        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>


           <View>
            <Text style={styles.title}>Save Daily</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              <Feather  size={14} color="white" />
              <Text style={styles.subText}>₹10/day</Text>
            </View>
          </View>
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>
         </Pressable>

      {/* ===== Plan 2 ===== */}

       <Pressable onPress={()=>router.push('/savings/monthly-saving')}>
      <LinearGradient
        colors={["#d4a017", "#ffdf6b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>



           <View>
            <Text style={styles.title}>Save Monthly</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              {/* <Feather name="dollar-sign" size={14} color="white" /> */}
              <Text style={styles.subText}>₹100/month</Text>
            </View>
          </View>
     
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>
  </Pressable>


      {/* ===== Plan 3 ===== */}



      <Pressable onPress={()=>router.push('/savings/weekly-saving')}>
      <LinearGradient
        colors={["#11998e", "#38ef7d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <View style={styles.iconWrap}>
            <Image
              source={require("../../../images/box1.webp")}
              style={styles.planImg}
            />
          </View>


  
          <View>
            <Text style={styles.title}>Weekly Saving</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>Start from</Text>
              {/* <Feather name="dollar-sign" size={14} color="white" /> */}
              <Text style={styles.subText}> ₹ Any amount</Text>
            </View>
          </View>
        </View>

        <View style={styles.rightIcon}>
          <Feather name="chevron-right" size={18} color="white" />
        </View>
      </LinearGradient>
</Pressable>
    </View>
  );
};




// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#062530", // app primary bg
//     padding: 16,
//     marginTop: 8,
//   },

//   heading: {
//     color: "#facc15", // gold
//     fontWeight: "800",
//     marginBottom: 12,
//     fontSize: 15,
//   },

//   white: {
//     color: "#ffffff",
//   },

//   card: {
//     borderRadius: 14,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 10,
//     minHeight: 100,

//     // subtle depth
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     elevation: 6,
//   },

//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   iconWrap: {
//     height: 56,
//     width: 56,
//     borderRadius: 28,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(255,255,255,0.12)", // glass feel
//   },

//   planImg: {
//     width: 36,
//     height: 36,
//     resizeMode: "contain",
//   },

//   title: {
//     color: "#ffffff",
//     fontWeight: "800",
//     fontSize: 14,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginTop: 4,
//   },

//   subText: {
//     color: "#c7e4ec", // muted teal
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   rightIcon: {
//     height: 36,
//     width: 36,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "rgba(199,228,236,0.5)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });




const styles = StyleSheet.create({
  container: {
    backgroundColor: "#062530",
    padding: 16,
    marginTop: 8,
  },

  heading: {
    color: "#facc15",
    fontWeight: "800",
    marginBottom: 12,
    fontSize: 15,
  },

  white: {
    color: "#ffffff",
  },

  card: {
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    minHeight: 100,

    borderWidth: 1,
    borderColor: "#104e64",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconWrap: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16,78,100,0.35)",
    borderWidth: 1,
    borderColor: "#104e64",
  },

  planImg: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },

  title: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  subText: {
    color: "#8fbac4",
    fontSize: 12,
    fontWeight: "600",
  },

  rightIcon: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#104e64",
    alignItems: "center",
    justifyContent: "center",
  },
});

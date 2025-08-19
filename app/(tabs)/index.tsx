import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import SearchBarComponent from '@/components/SearchBar';
import { useRouter } from "expo-router";

const PlaceholderImage = require("../../assets/images/MovieLogo.png")

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#FFD700", "#FFB700", "#1C1C1C", "#000000"]} // sort → mørkegrå fade
      start={{ x: 0, y: -0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
       <View style={styles.content}>
        <ScrollView>
        <Image source={PlaceholderImage} style={styles.logo}/>

        <Text style={styles.text}>Welcome To ShakeMovie</Text>
        <SearchBarComponent 
          onPress={() => router.push("/search")}
          placeholder="Search for a song"
        />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    paddingVertical: 60 // mørk baggrund
  },
  content: {
    marginTop: 60,      // flytter alt indhold opad
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 18,
    marginBottom: 20,
  },
  text: {
    color: "#FFD700",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 30,
  },
  searchBar: {
    width: "100%",
    marginBottom: 30,
  },
  
});
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Saved() {
const {data: movies, loading: moviesLoading, error:moviesError} = useFetch(() => 
  fetchMovies({query: ""})
  );

  return (
    <LinearGradient
      colors={["#FFD700", "#FFB700", "#1C1C1C", "#000000"]}
      start={{ x: 0, y: -0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Here is my Saves</Text>
        <Text style={styles.subtitle}>All your saved movies will appear here.</Text>
      </View>

      <View style={styles.content}>
        <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    marginTop: 60,
    alignItems: "center",
    width: "90%",
  },
  title: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

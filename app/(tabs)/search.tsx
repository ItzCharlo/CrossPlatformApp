import MovieCard from "@/components/MovieCard";
import SearchBarComponent from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError, 
    refetch: loadMovies, 
    reset 
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) loadMovies();
      else reset();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <LinearGradient
      colors={["#FFD700", "#FFB700", "#1C1C1C", "#000000"]}
      start={{ x: 0, y: -0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Search Movies</Text>
        <SearchBarComponent
          placeholder="Search for a movie..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={movies || []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/movie/${item.id}`)}
            />
          )}
          ListHeaderComponent={
            <View>
              {moviesLoading && (
                <Text style={{ color: "#FFD700", textAlign: "center", marginTop: 20 }}>
                  Loading movies...
                </Text>
              )}
              {moviesError && (
                <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
                  Error: {moviesError.message || "Failed to fetch movies"}
                </Text>
              )}
              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ color: "white", fontWeight: "900" }}>Search Results for </Text>
                  <Text style={{ color: "yellow", fontWeight: "900" }}>{searchQuery}</Text>
                </View>
              )}
            </View>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError && searchQuery.trim() ? (
              <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
                No movies found for "{searchQuery}"
              </Text>
            ) : null
          }
        />

  {/* ...existing code... */}

      </View>
    </LinearGradient>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    paddingVertical: 60,
  },
  content: {
    marginTop: 60,
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

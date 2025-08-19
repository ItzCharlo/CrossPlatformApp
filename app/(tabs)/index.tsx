import { fetchMovies } from "@/services/api";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import MovieCard from "@/components/MovieCard";
import SearchBarComponent from '@/components/SearchBar';
import useFetch from "@/services/useFetch";
import React from "react";


const PlaceholderImage = require("../../assets/images/MovieLogo.png")

export default function Index() {
  const router = useRouter();

  const {data: movies, loading: moviesLoading, error:moviesError} = useFetch(() => 
  fetchMovies({query: ""})
  );

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

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 40 }} />
        ) : moviesError ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
              Error: {moviesError.message || "Failed to fetch movies"}
            </Text>
        ) : (
          <>
          <Text style={styles.sectionTitle}>Latest Movies</Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard 
                movie={item} 
                //onPress={() => router.push(`/movie/${item.id}`)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            scrollEnabled={false}
          />
        </>
        )}

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

  sectionTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
  },
  
});
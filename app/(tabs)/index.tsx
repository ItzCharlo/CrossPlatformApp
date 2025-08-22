import { fetchMovies } from "@/services/api";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { DeviceMotion } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


import MovieCard from "@/components/MovieCard";
import SearchBarComponent from '@/components/SearchBar';
import useFetch from "@/services/useFetch";

const PlaceholderImage = require("../../MovieLogo.png");


export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch<Movie[]>(() =>
    fetchMovies({ query: "" })
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  // Shake detection med opdateret moviesRef
  const lastShakeRef = useRef(0);
  const moviesRef = useRef(movies);
  useEffect(() => { moviesRef.current = movies; }, [movies]);
  useEffect(() => {
    if (Platform.OS === 'web') return;
    const subscription = DeviceMotion.addListener((data) => {
      const { acceleration } = data;
      if (acceleration && moviesRef.current && moviesRef.current.length > 0) {
        const { x, y, z } = acceleration;
        const totalAcceleration = Math.sqrt(x*x + y*y + z*z);
        if (totalAcceleration > 2.0) {
          const now = Date.now();
          if (now - lastShakeRef.current > 3000) {
            const movie = moviesRef.current[Math.floor(Math.random() * moviesRef.current.length)];
            setRandomMovie(movie);
            setModalVisible(true);
            lastShakeRef.current = now;
          }
        }
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <LinearGradient
      colors={["#FFD700", "#FFB700", "#1C1C1C", "#000000"]}
      start={{ x: 0, y: -0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Shake Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {randomMovie && (
              <MovieCard
                movie={randomMovie}
                onPress={() => {
                  setModalVisible(false);
                  router.push(`/movie/${randomMovie.id}`);
                }}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Luk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <ScrollView>
          <Image source={PlaceholderImage} style={styles.logo}/>
          <Text style={styles.text}>Welcome To ShakeMovie</Text>
          <SearchBarComponent 
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
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
                    onPress={() => router.push(`/movie/${item.id}`)}
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
    paddingVertical: 60
  },
  content: {
    marginTop: 60,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#FFD700",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

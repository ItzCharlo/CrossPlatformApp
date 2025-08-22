import MovieCard from '@/components/MovieCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const router = useRouter();

  // Funktion til at hente gemte film
  const loadSavedMovies = async () => {
    const movies = await AsyncStorage.getItem('savedMovies');
    if (movies) {
      setSavedMovies(JSON.parse(movies));
    } else {
      setSavedMovies([]);
    }
  };

  // Hent gemte film hver gang siden får fokus
  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  return (
    <LinearGradient
      colors={["#FFD700", "#FFB700", "#1C1C1C", "#000000"]}
      start={{ x: 0, y: -0.3 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Saved Movies</Text>
        <Text style={styles.subtitle}>All the movies you saved will appear here.</Text>
      </View>

      <View style={styles.listContainer}>
        {savedMovies.length === 0 ? (
          <Text style={styles.emptyText}>No movies saved yet!</Text>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => router.push(`/movie/${item.id}`)} // Naviger til detaljesiden
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
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
  header: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    width: "90%",
    flex: 1,
    alignItems: "center",
  },
  emptyText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});

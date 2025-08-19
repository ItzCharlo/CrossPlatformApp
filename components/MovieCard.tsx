import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void; // Tilføj onPress som prop
}
const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const gap = 10; // afstand mellem kortene
const cardWidth = (screenWidth - gap * (numColumns + 1)) / numColumns;

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {movie.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
      ) : (
        <View style={[styles.poster, styles.placeholder]}>
          <Text style={{ color: '#fff' }}>No Image</Text>
        </View>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.info}>
        {movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'} • ⭐ {movie.vote_average}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: { width: cardWidth, marginBottom: 15 },
    poster: { width: cardWidth, height: cardWidth * 1.5, borderRadius: 8, marginBottom: 5 },
    placeholder: { backgroundColor: '#444', justifyContent: 'center', alignItems: 'center' },
    title: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },
    info: { color: '#fff', fontSize: 10 },
  });

export default MovieCard;

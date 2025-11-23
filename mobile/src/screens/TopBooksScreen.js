import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import api from "../services/api";

export const topBooks = [
  {
    id: 1,
    title: "O Alquimista",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/81e7wniFqzL.jpg",
    reads: 12800
  },
  {
    id: 2,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    image: "https://m.media-amazon.com/images/I/71PNpNQkJBL.jpg",
    reads: 10200
  },
  {
    id: 3,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    image: "https://m.media-amazon.com/images/I/81w2MOMYiML.jpg",
    reads: 9800
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    image: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
    reads: 9500
  },
  {
    id: 5,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    image: "https://m.media-amazon.com/images/I/71fZQ1JskHL.jpg",
    reads: 9200
  },
  {
    id: 6,
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J. R. R. Tolkien",
    image: "https://m.media-amazon.com/images/I/91r6Pp7x5-L.jpg",
    reads: 9000
  },
  {
    id: 7,
    title: "Harry Potter e a Pedra Filosofal",
    author: "J. K. Rowling",
    image: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg",
    reads: 8800
  },
  {
    id: 8,
    title: "O Hobbit",
    author: "J. R. R. Tolkien",
    image: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
    reads: 8600
  },
  {
    id: 9,
    title: "O Código Da Vinci",
    author: "Dan Brown",
    image: "https://m.media-amazon.com/images/I/81Q0u6kS5HL.jpg",
    reads: 8300
  },
  {
    id: 10,
    title: "It: A Coisa",
    author: "Stephen King",
    image: "https://m.media-amazon.com/images/I/71Q1Iu4suSL.jpg",
    reads: 8100
  },
  {
    id: 11,
    title: "O Morro dos Ventos Uivantes",
    author: "Emily Brontë",
    image: "https://m.media-amazon.com/images/I/71w6VOGGA0L.jpg",
    reads: 7900
  },
  {
    id: 12,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    image: "https://m.media-amazon.com/images/I/81IuQwJdGML.jpg",
    reads: 7800
  },
  {
    id: 13,
    title: "A Menina que Roubava Livros",
    author: "Markus Zusak",
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
    reads: 7700
  },
  {
    id: 14,
    title: "Crepúsculo",
    author: "Stephenie Meyer",
    image: "https://m.media-amazon.com/images/I/81G6AV0sHSL.jpg",
    reads: 7600
  },
  {
    id: 15,
    title: "A Culpa é das Estrelas",
    author: "John Green",
    image: "https://m.media-amazon.com/images/I/71tI2W1hT1L.jpg",
    reads: 7400
  },
  {
    id: 16,
    title: "O Diário de Anne Frank",
    author: "Anne Frank",
    image: "https://m.media-amazon.com/images/I/81vpsIs58WL.jpg",
    reads: 7200
  },
  {
    id: 17,
    title: "A Cabana",
    author: "William P. Young",
    image: "https://m.media-amazon.com/images/I/81GqnF3bZzL.jpg",
    reads: 7000
  },
  {
    id: 18,
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    image: "https://m.media-amazon.com/images/I/81MZJ1ZF0dL.jpg",
    reads: 6900
  },
  {
    id: 19,
    title: "O Senhor das Moscas",
    author: "William Golding",
    image: "https://m.media-amazon.com/images/I/81pH7YQD9tL.jpg",
    reads: 6750
  },
  {
    id: 20,
    title: "Sherlock Holmes: Um Estudo em Vermelho",
    author: "Arthur Conan Doyle",
    image: "https://m.media-amazon.com/images/I/71E90IUAeCL.jpg",
    reads: 6600
  },
  {
    id: 21,
    title: "Drácula",
    author: "Bram Stoker",
    image: "https://m.media-amazon.com/images/I/81Yd6GmffHL.jpg",
    reads: 6450
  },
  {
    id: 22,
    title: "O Iluminado",
    author: "Stephen King",
    image: "https://m.media-amazon.com/images/I/71V8nG2CvoL.jpg",
    reads: 6300
  },
  {
    id: 23,
    title: "O Apanhador no Campo de Centeio",
    author: "J. D. Salinger",
    image: "https://m.media-amazon.com/images/I/81eZtQ2+20L.jpg",
    reads: 6200
  },
  {
    id: 24,
    title: "Moby Dick",
    author: "Herman Melville",
    image: "https://m.media-amazon.com/images/I/81k7g3KJxDL.jpg",
    reads: 6100
  },
  {
    id: 25,
    title: "O Conde de Monte Cristo",
    author: "Alexandre Dumas",
    image: "https://m.media-amazon.com/images/I/91cwOSS4sDL.jpg",
    reads: 6000
  }
];

export default function TopBooksScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const addBook = async (book) => {
    try {
      setLoading(true);

      await api.post("/books/add", {
        title: book.title,
        author: book.author,
        imageUrl: book.image
      });

      Alert.alert("Sucesso", `${book.title} foi adicionado à sua lista!`);
      navigation.navigate("BookList");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível adicionar o livro.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cover} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>por {item.author}</Text>
        <Text style={styles.reads}>{item.reads} leituras</Text>

        <TouchableOpacity style={styles.btnAdd} onPress={() => addBook(item)}>
          <Text style={styles.btnAddText}>Adicionar aos meus livros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Top 25 Livros Mais Lidos</Text>

      <FlatList
        data={topBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  reads: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
    marginBottom: 10,
  },
  btnAdd: {
    backgroundColor: "#0a84ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  btnAddText: {
    color: "#fff",
    fontWeight: "600",
  },
});

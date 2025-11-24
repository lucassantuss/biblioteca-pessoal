import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import api from "../services/api";

export const topBooks = [
  {
    id: 1,
    title: "O Alquimista",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/81slUinjTlS.jpg",
    reads: 12800
  },
  {
    id: 2,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    image: "https://m.media-amazon.com/images/I/61x1ZHomWUL._AC_UF1000,1000_QL80_.jpg",
    reads: 10200
  },
  {
    id: 3,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXxa4wCOeso-nEyU8vYz_sMD4kwgB2HY_gQ&s",
    reads: 9800
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    image: "https://m.media-amazon.com/images/I/51BIA4rraeL._AC_UF1000,1000_QL80_.jpg",
    reads: 9500
  },
  {
    id: 5,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    image: "https://m.media-amazon.com/images/I/81SVIwe5L9L._UF1000,1000_QL80_.jpg",
    reads: 9200
  },
  {
    id: 6,
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J. R. R. Tolkien",
    image: "https://m.media-amazon.com/images/I/81hCVEC0ExL.jpg",
    reads: 9000
  },
  {
    id: 7,
    title: "Harry Potter e a Pedra Filosofal",
    author: "J. K. Rowling",
    image: "https://m.media-amazon.com/images/I/81pB+joKL4L._UF1000,1000_QL80_.jpg",
    reads: 8800
  },
  {
    id: 8,
    title: "O Hobbit",
    author: "J. R. R. Tolkien",
    image: "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
    reads: 8600
  },
  {
    id: 9,
    title: "O Código Da Vinci",
    author: "Dan Brown",
    image: "https://m.media-amazon.com/images/I/91QSDmqQdaL._AC_UF1000,1000_QL80_.jpg",
    reads: 8300
  },
  {
    id: 10,
    title: "It: A Coisa",
    author: "Stephen King",
    image: "https://m.media-amazon.com/images/I/71IYhitXqUL._AC_UF350,350_QL80_.jpg",
    reads: 8100
  },
  {
    id: 11,
    title: "O Morro dos Ventos Uivantes",
    author: "Emily Brontë",
    image: "https://m.media-amazon.com/images/I/81LxzXa2MWL.jpg",
    reads: 7900
  },
  {
    id: 12,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    image: "https://m.media-amazon.com/images/I/71EoqDOmgZL._AC_UF1000,1000_QL80_.jpg",
    reads: 7800
  },
  {
    id: 13,
    title: "A Menina que Roubava Livros",
    author: "Markus Zusak",
    image: "https://m.media-amazon.com/images/I/61L+4OBhm-L._AC_UF1000,1000_QL80_.jpg",
    reads: 7700
  },
  {
    id: 14,
    title: "Crepúsculo",
    author: "Stephenie Meyer",
    image: "https://m.media-amazon.com/images/I/61B1hH3XCJL._UF1000,1000_QL80_.jpg",
    reads: 7600
  },
  {
    id: 15,
    title: "A Culpa é das Estrelas",
    author: "John Green",
    image: "https://m.media-amazon.com/images/I/811ivBP1rsL._UF1000,1000_QL80_.jpg",
    reads: 7400
  },
  {
    id: 16,
    title: "O Diário de Anne Frank",
    author: "Anne Frank",
    image: "https://m.media-amazon.com/images/I/81yKgdRQqHL._AC_UF1000,1000_QL80_.jpg",
    reads: 7200
  },
  {
    id: 17,
    title: "A Cabana",
    author: "William P. Young",
    image: "https://m.media-amazon.com/images/I/91fLBlcmpXL.jpg",
    reads: 7000
  },
  {
    id: 18,
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    image: "https://m.media-amazon.com/images/I/81CGmkRG9GL.jpg",
    reads: 6900
  },
  {
    id: 19,
    title: "O Senhor das Moscas",
    author: "William Golding",
    image: "https://m.media-amazon.com/images/I/81QwcdCwp0L._AC_UF1000,1000_QL80_.jpg",
    reads: 6750
  },
  {
    id: 20,
    title: "Sherlock Holmes: Um Estudo em Vermelho",
    author: "Arthur Conan Doyle",
    image: "https://m.media-amazon.com/images/I/71gXLMumypL._AC_UF1000,1000_QL80_.jpg",
    reads: 6600
  },
  {
    id: 21,
    title: "Drácula",
    author: "Bram Stoker",
    image: "https://m.media-amazon.com/images/I/61MgodE1s0L._AC_UF1000,1000_QL80_.jpg",
    reads: 6450
  },
  {
    id: 22,
    title: "O Iluminado",
    author: "Stephen King",
    image: "https://m.media-amazon.com/images/I/81Q+pJi4NjL._AC_UF1000,1000_QL80_.jpg",
    reads: 6300
  },
  {
    id: 23,
    title: "O Apanhador no Campo de Centeio",
    author: "J. D. Salinger",
    image: "https://m.media-amazon.com/images/I/71b3GDZMzSL._AC_UF1000,1000_QL80_.jpg",
    reads: 6200
  },
  {
    id: 24,
    title: "Moby Dick",
    author: "Herman Melville",
    image: "https://m.media-amazon.com/images/I/91gf2wtlaZL._UF1000,1000_QL80_.jpg",
    reads: 6100
  },
  {
    id: 25,
    title: "O Conde de Monte Cristo",
    author: "Alexandre Dumas",
    image: "https://m.media-amazon.com/images/I/81ZswN9PVPL._UF1000,1000_QL80_.jpg",
    reads: 6000
  }
];

export default function TopBooksScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const addBook = async (book) => {
    try {
      setLoading(true);

      // baixa imagem em um arquivo local temporário
      const fileUri = FileSystem.cacheDirectory + `${book.id}.jpg`;

      await FileSystem.downloadAsync(book.image, fileUri);

      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("image", {
        uri: fileUri,
        name: `${book.id}.jpg`,
        type: "image/jpeg",
      });

      await api.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Sucesso", `${book.title} foi adicionado!`);
      navigation.navigate("BookList");
    } catch (err) {
      console.log(err);
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

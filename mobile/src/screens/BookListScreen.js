import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import api from "../services/api";
import styles from "../styles/global";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  async function loadBooks() {
    const { data } = await api.get("/books");
    setBooks(data);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/books/${id}`);
      loadBooks(); // recarrega a lista após deletar
    } catch (error) {
      console.log("Erro ao deletar livro:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    const focus = navigation.addListener("focus", loadBooks);
    return focus;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddBook")}
      >
        <Text style={styles.buttonText}>Adicionar Livro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#8e44ad" }]}
        onPress={() => navigation.navigate("TopBooks")}
      >
        <Text style={styles.buttonText}>Livros Mais Lidos</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>

            {item.image && (
              <Image
                source={{ uri: `http://192.168.18.29:3000/uploads/${item.image}` }}
                style={styles.bookImage}
              />
            )}

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#f0ad4e" }]}
              onPress={() => navigation.navigate("EditBook", { book: item })}
            >
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#d9534f" }]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

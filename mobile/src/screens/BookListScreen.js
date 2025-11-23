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

      <FlatList
        data={books}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text>{item.author}</Text>

            {item.image && (
              <Image
                source={{ uri: `http://192.168.0.10:3000/uploads/${item.image}` }}
                style={{ width: 100, height: 100, marginTop: 5 }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

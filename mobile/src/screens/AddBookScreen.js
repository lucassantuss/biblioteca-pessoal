import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import styles from "../styles/global";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function save() {
    const form = new FormData();
    form.append("title", title);
    form.append("author", author);

    if (image) {
      form.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "foto.jpg"
      });
    }

    await api.post("/books", form, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>Título:</Text>
      <TextInput style={styles.input} onChangeText={setTitle} />

      <Text>Autor:</Text>
      <TextInput style={styles.input} onChangeText={setAuthor} />

      <Button title="Selecionar Imagem" onPress={pickImage} />

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar" onPress={save} />
      </View>
    </View>
  );
}

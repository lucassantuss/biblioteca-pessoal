import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import styles from "../styles/global";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
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
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Título:</Text>
      <TextInput style={styles.input} onChangeText={setTitle} />

      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Autor:</Text>
      <TextInput style={styles.input} onChangeText={setAuthor} />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: "center",
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

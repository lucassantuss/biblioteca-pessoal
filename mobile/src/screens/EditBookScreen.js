import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import styles from "../styles/global";

export default function EditBookScreen({ route, navigation }) {
  const { book } = route.params;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const baseImage = book.image
    ? `http://192.168.18.29:3000/uploads/${book.image}`
    : null;

  const [image, setImage] = useState(baseImage);
  const [newImage, setNewImage] = useState(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri); // nova imagem
      setImage(result.assets[0].uri);    // exibe pré-visualização
    }
  }

  async function handleSave() {
    try {
      if (!title.trim()) {
        return Alert.alert("Atenção", "O título é obrigatório.");
      }
      if (!author.trim()) {
        return Alert.alert("Atenção", "O autor é obrigatório.");
      }
    
      const form = new FormData();
      form.append("title", title);
      form.append("author", author);

      if (newImage) {
        form.append("image", {
          uri: newImage,
          type: "image/jpeg",
          name: "nova_foto.jpg"
        });
      }

      await api.post(`/books/${book.id}?_method=PUT`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigation.goBack();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Autor</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Alterar Imagem</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import api from "../services/api";
import styles from "../styles/global";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function login() {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password: pass
      });

      api.defaults.headers.common["Authorization"] = "Bearer " + data.token;

      navigation.replace("Books");
    } catch (err) {
      alert("Login inválido");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} />

      <Text>Senha</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setPass} />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

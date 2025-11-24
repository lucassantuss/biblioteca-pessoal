import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../services/api";
import styles from "../styles/global";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function register() {
    if (!email.trim()) {
      return Alert.alert("Atenção", "O email é obrigatório.");
    }
    if (!pass.trim()) {
      return Alert.alert("Atenção", "A senha é obrigatória.");
    }

    try {
      await api.post("/auth/register", { email, password: pass });

      Alert.alert("Sucesso", "Conta criada!", [
        { text: "OK", onPress: () => navigation.replace("Login") }
      ]);
    } catch (err) {
      Alert.alert("Erro", err.response?.data?.error || "Erro ao criar conta");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} />

      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Senha</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setPass} />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

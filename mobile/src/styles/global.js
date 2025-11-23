import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7", // fundo mais agradável
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // sombra Android
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

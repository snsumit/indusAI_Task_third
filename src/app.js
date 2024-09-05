const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
require("./conn");
const todoRoutes = require("./routes/TodoRoutes");


app.use(express.json())
app.use(todoRoutes);

app.listen(PORT ,()=>{
    console.log(`listening on port ${PORT}` );

})
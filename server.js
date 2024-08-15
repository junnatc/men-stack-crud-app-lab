// Here is where we import modules
// We begin by loading Express
import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose"
import methodOverride from "method-override"
import logger from "morgan"

import Fruit from "./models/fruit.js"
import * as fruitsCrtl from "./controllers/fruits.js"

dotenv.config(); // Loads the environment variables from .env file
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI);


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/fruits/new", async (req, res) => {
    res.render("fruits/new.ejs");
})

app.get("/fruits", fruitsCrtl.index);

app.get('/fruits/:id', async (req, res) => {

    const foundFruit = await Fruit.findById(req.params.id)

    res.render("fruits/show.ejs", { fruit: foundFruit })
})

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true
    } else {
        req.body.isReadyToEat = false
    }

    await Fruit.create(req.body)
    res.redirect("/fruits")
})

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render(`fruits/edit.ejs`, { fruit: foundFruit });
});

app.put('/fruits/:id', async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    console.log(await Fruit.findByIdAndUpdate(req.params.id, req.body))
    res.render("/fruits/edit.ejs")
})

app.delete('/fruits/:id', async (req, res) => {
    console.log(await Fruit.findByIdAndDelete(req.params.id))
    res.redirect("/fruits")

})

mongoose.connection.on("connected", () => {
  

    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
})



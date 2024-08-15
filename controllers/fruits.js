import Fruit from '../models/fruit.js'

// GET
const index = async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
}

const newFruit = async (req, res) => {
  res.render("fruits/new.ejs");
}

const getFruit = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.id)
  res.render("fruits/show.ejs", { fruit: foundFruit })
}

const editFruit = async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render(`fruits/edit.ejs`, { fruit: foundFruit });
}

// POST
const createFruit = async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }

  await Fruit.create(req.body)
  res.redirect("/fruits")
}

// PUT
const updateFruit = async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  console.log(await Fruit.findByIdAndUpdate(req.params.id, req.body))
  // TODO this render throws an error
  res.render("/fruits/edit.ejs")
}

// DELETE
const deleteFruit = async (req, res) => {
  console.log(await Fruit.findByIdAndDelete(req.params.id))
  res.redirect("/fruits")
}

export {
  index,
  newFruit,
  getFruit,
  editFruit,
  createFruit,
  updateFruit,
  deleteFruit
}
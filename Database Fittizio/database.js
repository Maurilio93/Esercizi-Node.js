import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

const schema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.status(200).json(planet);
});

app.post("/api/planets", (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }
  const { id, name } = value;
  const newPlanet = { id, name };
  planets.push(newPlanet);
  console.log(planets);
  res.status(201).json({ msg: "The planet was created", planet: newPlanet });
});

app.put("/api/planets/:id", (req, res) => {
  const { error, value } = schema.validate({ id: req.params.id, ...req.body });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }

  const { id, name } = value;
  const planetIndex = planets.findIndex((p) => p.id === Number(id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets[planetIndex].name = name;
  res.status(200).json({
    msg: "The planet was updated",
    planet: planets[planetIndex],
  });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex((p) => p.id === Number(id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  const deletedPlanet = planets.splice(planetIndex, 1);
  res.status(200).json({
    msg: "The planet was deleted",
    planet: deletedPlanet[0],
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

import express, { Request, Response } from "express";
import "express-async-errors";
import Joi from "joi";

interface Planet {
  id: number;
  name: string;
}

const schema = Joi.object<Planet>({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};
const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.status(200).json(planet);
};
const create = (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }

  const { id, name } = value;
  const newPlanet: Planet = { id, name };
  planets.push(newPlanet);
  console.log(planets);
  res.status(201).json({ msg: "The planet was created", planet: newPlanet });
};
const updateById = (req: Request, res: Response) => {
  const { error, value } = schema.validate({ id: req.params.id, ...req.body });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
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
};
const deleteById = (req: Request, res: Response) => {
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
};

export { getAll, getOneById, create, updateById, deleteById };

import { Router } from "express";

export const homeRouter = Router();

/* GET home page. */
homeRouter.get('/', (req, res, next) => {
  res.json({ 
    title: 'Express with es6' ,
    author: {
      name: "Vaumoron Julien",
      url: "https://github.com/Sukaato",
      web: "https://sukaato.github.io"
    },
  });
});

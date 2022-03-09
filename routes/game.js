var express = require('express');
var router = express.Router();
const Game = require('../models/game.js');
const Gamer = require('../models/gamer.js');


/**
 * Creación de la ruta GET que visualiza la información de un
 *  juego ya registrado en la base de datos y del cual se 
 * conoce el parametro id y es enviado por medio de la url.
 */
router.get('/:id', function(req, res, next) {
  const data = Game.find({"id": {$eq: req.params.id}}, 
    {_id:0, type:0, deleted:0, createdAt:0, updatedAt:0, __v:0,
     'gamers.gamerBet': 0
    });
  data.then(result => {
    if (result.length == 0){
      throw 'No se encontró juego con el id compartido.';
    } else{
      res.json(result)
    }
  }).catch(err => res.json(err));
});

/**
 * Creación de la ruta GET que visualiza la información del
 * ganador de un juego ya registrado en la base de datos y del 
 * cual se conoce el parametro id y es enviado por medio de la url.
 */
router.get('/:id/winner', function(req, res, next) {
  const data = Game.find({"id": {$eq: req.params.id}}, {winner: 1,
     _id: 0});
  data.then(result => {
    if (result[0].winner.name == null || result[0].winner.id == null){
      throw 'No se encontró ganador para este juego, inicielo primero.';
    } else{
      res.json(result[0])
    }
  }).catch(err => res.json(err));
});

module.exports = router;

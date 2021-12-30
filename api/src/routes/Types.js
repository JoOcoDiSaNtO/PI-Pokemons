const { Router } = require("express");
const { GetTypesFromApi, FillDBofTypes, AssingTypeToPokemon } = require("../functions");

const router = Router();
// TRAE TODOS LOS TIPOS
router.get("/", async (req, res) => {
  try {
    const type = req.body.name;
    const types = await GetTypesFromApi(type)
    return res.json(types)
  } catch (e) {
    res.status(404).json(e);
  }
});

// PASA LOS TIPOS A AL DB
router.post('/', async (req,res) => {
    const newTypes = await FillDBofTypes();
    return res.send('Base de Datos llenada con éxito')
})

// REALIZA LA ASIGNACION DE TIPOS
router.put('/', (req, res)=>{
    const { pokemon } = req.body;
    const { types } = req.body;
    AssingTypeToPokemon(pokemon, types);
    res.send('Asignación realizada con éxito');
})

module.exports = router;

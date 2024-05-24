


const router = require("express").Router();
const { getActivities, getActivitiesById, updateActivitiesPut,
    updateActivitiesPatch, createActivity } = require("@controllers/activityController");

//obtiene todas las actividades 
router.get("/", getActivities);

//obtiene las actiivdades por su id
router.get('/:id', getActivitiesById);


//actualiza la actividad con PATCH
router.put('/:id', updateActivitiesPatch);


//actualiza una actividad con put
router.patch('/:id', updateActivitiesPut);


router.post('/', createActivity);




module.exports = router;
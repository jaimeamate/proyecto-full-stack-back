


const router = require("express").Router();
const { getActivities, getActivitiesById, updateActivitiesPut,
    updateActivitiesPatch, createActivity, deleteActivity } = require("@controllers/activityController");

const { addUsersToActivityController } = require("@controllers/userHasActivitiesController");

//obtiene todas las actividades 
router.get("/", getActivities);

//obtiene las actiivdades por su id
router.get('/:id', getActivitiesById);


//actualiza la actividad con PATCH
router.put('/:id', updateActivitiesPatch);


//actualiza una actividad con put
router.patch('/:id', updateActivitiesPut);


router.post('/register', createActivity);

//Borra el grupo
router.delete("/:id", deleteActivity);

//Añade usuarios a una actividad
router.post('/add-users', addUsersToActivityController);

module.exports = router;
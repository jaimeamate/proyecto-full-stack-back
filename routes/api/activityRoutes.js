


const router = require("express").Router();
const { getActivities, getActivitiesById, updateActivitiesPut,
    updateActivitiesPatch, createActivity, deleteActivity } = require("@controllers/activityController");

const { postUsersInActivity, patchUsersInActivity, getUsersFromActivity, removeUsersFromActivity } = require("@controllers/userHasActivitiesController");

//obtiene todas las actividades 
router.get("/", getActivities);

//obtiene las actiivdades por su id
router.get('/:id', getActivitiesById);


//actualiza la actividad con PATCH
router.patch('/:id', updateActivitiesPatch);


//actualiza una actividad con put
router.put('/:id', updateActivitiesPut);


router.post('/register', createActivity);

//Borra el grupo
router.delete("/:id", deleteActivity);

//Añade usuarios a una actividad
router.post('/:id/add-users', postUsersInActivity);

//Actualiza los usuarios de una actividad
router.patch('/:id/update-users', patchUsersInActivity);

//Obtiene los usuarios de la actividad
router.get('/:id/users', getUsersFromActivity);

//Borra el grupo
router.delete("/:id/users", removeUsersFromActivity);

module.exports = router;
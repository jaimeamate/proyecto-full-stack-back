const { Group, User, UsersHasGroups } = require("@models/index");

const getAllGroups = async () => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: 'groups',
          through: {
            model: UsersHasGroups,
            attributes: ['isAdmin'],
          },
          attributes: ['id', 'firstName', 'email']
        },
      ],
    });

    if (groups.length === 0) {
      return {};
    }

    // Transforma el resultado para cambiar 'groups' a 'users' y mover 'isAdmin' al nivel superior
    const result = groups.map(group => {
      const transformedGroup = {
        ...group.toJSON(),
        users: group.groups.map(user => ({
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          isAdmin: user.users_has_groups.isAdmin
        }))
      };
      delete transformedGroup.groups;
      return transformedGroup;
    });

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getGroupWithId = async (id) => {
  try {
    const group = await Group.findByPk(id, {
      include: [
        {
          model: User,
          as: 'groups',
          through: {
            model: UsersHasGroups,
            attributes: ['isAdmin','percent'],
          },
          attributes: ['id', 'firstName', 'email']
        },
      ],
    });

    if (!group) {
      throw new Error("Group not found");
    }

    // Transformael resultado para cambiar 'groups' a 'users' y mover 'isAdmin' al nivel superior
    const result = {
      ...group.toJSON(),
      users: group.groups.map(user => ({
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.users_has_groups.isAdmin,
        percent: user.users_has_groups.percent
      }))
    };

    // Eliminar la propiedad 'groups' del resultado
    delete result.groups;

    return result;
  } catch (err) {
    throw err;
  }
};

const registerGroup = async (name) => {
  try {
    const newGroup = new Group(name);
    return await newGroup.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editGroupPatch = async (groupId, updatedFields) => {
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    Object.keys(updatedFields).forEach((key) => {
      group[key] = updatedFields[key];
    });
    return await group.save();
  } catch (err) {
    throw err;
  }
};

const deleteGroupById = async (id) => {
  try {
    const group = await Group.findByPk(id);
    if (!group) {
      throw new Error("Group not found");
    }
    await group.destroy();
    return { message: "Group deleted successfully" };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllGroups,
  getGroupWithId,
  registerGroup,
  editGroupPatch,
  deleteGroupById,
};

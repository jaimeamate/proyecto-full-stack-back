const {
    UsersHasGroups,
    User,
    Group,
    Activity,
    sequelize,
} = require("@models/index");

const {getGroupWithId} = require("./groupService");
const {getUserWithId} = require("./userService");
const {Sequelize, Op} = require("sequelize");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, htmlContent) => {
    let mailOptions = {
        from: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        to,
        subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error al enviar el correo:', error);
        }
        console.log('Correo enviado:', info.response);
    });
};

const renderHtml = async (userEmail, groupName) => {
    try {
        let templatePath = path.join(__dirname, '../html', 'invitation.ejs');
        console.log('Template Path:', templatePath); // Depuración
        const html = await ejs.renderFile(templatePath, {userEmail, groupName});
        console.log('HTML Rendered:', html); // Depuración
        return html;
    } catch (error) {
        console.error('Error al renderizar el HTML:', error);
        return '<p>Error loading HTML content</p>';
    }
};

const register_User_has_Group = async (userId, GroupId) => {
    try {


        const hasgroup = await Group.findByPk(GroupId);

        if (!hasgroup) {
            throw new Error("Group not found");
        }

        // Verifica que todos los usuarios existen
        const user = await User.findByPk(userId);


        if (user.dataValues.id !== userId) {
            throw new Error("Some users not found");
        }

        
        const email = user.email;
        const groupName = hasgroup.name;
        const htmlContent = await renderHtml(email, groupName);
        console.log('Sending email to:', email, 'with content:', htmlContent); // Depuración
        sendEmail(email, `Invitación a grupo ${hasgroup.name}`, htmlContent);
        

        const userGroup = {
            idUser: userId,
            idGroup: GroupId,
        };
        

        return await UsersHasGroups.bulkCreate(userGroup);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const find_Users_of_Group = async (groupId) => {
    try {
        if (!groupId) {
            throw new Error("Invalid input");
        }

        const groups = await getGroupWithId(groupId);

        if (!groups) {
            throw new Error("Group not found");
        }

        return await UsersHasGroups.findAll({
            where: {
                idGroup: groupId,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const find_Groups_of_User = async (userId) => {
    try {
        if (!userId) {
            throw new Error("Invalid input");
        }

        const user = await getUserWithId(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return await UsersHasGroups.findAll({
            where: {
                idUser: userId,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const finally_Find_Groups = async (id_Of_Groups) => {
    try {
        return await Group.findAll({
            where: {
                id: id_Of_Groups,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/*const finally_Find_Users = async (id_Of_Users) => {
  try {
    return await User.findAll({
      where: {
        id: id_Of_Users,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};*/

const finally_Find_Users = async (id_Of_Users) => {
    try {
        return await User.findAll({
            where: {
                id: {
                    [Op.in]: id_Of_Users,
                },
            },
            attributes: ["id", "firstName", "lastName", "email"], // Me traigo solo esto
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const admin_Find_Users = async (result_Users, AdminIs) => {
    const usersWithIsAdmin = result_Users.map((user) => ({
        ...user.dataValues,
        isAdmin: false, // Aquí defines la lógica para determinar isAdmin
    }));

    return usersWithIsAdmin.map((user) => ({
        ...user,
        isAdmin: user.id === AdminIs,
    }));
};

const register_Admin = async (name) => {
    try {
        const newUserHGroup = new UsersHasGroups(name);
        return await newUserHGroup.save();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const patch_Users_Has_Groups = async (groupId, usersIn, usersOut) => {
    try {
        if (!Array.isArray(usersOut) || !Array.isArray(usersIn) || !groupId) {
            throw new Error("Invalid input");
        }

        const hasgroup = await Group.findByPk(groupId);

        if (!hasgroup) {
            throw new Error("Group not found");
        }

        // Verifica que todos los usuarios para ingresar existan
        const inUsers = await User.findAll({
            where: {
                id: usersIn,
            },
        });

        if (inUsers.length !== usersIn.length) {
            throw new Error("Some users to insert not found");
        }

        // Verifica que todos los usuarios para sacar existan
        const outUsers = await UsersHasGroups.findAll({
            where: {
                idUser: {
                    [Sequelize.Op.in]: usersOut,
                },
                idGroup: groupId,
            },
        });

        if (outUsers.length !== usersOut.length) {
            throw new Error("Some users to delete not found");
        }

        const userToInsert = usersIn.map((userId) => ({
            idUser: userId,
            idGroup: groupId,
        }));
        const out = await out_Users(usersOut, groupId);
        return await UsersHasGroups.bulkCreate(userToInsert);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const out_Users = async (usersOut, groupId) => {
    const result = await UsersHasGroups.destroy({
        where: {
            idUser: {
                [Sequelize.Op.in]: usersOut,
            },
            idGroup: groupId,
        },
    });
    return result;
};

const find_Activity_of_Group = async (groupId) => {
    try {
        if (!groupId) {
            throw new Error("Invalid input");
        }

        const groups = await getGroupWithId(groupId);

        if (!groups) {
            throw new Error("Group not found");
        }

        return await Activity.findAll({
            where: {
                idGroup: groupId,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const findAdminIs = async (groupId) => {
    try {
        const hasgroup = await Group.findByPk(groupId);

        if (!hasgroup) {
            throw new Error("Group not found");
        }
        const adminUser = await UsersHasGroups.findOne({
            where: {
                idGroup: groupId,
                isAdmin: true,
            },
        });

        return (adminIsHere = JSON.stringify(adminUser.dataValues));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const delete_User_has_Group = async (usersOut, groupId) => {
    const usersToDel = await UsersHasGroups.findAll({
        where: {
            idUser: {
                [Sequelize.Op.in]: usersOut,
            },
            idGroup: groupId,
        },
    });

    if (usersToDel.length !== usersOut.length) {
        throw new Error("Some users to delete not found");
    }

    const out = await out_Users(usersOut, groupId);
};

const change_Admin_Has_Group = async (newAdmin, oldAdmin, groupId) => {
    const userAdm = [newAdmin, oldAdmin];

    const admins = await UsersHasGroups.findAll({
        where: {
            idUser: {
                [Sequelize.Op.in]: userAdm,
            },
            idGroup: groupId,
        },
    });
    //---

    if (admins.length !== userAdm.length) {
        throw new Error("Some users not found");
    }
    try {
        const transaction = await sequelize.transaction();
        // Actualiza el antiguo administrador a no administrador
        await UsersHasGroups.update(
            {isAdmin: false},
            {
                where: {idUser: oldAdmin},
                transaction,
            }
        );

        // Actualiza el nuevo administrador a administrador
        await UsersHasGroups.update(
            {isAdmin: true},
            {
                where: {idUser: newAdmin},
                transaction,
            }
        );

        // Si todo va bien, confirma la transacción
        await transaction.commit();
        return {success: true, message: "Admin roles updated successfully"};
    } catch (error) {
        // Si hay un error, revierte la transacción
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    register_User_has_Group,
    find_Users_of_Group,
    find_Groups_of_User,
    register_Admin,
    patch_Users_Has_Groups,
    find_Activity_of_Group,
    findAdminIs,
    delete_User_has_Group,
    change_Admin_Has_Group,
    finally_Find_Groups,
    finally_Find_Users,
    admin_Find_Users,
};

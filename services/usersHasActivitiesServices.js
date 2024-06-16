const { Activity, User, UsersHasActivities } = require("@models/index");
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
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



const addUsersToActivity = async (userIds, activityId) => {
    try {
        if (!Array.isArray(userIds) || !activityId) {
            throw new Error('Entrada inválida');
        }

        const activity = await Activity.findByPk(activityId);

        if (!activity) {
            throw new Error('Actividad no encontrada');
        }

        const users = await User.findAll({
            where: {
                id: userIds
            }
        });

        if (users.length !== userIds.length) {
            throw new Error('Algunos usuarios no encontrados');
        }

        const userActivities = userIds.map(userId => ({
            idUser: userId,
            idActivitie: activity.id,
            amount: activity.amount || 0
        }));

        for (const user of users) {
            const htmlContent = await renderHtml(user.name, activity.name);
            sendEmail(user.email, `ASIGNADO A GRUPO: ${activity.name}`, htmlContent);
        }

        return await UsersHasActivities.bulkCreate(userActivities);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUsersInActivity = async (userIds, activityId) => {
    try {
        if (!Array.isArray(userIds) || !activityId) {
            throw new Error('Entrada inválida');
        }

        const activity = await Activity.findByPk(activityId);

        if (!activity) {
            throw new Error('Actividad no encontrada');
        }

        const users = await User.findAll({
            where: {
                id: userIds
            }
        });

        if (users.length !== userIds.length) {
            throw new Error('Algunos usuarios no encontrados');
        }

        await UsersHasActivities.destroy({
            where: {
                idActivitie: activityId
            }
        });

        const userActivities = userIds.map(userId => ({
            idUser: userId,
            idActivitie: activityId,
            amount: activity.amount || 0
        }));

        // const userIds = userActivities.map(ua => ua.idUser);
        const users1 = await User.findAll({
            where: {
                id: userIds
            },
            attributes: ['firstName', 'lastName', 'email'] // Selecciona solo los campos necesarios
        });

        for (const user of users1) {

            const renderHtml = async (userName, activityName) => {
                try {
                    let templatePath = path.join(__dirname, '../html', 'welcome.ejs');
                    return await ejs.renderFile(templatePath, { userName, activityName });
                } catch (error) {
                    console.error('Error al renderizar el HTML:', error);
                    return '<p>Error loading HTML content</p>';
                }
            };

            const userName = `${user.firstName} ${user.lastName}`;
            const htmlContent = await renderHtml(userName, activity.name);
            sendEmail(user.email, `ASIGNADO A GRUPO: ${activity.name}`, htmlContent);
        }
        return await UsersHasActivities.bulkCreate(userActivities, { updateOnDuplicate: ['amount'] });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllUsersFromActivity = async (activityId) => {
    try {
        if (!activityId) {
            throw new Error('Entrada inválida');
        }

        const activity = await Activity.findByPk(activityId);

        if (!activity) {
            throw new Error('Actividad no encontrada');
        }

        const userActivities = await UsersHasActivities.findAll({
            where: {
                idActivitie: activityId
            }
        });

        const userIds = userActivities.map(ua => ua.idUser);
        const users = await User.findAll({
            where: {
                id: userIds
            },
            attributes: ['firstName', 'lastName', 'email'] // Selecciona solo los campos necesarios
        });

        for (const user of users) {

            const renderHtml = async (userName, activityName) => {
                try {
                    let templatePath = path.join(__dirname, '../html', 'welcome.ejs');
                    return await ejs.renderFile(templatePath, { userName, activityName });
                } catch (error) {
                    console.error('Error al renderizar el HTML:', error);
                    return '<p>Error loading HTML content</p>';
                }
            };

            const userName = `${user.firstName} ${user.lastName}`;
            const htmlContent = await renderHtml(userName, activity.name);
            sendEmail(user.email, `ASIGNADO A GRUPO: ${activity.name}`, htmlContent);
        }

        return userActivities;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUsersFromActivity = async (activityId) => {
    try {
        if (!activityId) {
            throw new Error('Entrada inválida');
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            throw new Error('Actividad no encontrada');
        }

        await UsersHasActivities.destroy({
            where: {
                idActivitie: activityId
            }
        });

        const users = await User.findAll({
            where: {
                id: userIds
            },
            attributes: ['firstName', 'lastName', 'email'] // Selecciona solo los campos necesarios
        });

        for (const user of users) {

            const renderHtml = async (userName, activityName) => {
                try {
                    let templatePath = path.join(__dirname, '../html', 'delete.ejs');
                    return await ejs.renderFile(templatePath, { userName, activityName });
                } catch (error) {
                    console.error('Error al renderizar el HTML:', error);
                    return '<p>Error loading HTML content</p>';
                }
            };

            const userName = `${user.firstName} ${user.lastName}`;
            const htmlContent = await renderHtml(userName, activity.name);
            sendEmail(user.email, `ASIGNADO A GRUPO: ${activity.name}`, htmlContent);
        }



        return { message: 'Usuarios eliminados de la actividad con éxito' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { addUsersToActivity, updateUsersInActivity, getAllUsersFromActivity, deleteUsersFromActivity };

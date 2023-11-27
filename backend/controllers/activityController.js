import conn from "../config/db.js"
import activityServices from "../services/activityServices.js";
import subjectServices from "../services/subjectServices.js";
import roomServices from "../services/roomServices.js";
import { INTERNAL_SERVER_ERROR, ROOM_NOT_FOUND, USER_NOT_FOUND } from "../config/errorCodes.js";
import { SUBJECT_NOT_FOUND } from "../config/errorCodes.js";
import userServices from "../services/userServices.js";
import { getAllDatesInRange } from "../utils/dateUtils.js";

const createActivity = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send(DB_NOT_CONNECTED.message);
    }
    const room = await roomServices.getRoom(conn, req.body.room_id);

    const teacher = await userServices.getUser(conn, req.body.teacher_login);
    const subject = await subjectServices.getSubject(conn, req.body.SUBJECT_CODE);
    console.log(teacher, "teacher");

    if (!teacher) {
        console.log('creating activity teacher not found', req.body.teacher_login)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }

    const isTeacher = await userServices.isTeacher(conn, teacher.ID);
    console.log(isTeacher, "isTeacher")
    if (!isTeacher) {
        console.log('creating activity teacher not found', req.body.teacher_login)
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }

    if (subject === null) {
        console.log('creating activity subject not found', req.body.SUBJECT_CODE)
        return res.status(SUBJECT_NOT_FOUND.code).send({ message: SUBJECT_NOT_FOUND.message });
    }
    if (!room) {
        console.log('creating activity room not found', req.body.room_id)
        return res.status(ROOM_NOT_FOUND.code).send({ message: ROOM_NOT_FOUND.message });
    }

    try {
        const collision = await checkActiviyRoomCollision(req.body);
        if (collision) {
            console.log('kolizia')
            res.status(409).send({message: 'Collision'})
            return;
        }
        const data = {
            SUBJECT_CODE: req.body.SUBJECT_CODE,
            type: req.body.type,
            duration: req.body.duration,
            start_date: new Date(req.body.start_date).toISOString().slice(0, 19).replace('T', ' '),
            end_date: new Date(req.body.end_date).toISOString().slice(0, 19).replace('T', ' '),
            room_id: req.body.room_id,
            frequency: req.body.frequency,
            teacher_id: teacher.ID,
        }
        console.log(data);
        
        activityServices.createActivity(conn, data)
        .then(() => {
            res.status(200).send({ message: 'Activity created' });
        })
        .catch(err => {
            res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
        })
    }
    catch (err) {
        console.log('catched')
        return res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
    }
}

const checkActiviyRoomCollision = async newActivity => {
    if (conn.state === 'disconnected') {
        return { code: DB_NOT_CONNECTED.code, message: DB_NOT_CONNECTED.message };
    }
    if (newActivity.frequency === 0)
    {
        return false;
    }
    const room = newActivity.room_id;
    // const day = data.start_date.getDay();

    const activities = await activityServices.getActivitiesByRoom(conn, room);

    const newActivityStartDate = new Date(newActivity.start_date.split('T')[0]);
    const newActivityEndDate = new Date(newActivity.end_date)
    const newActivityDates = getAllDatesInRange(newActivityStartDate, newActivityEndDate, newActivity.frequency);
    const newStartHour = parseInt(newActivity.start_date.split('T')[1].split(':'));
    const newDuration = newActivity.duration;
    // console.log(newStartHour, newDuration)

    const findCollision = (firstDates, secondDates, firstStartHour, secondStartHour, firstDuration, secondDuration) => {
        for (const firstDate of firstDates) {
            for (const secondDate of secondDates) {
                const firstYear = firstDate.getFullYear();
                const firstMonth = firstDate.getMonth() + 1;
                const firstDay = firstDate.getDate();

                const secondYear = secondDate.getFullYear();
                const secondMonth = secondDate.getMonth() + 1;
                const secondDay = secondDate.getDate();

                if (JSON.stringify([firstYear, firstMonth, firstDay]) !== JSON.stringify([secondYear, secondMonth, secondDay])) continue;
                if (firstStartHour > secondStartHour) {
                    return (secondStartHour + secondDuration > firstStartHour);
                }
                return (firstStartHour + firstDuration > secondStartHour);
            }
        }
        return false;
    }

    console.log(newStartHour, newDuration, newActivityDates[0]);
    for (const curActivity of activities) {
        const startDate = new Date(curActivity.start_date);
        const activityDates = getAllDatesInRange(startDate, curActivity.end_date, curActivity.frequency);
        const startHour = curActivity.start_date.getHours()
        const duration = curActivity.duration;
        console.log(startHour, duration, startDate);
        const collision = findCollision(newActivityDates, activityDates, newStartHour, startHour, newDuration, duration);
        // console.log(activityDates)
        if (collision) {
            return true;
        }
    }
    return false;
}

const getMyActivities = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    try {
        const sessionId = req.cookies.sessionId;
        const user_session = await userServices.getUserFromSession(conn, sessionId);
        const user = await userServices.getUser(conn, user_session.login);
        if (!user) {
            return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
        }

        const isStudent = await userServices.isStudent(conn, user.ID);
        const isTeacher = await userServices.isTeacher(conn, user.ID);
        const isAdmin = await userServices.isAdmin(conn, user.ID);
        const isScheduler = await userServices.isScheduler(conn, user.ID);

        if (isStudent) {
            activityServices.getStudentActivities(conn, user)

                .then(activities => {

                    res.send({ activities })
                })
                .catch(err => {
                    res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
                })
        }
        else if (isTeacher) {
            activityServices.getTeacherActivities(conn, user)

                .then(activities => {
                    res.send({ activities })
                })
                .catch(err => {
                    res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
                })
        }
        else if ((isAdmin) || (isScheduler)) {
            activityServices.getAllActivities(conn)

                .then(activities => {
                    res.send({ activities })
                })
                .catch(err => {
                    res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
                })
        }
    }
    catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const createActivityRequest = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }

    const teacher_login = req.body.teacher;

    const teacher = await userServices.getUser(conn, teacher_login);

    if (!teacher) {
        return res.status(USER_NOT_FOUND.code).send({ message: USER_NOT_FOUND.message });
    }

    const teacherType = await userServices.getUserType(conn, teacher.login);

    console.log(teacherType);

    if (teacherType !== 'teacher') {
        return res.status(403).send({ message: 'Not a teacher' });
    }


    try {
        const data = {
            SUBJECT_CODE: req.body.SUBJECT_CODE,
            type: req.body.Type,
            duration: req.body.Duration,
            start_date: new Date(req.body.DateStart).toISOString().slice(0, 10),
            end_date: new Date(req.body.DateEnd).toISOString().slice(0, 10),
            capacity: req.body.Capacity,
            teacher: teacher.ID,
            frequency: req.body.Frequency,
            monday_start: req.body.MondayStart ? req.body.MondayStart : null,
            monday_end: req.body.MondayEnd ? req.body.MondayEnd : null,
            tuesday_start: req.body.TuesdayStart ? req.body.TuesdayStart : null,
            tuesday_end: req.body.TuesdayEnd ? req.body.TuesdayEnd : null,
            wednesday_start: req.body.WednesdayStart ? req.body.WednesdayStart : null,
            wednseday_end: req.body.WednesdayEnd ? req.body.WednesdayEnd : null,
            thursday_start: req.body.ThursdayStart ? req.body.ThursdayStart : null,
            thursday_end: req.body.ThursdayEnd ? req.body.ThursdayEnd : null,
            friday_start: req.body.FridayStart ? req.body.FridayStart : null,
            friday_end: req.body.FridayEnd ? req.body.FridayEnd : null,
            comment: req.body.Comment ? req.body.Comment : null,
        }
        console.log(data)
        activityServices.createActivityRequest(conn, data)
            .then(() => {
                res.status(200).send({ message: 'Activity Request created' });
            })
            .catch(err => {
                res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
            })
    }
    catch (err) {
        console.log('catched')
        return res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }

}

// const getActivityRequests = async (req, res) => {
//     if (conn.state === 'disconnected') {
//         return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
//     }
//     try {
//         activityServices.getActivityRequests(conn)
//             // .then(requests => {
//             //     requests.teacher_login = await userServices.getUserById(conn, requests.teacher)
//             // })
//             .then(requests => {
//                 res.send({msg: requests })
//             })
//             .catch(err => {
//                 console.log(err)
//                 res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
//             })
//         // res.send({ message: 'test'});
//     }
//     catch (err) {
//         console.log(err);
//         res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
//     }
// }



const getActivityRequests = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    try {
        const requests = await activityServices.getActivityRequests(conn);


        // Retrieve user information for each request
        const requestsWithLogin = await Promise.all(requests.map(async (request) => {
            if (request.teacher_id === null) {
                return request;
            }
            const user = await userServices.getUserById(conn, request.teacher_id);
            console.log("toto je user", user);
            // Assuming `login` is a property of the user object
            request.teacher_login = user.login;
            // console.log(request);
            return request;
        }));

        // console.log(requestsWithLogin);
        res.send({ msg: requestsWithLogin });
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
    }
};


const getMyActivityRequests = async (req, res) => {
    console.log('getMyActivityRequests');
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    try {
        const requests = await activityServices.getActivityRequests(conn);


        // Retrieve user information for each request
        const requestsWithLogin = await Promise.all(requests.map(async (request) => {
            if (request.teacher_id === null) {
                return request;
            }
            const user = await userServices.getUserById(conn, request.teacher_id);
            // Assuming `login` is a property of the user object
            request.teacher_login = user.login;
            return request;
        }));

        res.send({ msg: requestsWithLogin });
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR.code).send({ message: err });
    }
};


const solveActivityRequest = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    try {
        const data = {
            comment: req.body.comment,
            id: req.body.id,
            status: req.body.status
        }
        activityServices.solveActivityRequest(conn, data)
            .then(() => {
                console.log('solved')
                res.status(200).send({ message: 'Activity Request solved' });
            })
            .catch(err => {
                res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
            })
    }
    catch (err) {
        console.log('catched')
        return res.status(INTERNAL_SERVER_ERROR.code).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

const deleteActivity = async (req, res) => {
    if (conn.state === 'disconnected') {
        return res.status(DB_NOT_CONNECTED.code).send({ message: DB_NOT_CONNECTED.message });
    }
    console.log('deleting activity', req.params)
    try {
        activityServices.deleteActivity(conn, req.params.activity)
            .then(() => {
                res.status(200).send({ message: 'Activity deleted' });
            })
            .catch(err => {
                res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
            })
    }
    catch (err) {
        console.log(err)
        return res.status(INTERNAL_SERVER_ERROR.code).send({ message: err.message });
    }
}

export default {
    createActivity,
    createActivityRequest,
    getMyActivities,
    solveActivityRequest,
    getActivityRequests,
    getMyActivityRequests,
    deleteActivity,
}
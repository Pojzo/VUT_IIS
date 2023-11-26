import { access } from "fs";
import subjectServices from "./subjectServices.js";

const createActivity = (conn, data) => {
    if (!('frequency' in data)) {
        data['frequency'] = null;
    }
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO activity (SUBJECT_CODE, type, duration, room_id, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)', [data.SUBJECT_CODE, data.type, data.duration, data.room_id, data.start_date, data.end_date], (err, result, fields) => {
            if (err) reject(err);
            else resolve();
        })
    })
}

const getMyActivities = async (conn, user) => {
    try {
        const mySubjects = await subjectServices.getMySubjects(conn, user.ID);
        if (mySubjects === null) return reject('No subjects found');

        const activityPromises = mySubjects.map(subject => {
            return new Promise((resolve, reject) => {
                conn.query("SELECT * FROM activity WHERE SUBJECT_CODE = ?", subject.SUBJECT_CODE, (err, result, fields) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(result);
                    }
                })
            })
        })

        const activitiesArray = await Promise.all(activityPromises);
        const activities = activitiesArray.flat();

        return activities
    }
    catch (err) {
        throw err;
    }
}

const createActivityRequest = (conn, data) => {
    return new Promise((resolve, reject) => {
        console.log("toto us data", data);
        conn.query('INSERT INTO activity_request (SUBJECT_CODE, type, duration, capacity, start_date, end_date, frequency, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.SUBJECT_CODE, data.type, data.duration, data.capacity, data.start_date, data.end_date, data.frequency, data.teacher], (err, result, fields) => {
        // conn.query('INSERT INTO Activity_request (SUBJECT_CODE, type, duration, capacity, start_date, end_date, frequency) VALUES ("IMA", "lecture", 1, 2, "2023-11-02", "2023-12-01", 1)', (err, result, fields) => {
            if (!err) {
                // activity_request_id monday_start monday_end tuesday_start tuesday_end wednesday_start wednesday_end thursday_start thursday_end friday_start friday_end comment
                conn.query('INSERT INTO week_requirements (activity_request_id, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end, comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [result.insertId, data.monday_start, data.monday_end, data.tuesday_start, data.tuesday_end, data.wednesday_start, data.wednesday_end, data.thursday_start, data.thursday_end, data.friday_start, data.friday_end, data.comment], (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                reject(err);
            }
        });
    });
};

const getActivitiesByRoom = (conn, room_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM activity WHERE room_id = ?', room_id, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

const getActivityRequests = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM activity_request\
         JOIN week_requirements on week_requirements.activity_request_id = Activity_request.activity_request_id', 
         (err, result, fields) => {
            if (err) {
                reject(err);
            }
            else resolve(result);
        })
    })
}

const solveActivityRequest = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE activity_request SET status = ?, additional_comment = ?  WHERE activity_request_id = ?', [data.status, data.comment, data.id], (err, result, fields) => {
            if (err) {
                reject(err);
            }
            else 
            {
                console.log("toto je result", result);
                resolve(result);

            }
        })
    })
}


export default {
    createActivity,
    getMyActivities,
    createActivityRequest,
    getActivityRequests,
    solveActivityRequest,
    getActivitiesByRoom
}

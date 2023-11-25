import {resolve} from "path";

const subjectExists = (conn, code, name) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Subject WHERE SUBJECT_CODE = ? OR name = ?', [code, name], (err, result, fields) => {
            if (err) reject(err);
            resolve(result[0])
        })
    }) 
}

const getAllSubjects = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT Subject.SUBJECT_CODE as subject_code, Subject.name as subject_name, Subject.credits as subject_credits, User.name as guarantee_name, User.login as guarantee_login FROM Subject LEFT JOIN User on Subject.guarantee_id = user.ID', (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getSubject = (conn, code) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT Subject.SUBJECT_CODE as \
        SUBJECT_CODE, Subject.name as name, Subject.credits as credits,\
         User.login as guarantee_login FROM Subject LEFT JOIN User on Subject.guarantee_id = User.ID \
         WHERE SUBJECT_CODE = ?', [code], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result[0] : null);
        })
    })
}

const createSubject = (conn, data) => {
    return new Promise((resolve, reject) => {
        const code = data.SUBJECT_CODE || null;
        const name = data.name || null;
        const credits = data.credits || null;
        const guarantee = data.guarantee || null;
        const query = 'INSERT INTO Subject (SUBJECT_CODE, name, credits, guarantee_id) VALUES(?,?,?,?)'
        conn.query(query, [code, name, credits, guarantee],  (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const updateSubject = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE Subject SET name=?, credits=?, guarantee_id=? WHERE SUBJECT_CODE=?`, [data.name, data.credits, data.guarantee_id, data.code], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const deleteSubject = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM Subject WHERE SUBJECT_CODE = ?", id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const addSubjectToUser = (conn, student_id, subject_code) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO enlists (STUDENT_ID, SUBJECT_CODE) VALUES(?,?)'
        conn.query(query, [student_id, subject_code], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    })
}

const getTeacherSubjects = (conn, teacher_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM Teaches WHERE TEACHER_ID = ?', [teacher_id], (err, result) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    })
}

const getGuaraneeSubjects = (conn, teacher_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM Subject WHERE guarantee_id = ?', [teacher_id], (err, result) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    })
}


const getMySubjects = (conn, student_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM enlists WHERE STUDENT_ID = ?', [student_id], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    })
}

const deleteSubjectFromUser = (conn, student_id, subject_code) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM enlists WHERE STUDENT_ID=? AND SUBJECT_CODE=?', [student_id, subject_code], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    })
}


const getSubjectTeachers = (conn, subject_code) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT User.login FROM Teaches LEFT JOIN User ON User.ID = Teaches.TEACHER_ID WHERE Teaches.SUBJECT_CODE = ?', [subject_code], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    })
}

const addTeacherToSubject = (conn, teacher_id, SUBJECT_CODE) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Teaches (TEACHER_ID, SUBJECT_CODE) VALUES(?,?)'
        conn.query(query, [teacher_id, SUBJECT_CODE], (err, result, fields) => {
            if (err) reject(err);
            resolve();
        })
    }
)}

const deleteTeacherFromSubject = (conn, teacher_id, SUBJECT_CODE) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Teaches WHERE TEACHER_ID=? AND SUBJECT_CODE=?', [teacher_id, SUBJECT_CODE], (err, result, fields) => {
            if (err) reject(err);
            resolve(result.length ? result : null)
        })
    }
)}




export default {
    subjectExists,
    getAllSubjects,
    createSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    addSubjectToUser,
    getMySubjects,
    deleteSubjectFromUser,
    getTeacherSubjects,
    getSubjectTeachers,
    addTeacherToSubject,
    getGuaraneeSubjects,
    deleteTeacherFromSubject
}
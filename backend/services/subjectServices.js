import { resolve } from "path";

const subjectExists = (conn, code, name) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM subject WHERE SUBJECT_CODE = ? OR name = ?', [code, name], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

const getAllSubjects = conn => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT subject.SUBJECT_CODE as subject_code, subject.name as subject_name, subject.credits as subject_credits, user.name as guarantee_name, user.login as guarantee_login FROM subject LEFT JOIN user on subject.guarantee_id = user.ID', (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

const getSubject = (conn, code) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT subject.SUBJECT_CODE as \
        SUBJECT_CODE, subject.name as name, subject.credits as credits,\
        user.login as guarantee_login FROM subject LEFT JOIN user on subject.guarantee_id = user.ID \
         WHERE SUBJECT_CODE = ?', [code], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result.length ? result[0] : null);;
        })
    })
}

const createSubject = (conn, data) => {
    return new Promise((resolve, reject) => {
        const code = data.SUBJECT_CODE || null;
        const name = data.name || null;
        const credits = data.credits || null;
        const guarantee = data.guarantee || null;
        const query = 'INSERT INTO subject (SUBJECT_CODE, name, credits, guarantee_id) VALUES(?,?,?,?)'
        conn.query(query, [code, name, credits, guarantee], (err, result, fields) => {
            if (err) reject(err);
            else resolve();;
        })
    })
}

const updateSubject = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE subject SET name=?, credits=?, guarantee_id=? WHERE SUBJECT_CODE=?`, [data.name, data.credits, data.guarantee_id, data.code], (err, result, fields) => {
            if (err) reject(err);
            else resolve();;
        })
    })
}

const deleteSubject = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM subject WHERE SUBJECT_CODE = ?", id, (err, result) => {
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
            else resolve();;
        })
    })
}

const getTeacherSubjects = (conn, teacher_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM teaches WHERE TEACHER_ID = ?', [teacher_id], (err, result) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    })
}

const getGuaraneeSubjects = (conn, teacher_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM subject WHERE guarantee_id = ?', [teacher_id], (err, result) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    })
}


const getMySubjects = (conn, student_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUBJECT_CODE FROM enlists WHERE STUDENT_ID = ?', [student_id], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    })
}

const deleteSubjectFromUser = (conn, student_id, subject_code) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM enlists WHERE STUDENT_ID=? AND SUBJECT_CODE=?', [student_id, subject_code], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    })
}


const getSubjectTeachers = (conn, subject_code) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT user.login FROM teaches LEFT JOIN user ON user.ID = teaches.TEACHER_ID WHERE teaches.SUBJECT_CODE = ?', [subject_code], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    })
}

const addTeacherToSubject = (conn, teacher_id, SUBJECT_CODE) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO teaches (TEACHER_ID, SUBJECT_CODE) VALUES(?,?)'
        conn.query(query, [teacher_id, SUBJECT_CODE], (err, result, fields) => {
            if (err) reject(err);
            else resolve();;
        })
    }
    )
}

const deleteTeacherFromSubject = (conn, teacher_id, SUBJECT_CODE) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM teaches WHERE TEACHER_ID=? AND SUBJECT_CODE=?', [teacher_id, SUBJECT_CODE], (err, result, fields) => {
            if (err) reject(err);
            else resolve(result.length ? result : null);
        })
    }
    )
}




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

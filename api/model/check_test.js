const sql = require('../db.js');

const table = 'check_test';

// constructor
const Check_test = function(check_test) {
    this.sub_group = check_test.sub_group;
}


Check_test.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, res) => {
        if(err) throw err
        result(null, {id: res[0]});
    });
}

Check_test.getAll = result => {
    sql.query(`SELECT test.sub_id, subject.sub_thai, check_test.sub_group, test.room_id, test.time_test
    FROM check_test
    JOIN test ON test.id = check_test.test_id
    JOIN subject ON subject.id = check_test.sub_thai`, (err, res) => {
                    if(err)throw err
                    result(null, res);
                });
}


module.exports = Check_test;
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();

app.use(cors());
const PORT = 80;

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = {
    list: [
        { "id": 1, "name": "Ruchikon", "surname": "Mueanphet", "major": "CoE", "GPA": 3.00 },
    ]
}

router.route('/students')
    .get((req, res) => res.json(students)) //read
    .post((req, res) => {                  //create
        let newStudent = {}
        newStudent.id = (students.list.length) ? students.list[students.list.length - 1].id + 1 : 1
        newStudent.name = req.body.name
        newStudent.surname = req.body.surname
        newStudent.major = req.body.major
        newStudent.GPA = req.body.GPA
        students = { "list": [...students.list, newStudent] }

        res.json(students)
    })

router.route('/students/:student_id')
    .get((req, res) => {
        const studentId = req.params.student_id
        const id = students.list.findIndex(item => +item.id === +studentId)
        if (id >= 0) 
        {
            res.json(students.list[id])
        }
        else 
        {
            res.json({ Status: "student not found !!" })
        }

    })

    .put((req, res) => {                  //update
        const studentId = req.params.student_id
        const id = students.list.findIndex(item => +item.id === +studentId)
        if (id >= 0) 
        {
            students.list[id].name = req.body.name
            students.list[id].surname = req.body.surname
            students.list[id].major = req.body.major
            students.list[id].GPA = req.body.GPA

            res.json(students)
        }
        else 
        {
            res.json({ Status: "student not found !!" })
        }

    })

    .delete((req, res) => {
        const studentId = req.params.student_id
        const id = students.list.findIndex(item => +item.id === +studentId)
        if (id >= 0) 
        {
            students.list = students.list.filter(item => +item.id !== +studentId)
            res.json(students)
        }
        else 
        {
            res.json({ Status: "student not found !!" })
        }

    })

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(PORT, () => console.log('server is running...', PORT))

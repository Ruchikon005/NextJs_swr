import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../styles/index.module.css'
 
const URL = `http://localhost/api/students`

export default function Home() {
  const [students,setStudents] = useState({
    list: [
      { "id": 1, "name": "Ruchikon", "surname": "Mueanphet", "major": "CoE", "GPA": 3.00 },
    ]
  })

  const [student, setStudent] = useState([])
  const [name , setname] = useState('')
  const [surname , setsurname] = useState('')
  const [major , setmajor] = useState('')
  const [GPA , setGPA] = useState(0)


  useEffect( () => {
    getStudents()
  },[])

  const getStudents = async () => {
    let student = await axios.get(URL)
    setStudents(student.data)
  }

  const getStudent = async (id) => {        
    let student = await axios.get(`${URL}/${id}`)
    setStudent({
      name: student.data.name,
      surname: student.data.surname,
      major: student.data.major,
      GPA: student.data.GPA
    })
  }

  const updateStudent = async (id) => {
    let student = await axios.put(`${URL}/${id}`,{name,surname,major,GPA})
    setStudents(student.data)
  }

  const addStudent = async (name,surname,major,GPA) => {
    let student = await axios.post(URL,{name,surname,major,GPA})
    setStudents(student.data)
  }

  const deleteStudent = async (id) => {
    let student = await axios.delete(`${URL}/${id}`)
    setStudents(student.data)
  }

  const printStudents = () => {
    return (students.list.map((item,index) =>
    (
      <li key = {index}>
        Id: {item.id}
        Name: {item.name}
        Surname: {item.surname}
        Major: {item.major}
        GPA: {item.GPA}

        <button onClick = {() => getStudent(item.id)}>GET</button>
        <button onClick = {() => updateStudent(item.id)}>UPDATE</button>
        <button onClick = {() => deleteStudent(item.id)}>DELETE</button>
      </li>
    )
    ))
  }

  return (
    <div>
      Hello
      <ul>
        {printStudents()}
      </ul>
        <h1>Show Student</h1>
        name: {student.name} <br/>
        surname: {student.surname} <br/>
        major: {student.major} <br/>
        GPA: {student.GPA} <br/>
      <div>
        <h1>Update Student</h1>
        name: <input type = "text" onChange = {(e) => setname(e.target.value)}></input><br/>
        surname: <input type = "text" onChange = {(e) => setsurname(e.target.value)}></input><br/>
        major: <input type = "text" onChange = {(e) => setmajor(e.target.value)}></input><br/>
        GPA: <input type = "text" onChange = {(e) => setGPA(e.target.value)}></input><br/>
        <button onClick = {() => addStudent(name,surname,major,GPA)}>ADD</button>
      </div>
    </div>
   
  )
  }


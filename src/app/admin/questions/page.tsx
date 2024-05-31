"use client"
import React, { useEffect, useState } from 'react'
import Student from './QuestionTable';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
const page = () => {
  const dispatch = useDispatch()




  const [questions, setQuestions] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [exams, setExams] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [mode, setMode] = useState("add");
  const [newStudent, setNewStudent] = useState({ _id: '', rightLbl: '', examId: '' }); // State lưu trữ thông tin sinh viên mới

  const addQuestionService = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/questions", { rightLbl: newStudent.rightLbl, examId: newStudent.examId });
      message.success(response.data.message);
      dispatch(SetLoading(false));

    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };



  const updateQuestionService = () => {
    const updatedStudents = [...questions, newStudent];
    setQuestions(updatedStudents);
    setNewStudent({ _id: '', rightLbl: '', examId: '' }); // Xóa thông tin sinh viên mới
  };


  const onEditClick = (stu: any) => {

    setMode("edit")
    setNewStudent(stu)

  }

  const onClickReset = () => {
    setMode("add")
    setNewStudent({ _id: '', rightLbl: '', examId: '' })
  }
  // Hàm xóa sinh viên
  const deleteQuestionService = (id: number) => {
    const updatedStudents = [...questions];
    updatedStudents.splice(id, 1);
    setQuestions(updatedStudents);
  };



  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/admin/api/questions/001`);
      let qsList = response.data.questionList;
      let examList = response.data.examList;
      console.log(qsList)
      setQuestions(qsList);
      setExams(examList)
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchInit()
  }, [])

  return (


    <div className="App" style={{ display: "flex", width: "100%", border: "1px solid red" }}>


      <div className="form-container" style={{ flex: 1, border: "1px solid red" }}>
        <h2>New Question</h2>
        <form>
          <div>
            <label htmlFor="name">ID:</label>
            <input type="text" id="_id" value={newStudent._id} disabled />
          </div>
          <div>
            <label htmlFor="rightLbl">RigthLbl:</label>
            <select id="rightLbl" value={newStudent.rightLbl} onChange={(e) => setNewStudent({ ...newStudent, rightLbl: e.target.value })}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>

            </select>


          </div>
          <div>
            <label htmlFor="examId">ExamId:</label>
            <select id="examId" value={newStudent.examId} onChange={(e) => setNewStudent({ ...newStudent, examId: e.target.value })}>
              {exams.map((el: any) =>
                <option value={el._id}>{el.name}</option>

              )}

            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10%" }}>
            <button type="button" onClick={onClickReset}>Reset</button>
            <button type="button" onClick={mode == "add" ? addQuestionService : updateQuestionService}>{mode == "add" ? "Add" : "Update"}
            </button>

          </div>


        </form>
      </div>

      <div className="table-container" style={{ flex: 2, border: "1px solid blue" }}>
        <h2>List</h2>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>ID</th>
              <th style={{ textAlign: "left" }}>RightLbl</th>
              <th style={{ textAlign: "left" }}>Exam</th>
              <th style={{ textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((student: any, index: number) => (
              <Student
                key={index}
                student={student}

                deleteStudent={deleteQuestionService}

                setSelectedStudent={onEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>



  );
};

export default page;

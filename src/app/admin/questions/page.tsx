"use client"
import React, { useEffect, useState } from 'react'
import Student from './QuestionTable';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
import QuestionTable from './QuestionTable';
const page = () => {
  const dispatch = useDispatch()




  const [questions, setQuestions] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [exams, setExams] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [mode, setMode] = useState("add");
  const [newQuestion, setNewQuestion] = useState({ _id: '', rightLbl: '', examId: '' }); // State lưu trữ thông tin sinh viên mới

  const addQuestionService = async () => {
    const examFinded = exams.find((el: any) => el.name == selectedExamName)

    if (examFinded) {
      try {
        dispatch(SetLoading(true));

        const response = await axios.post("/api/questions", { rightLbl: newQuestion.rightLbl, examId: examFinded._id });
        console.log(response.data.rs)
        message.success(response.data.message);
        setQuestions([...questions, response.data.rs])
        dispatch(SetLoading(false));

      } catch (error: any) {
        message.error(error.response.data.message || "Something went wrong");
      } finally {
        dispatch(SetLoading(false));
      }
    }

  };



  const updateQuestionService = async () => {
    const examFinded = exams.find((el: any) => el.name == selectedExamName)

    if (examFinded) {
      try {
        dispatch(SetLoading(true));

        const response = await axios.put("/api/questions", { ...newQuestion, examId: examFinded._id, });
        console.log(response.data.rs)
        message.success(response.data.message);
        let temp = questions.map((el: any) => {
          if (el._id == response.data.rs._id) {
            return response.data.rs
          } else return el
        })
        setQuestions([...temp])
        dispatch(SetLoading(false));

      } catch (error: any) {
        message.error(error.response.data.message || "Something went wrong");
      } finally {
        dispatch(SetLoading(false));
      }
    }
  };


  const onEditClick = (stu: any) => {

    setMode("edit")
    setNewQuestion(stu)

  }

  const onClickReset = () => {
    setMode("add")
    setNewQuestion({ ...newQuestion, _id: '', rightLbl: '', })
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
      const eRs = await axios.get(`/admin/api/exams`);
      let examList = eRs.data.examList;


      const qRs = await axios.get(`/admin/api/questions/${examList[0].name}`);

      let qsList = qRs.data.questionList;


      console.log(qsList)
      setQuestions(qsList);
      setExams(examList);
      setSelectedExamName(examList[0].name)
      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };


  const fetchWhenChangeExamName = async () => {
    try {
      dispatch(SetLoading(true));
      const qRs = await axios.get(`/admin/api/questions/${selectedExamName}`);
      let qsList = qRs.data.questionList;
      console.log(qsList)
      setQuestions(qsList);
      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);

    }
  };
  useEffect(() => {
    fetchInit()
  }, [])



  const [selectedExamName, setSelectedExamName] = useState("")
  useEffect(() => {

    fetchWhenChangeExamName()
  }, [selectedExamName])


  const onExamChange = (event: any) => {
    setNewQuestion({ ...newQuestion, examId: event.target.value })
    setSelectedExamName(event.target.value)
  }
  return (


    <div className="App" style={{ display: "flex", width: "100%", border: "1px solid red" }}>


      <div className="form-container" style={{ flex: 1, border: "1px solid red" }}>
        <h2>New Question</h2>
        <form>
          <div>
            <label htmlFor="name">ID:</label>
            <input type="text" id="_id" value={newQuestion._id} disabled />
          </div>
          <div>
            <label htmlFor="rightLbl">RigthLbl:</label>
            <select id="rightLbl" value={newQuestion.rightLbl} onChange={(e) => setNewQuestion({ ...newQuestion, rightLbl: e.target.value })}>
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>

            </select>


          </div>
          <div>
            <label htmlFor="examId">ExamId:</label>
            <select disabled={mode == "edit"} onChange={(event: any) => onExamChange(event)} id="examId" value={newQuestion.examId}>
              {exams.map((el: any) =>
                <option value={el.name}>{el.name}</option>

              )}

            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10%" }}>
            <button type="button" onClick={onClickReset}>Reset</button>
            <button disabled={newQuestion.rightLbl ? false : true} type="button" onClick={mode == "add" ? addQuestionService : updateQuestionService}>{mode == "add" ? "Add" : "Update"}
            </button>

          </div>


        </form>
      </div>

      <div className="table-container" style={{ flex: 2, border: "1px solid blue" }}>
        <h2>List {questions.length}</h2>
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
            {questions.map((item: any, index: number) => (
              <QuestionTable
                key={index}
                question={item}

                deleteQuestion={deleteQuestionService}

                setSelectedQuestion={onEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>



  );
};

export default page;

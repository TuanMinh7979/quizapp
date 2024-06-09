"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import QuestionTableItem from './QuestionTableItem';
import Link from 'next/link';
const page = () => {
  const dispatch = useDispatch()
  const [questions, setQuestions] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [exams, setExams] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [mode, setMode] = useState("add");
  // imgLink can be url(update), base64 (add)
  const [newQuestion, setNewQuestion] = useState({ _id: '', title: "", rightLbl: '', examId: '', imgLink: '', videoLink: '', note: '' }); // State lưu trữ thông tin sinh viên mới
  const addQuestionService = async () => {
    try {
      dispatch(SetLoading(true));

      const { _id: eid, videoLink: eVideoLink, ...restBody } = newQuestion
      let newStartTime = Number(startMin) * 60 + Number(startSec)
      let newVideoLink = ""
      if (!eVideoLink) {
        newVideoLink = "https://www.youtube.com/embed/Nuy-p2DhtRI" + "?start=" + newStartTime
      } else {
        newVideoLink = eVideoLink + "?start=" + newStartTime
      }

      // if (!newQuestion.title) {
      restBody.title = "Đề thi 2022 " + restBody.title
      // }
      if (!newQuestion.note) {
        restBody.note = ""
      }

      const response = await axios.post("/api/questions", { videoLink: newVideoLink, ...restBody });
      message.success(response.data.message);
      setQuestions([...questions, response.data.rs])

      dispatch(SetLoading(false));
    } catch (error: any) {
      console.log(error)
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const updateQuestionService = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.put("/api/questions", { _id: newQuestion._id, rightLbl: newQuestion.rightLbl });
      message.success(response.data.message);
      let temp = questions.map((el: any) => {
        if (el._id == response.data.rs._id) {
          return response.data.rs
        } else return el
      })
      setQuestions([...temp])
      dispatch(SetLoading(false));
    } catch (error: any) {
      console.log(error)
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const onEditClick = (stu: any) => {
    setMode("edit")
    setNewQuestion(stu)
  }
  const onClickReset = () => {
    setMode("add")
    setNewQuestion({ ...newQuestion, _id: '', rightLbl: '', title: "", imgLink: '', videoLink: '', note: '', examId: exams[0]._id })
  }
  const deleteQuestionService = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.delete(`/api/questions/${id}`)
      const newQuestionsList = [...questions].filter((el: any) => el._id !== id);
      setQuestions(newQuestionsList)
      dispatch(SetLoading(false));
    } catch (error: any) {
      console.log(error)
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const fetchInit = async () => {
    console.log("fetch init")
    try {
      dispatch(SetLoading(true));
      const eRs = await axios.get(`/admin/api/exams`);
      let examList = eRs.data.examList;
      setExams(examList);

      if (examList.length > 0) {
        setNewQuestion({ ...newQuestion, examId: examList[0]._id })
        const qRs = await axios.get(`/admin/api/questions/${examList[0].name}`);
        let qsList = qRs.data.questionList;
        setQuestions(qsList);
      }

      dispatch(SetLoading(false));
    } catch (error: any) {
      console.log(error)
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  const fetchWhenChangeExamName = async (nameOfExam: string) => {
    try {
      dispatch(SetLoading(true));

      const qRs = await axios.get(`/admin/api/questions/${nameOfExam}`);
      let qsList = qRs.data.questionList;

      setQuestions(qsList);

      dispatch(SetLoading(false));
    } catch (error: any) {
      console.log(error)
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchInit()
  }, [])
  const onExamChange = (event: any) => {
    setNewQuestion({ ...newQuestion, examId: event.target.value })
    let findedExam = exams.find((el: any) => el._id == event.target.value)
    fetchWhenChangeExamName(findedExam.name)
  }


  const onQuestionFieldChange = (event: any) => {
    setNewQuestion({ ...newQuestion, [event.target.name]: event.target.value })
  }
  const disableWhenEdit = () => {
    return mode == "edit"
  }
  const validateToAddQuestion = () => {
    return newQuestion.rightLbl == '' || newQuestion.imgLink == ''
  }
  const validateToUpdateQuestion = () => {
    return false
  }
  const changeImgLinkToUp = (base64Str: any) => {
    console.log(newQuestion)
    setNewQuestion((prevState: any) => ({
      ...prevState, imgLink: base64Str
    }))
  }

  const [startMin, setStartMin] = useState(0);
  const [startSec, setStartSec] = useState(0);







  return (
    <> {
      exams.length > 0 && <div className="App" style={{ display: "flex", width: "100%", }}>
        <div className="form-container" style={{ flex: 1, }}>
          <h2>New Question


          </h2>
          <form>
            <div>
              <label htmlFor="name">ID:</label>
              <input type="text" id="_id" value={newQuestion._id} disabled />
            </div>
            <div>
              <label htmlFor="name">Title:</label>
              <input type="text" id="" value={newQuestion.title} onChange={onQuestionFieldChange} name="title" />
            </div>
            <div>
              <label htmlFor="rightLbl">RigthLbl:</label>
              <select id="rightLbl" name="rightLbl" value={newQuestion.rightLbl} onChange={onQuestionFieldChange}>
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
                  <option value={el._id}>{el.name}</option>
                )}
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10%" }}>
              <button type="button" onClick={onClickReset}>Reset</button>
              {
                mode == "add" && <button disabled={validateToAddQuestion()} type="button" onClick={addQuestionService} >
                  Add </button>
              }
              {
                mode == "edit" && <button disabled={validateToUpdateQuestion()} type="button" onClick={updateQuestionService} >
                  Update </button>
              }
            </div>

            <label >Img Link:</label>
            <ImageUpload mode={mode} imgLinkToShow={newQuestion.imgLink} changeBase64ToUp={changeImgLinkToUp} />



            <div>
              <label >Video Link:</label>
              <input type="text" disabled={disableWhenEdit()} name="videoLink" onChange={onQuestionFieldChange} value={newQuestion.videoLink} />
            </div>
            <div>
              <label >Start time:</label>
              <div className="" style={{ display: 'flex', gap: '100px' }}>
                <input type="text" disabled={disableWhenEdit()} onChange={(e: any) => setStartMin(e.target.value)} value={startMin} />
                <input type="text" disabled={disableWhenEdit()} onChange={(e: any) => setStartSec(e.target.value)} value={startSec} />
              </div>

            </div>
            <div>
              <label >Note:</label>
              <textarea onChange={onQuestionFieldChange} name="note" value={newQuestion.note} />
            </div>
          </form>
        </div>
        <div className="table-container" style={{ flex: 2, }}>
          <h2>List {questions.length}</h2>
          <div style={{ display: "flex", justifyContent: "flex-end", }}>   <Link href={"/admin/exams"} ><span style={{ color: "blue", padding: "12px", background: "cyan" }}>To Exam</span></Link></div>
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
              {questions && questions.length > 0 && questions.map((item: any, index: number) => (
                <QuestionTableItem
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
    }</>
  );
};
export default page;

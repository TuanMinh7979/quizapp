"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import QuestionTableItem from './QuestionTableItem';
const page = () => {
  const dispatch = useDispatch()




  const [questions, setQuestions] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [exams, setExams] = useState<any[any]>([]); // State lưu trữ danh sách sinh viên
  const [mode, setMode] = useState("add");
  // imgLink can be url(update), base64 (add)
  const [newQuestion, setNewQuestion] = useState({ _id: '', rightLbl: '', examId: '', imgLink: '', videoLink: '' }); // State lưu trữ thông tin sinh viên mới

  const addQuestionService = async () => {
    const examFinded = exams.find((el: any) => el.name == selectedExamName)

    if (examFinded) {
      try {
        dispatch(SetLoading(true));
        console.log(newQuestion)
        const response = await axios.post("/api/questions", { ...newQuestion, examId: examFinded._id });
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

        const response = await axios.put("/api/questions", { _id: newQuestion._id, rightLbl: newQuestion.rightLbl, examId: examFinded._id, });
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
    setNewQuestion({ ...newQuestion, _id: '', rightLbl: '', imgLink: '', videoLink: '' })

  }

  const deleteQuestionService = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.delete(`/api/questions/${id}`)
      const newQuestionsList = [...questions].filter((el: any) => el._id !== id);
      setQuestions(newQuestionsList)
      dispatch(SetLoading(false));

    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }



  };


  const fetchInit = async () => {
    try {
      dispatch(SetLoading(true));
      const eRs = await axios.get(`/admin/api/exams`);
      let examList = eRs.data.examList;


      const qRs = await axios.get(`/admin/api/questions/${examList[0].name}`);

      let qsList = qRs.data.questionList;



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

  const onVideoLinkChange = (event: any) => {
    setNewQuestion({ ...newQuestion, videoLink: event.target.value })

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
    setNewQuestion({ ...newQuestion, imgLink: base64Str })

  }
  return (


    <div className="App" style={{ display: "flex", width: "100%", }}>


      <div className="form-container" style={{ flex: 1, }}>
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
            {
              mode == "add" && <button disabled={validateToAddQuestion()} type="button" onClick={addQuestionService} >

                Add </button>
            }
            {
              mode == "edit" && <button disabled={validateToUpdateQuestion()} type="button" onClick={updateQuestionService} >
                Update </button>
            }


          </div>
          <div>
            <label >Img Link:</label>
            <ImageUpload mode={mode} imgLinkToShow={newQuestion.imgLink} changeBase64ToUp={changeImgLinkToUp} />
          </div>
          <div>
            <label >Video Link:</label>
            <input type="text" disabled={disableWhenEdit()} onChange={onVideoLinkChange} value={newQuestion.videoLink} />
          </div>



        </form>
      </div>

      <div className="table-container" style={{ flex: 2, }}>
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



  );
};

export default page;

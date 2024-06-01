"use client"
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import ExamTableItem from './ExamTableItem';

const page = () => {
  const dispatch = useDispatch()





  const [exams, setExams] = useState<any[any]>([]);
  const [topics, setTopics] = useState<any[any]>([]);
  const [mode, setMode] = useState("add");
  // topicSlug can be url(update), base64 (add)
  const [newExam, setNewExam] = useState({ _id: '', name: '', topicName: '', topicSlug: '', description: '' }); // State lưu trữ thông tin sinh viên mới

  const addExamService = async () => {
    const topicFinded = topics.find((el: any) => el.name == selectedTopicName)

    if (topicFinded) {
      try {
        dispatch(SetLoading(true));
        const { _id: eid, ...restBody } = newExam

        const response = await axios.post("/api/exams", { ...restBody, topicName: topicFinded.name, topicSlug: topicFinded.slugStr });

      
        console.log(response.data.rs)
        message.success(response.data.message);
        setExams([...exams, response.data.rs])
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
    setNewExam(stu)

  }

  const onClickReset = () => {
    setMode("add")
    setNewExam({ ...newExam, _id: '', name: '', topicSlug: '', description: '', topicName: '' })

  }

  const deleteExamService = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.delete(`/api/exams/${id}`)
      const newExamList = [...exams].filter((el: any) => el._id !== id);
      setExams(newExamList)
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
      const rs = await axios.get(`/api/topics`);
      let topicLs = rs.data.topicList;
      setTopics(topicLs);
      setSelectedTopicName(topics[0].name)


      const examRs = await axios.get(`/admin/api/exams/${topicLs[0].slugStr}`);
      let examLs = examRs.data.examList;
      setExams(examLs);

      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };


  const fetchWhenChangeExamName = async () => {
    try {
      dispatch(SetLoading(true));
      const examRs = await axios.get(`/admin/api/exams/${selectedTopicName}`);
      let examLs = examRs.data.examList;

      setExams(examLs);
      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);

    }
  };
  useEffect(() => {
    fetchInit()
  }, [])



  const [selectedTopicName, setSelectedTopicName] = useState("")
  useEffect(() => {

    fetchWhenChangeExamName()
  }, [selectedTopicName])


  const onTopicSelectionName = (event: any) => {
    setNewExam({ ...newExam, topicName: event.target.value })
    setSelectedTopicName(event.target.value)
  }




  const disableWhenEdit = () => {
    return mode == "edit"
  }



  const validateToAddExam = () => {
    return newExam.name == '' || selectedTopicName == ''
  }




  const onExamFieldChange = (event: any) => {
    setNewExam({ ...newExam, [event.target.name]: event.target.value })
  }



  return (
    <>
      {<div className="App" style={{ display: "flex", width: "100%", }}>


        <div className="form-container" style={{ flex: 1, }}>
          <h2>New Exam</h2>
          <form>
            <div>
              <label htmlFor="name">ID:</label>
              <input type="text" id="_id" value={newExam._id} disabled />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="" name="name" value={newExam.name} onChange={onExamFieldChange} />


            </div>
            <div>
              <label htmlFor="topicName">TopicName:</label>
              <select disabled={mode == "edit"} onChange={(event: any) => onTopicSelectionName(event)} id="topicName" value={newExam.topicName}>
                {topics.map((el: any) =>
                  <option value={el.name}>{el.name}</option>

                )}

              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10%" }}>
              <button type="button" onClick={onClickReset}>Reset</button>
              {
                mode == "add" && <button disabled={validateToAddExam()} type="button" onClick={addExamService} >

                  Add </button>
              }


            </div>

            <div>
              <label >Description</label>
              <input type="text" disabled={disableWhenEdit()} name="description" onChange={onExamFieldChange} value={newExam.description} />
            </div>



          </form>
        </div>

        <div className="table-container" style={{ flex: 2, }}>
          <h2>List {exams.length}</h2>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>ID</th>
                <th style={{ textAlign: "left" }}>name</th>
                <th style={{ textAlign: "left" }}>Description</th>

              </tr>
            </thead>
            <tbody>
              {exams.map((item: any, index: number) => (
                <ExamTableItem
                  key={index}
                  exam={item}

                  deleteExam={deleteExamService}

                  setSelectedExam={onEditClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }



    </>)
};

export default page;

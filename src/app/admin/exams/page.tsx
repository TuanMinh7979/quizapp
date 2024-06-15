"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { message } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import ExamTableItem from './ExamTableItem';
import Link from 'next/link';
const page = () => {
  const dispatch = useDispatch()
  const [exams, setExams] = useState<any[any]>([]);
  const [topics, setTopics] = useState<any[any]>([]);
  const [mode, setMode] = useState("add");
  // topicSlug can be url(update), base64 (add)
  const [newExam, setNewExam] = useState({ _id: '', name: '', topicSlug: '', subjectId: "666c5b40b7d9b9d0b5e2ec47", description: '' }); // State lưu trữ thông tin sinh viên mới
  const addExamService = async () => {
    try {
      dispatch(SetLoading(true));
      const { _id: eid, ...restBody } = newExam
      const response = await axios.post("/api/exams", { ...restBody });
      message.success(response.data.message);
      setExams([...exams, response.data.rs])
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
    setNewExam(stu)
  }
  const onClickReset = () => {
    setMode("add")
    setNewExam({ ...newExam, _id: '', name: '', topicSlug: topics[0].slug, description: '', subjectId: '666c5b40b7d9b9d0b5e2ec47' })
  }
  const deleteExamService = async (id: string) => {
    try {
      dispatch(SetLoading(true));
      const rs = await axios.delete(`/admin/api/exams/${id}`)
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



      if (topicLs.length > 0) {
        setNewExam({ ...newExam, topicSlug: topicLs[0].slug })
        const examRs = await axios.get(`/admin/api/examsbytopic?topicSlug=${topicLs[0].slug}`);
        let examLs = examRs.data.examList;
        setExams(examLs);
      }

      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      console.log(error)
      message.error(error.message);
    }
  };
  const fetchWhenChangeExamName = async (newTopicSlug: string) => {
    try {
      dispatch(SetLoading(true));
      const examRs = await axios.get(`/admin/api/examsbytopic?topicSlug=${newTopicSlug}`);
      let examLs = examRs.data.examList;
      setExams(examLs);
      dispatch(SetLoading(false));
    } catch (error: any) {
      dispatch(SetLoading(false));
      console.log(error)
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchInit()
  }, [])

  const onTopicSelectionName = (event: any) => {
    const topicFinded = topics.find((el: any) => el.slug == event.target.value)
    if (topicFinded) {
      setNewExam({ ...newExam, topicSlug: topicFinded.slug })
      fetchWhenChangeExamName(event.target.value)
    }
  }
  const disableWhenEdit = () => {
    return mode == "edit"
  }
  const validateToAddExam = () => {
    return newExam.name == '' || newExam.topicSlug == '' || newExam.subjectId == ''
  }
  const onExamFieldChange = (event: any) => {
    setNewExam({ ...newExam, [event.target.name]: event.target.value })
  }
  return (
    <>{topics.length && <div className="App" style={{ display: "flex", width: "100%", }}>
      <div className="form-container" style={{ flex: 1, }}>
        <h2>New Exam</h2>
        <form>

          <div>
            <label htmlFor="name">ID:</label>
            <input type="text" id="_id" value={newExam._id} disabled />
          </div>

          <div>
            <label htmlFor="subjectId">SubjectId:</label>
            <select name="subjectId" disabled={mode == "edit"} onChange={onExamFieldChange} id="subjectId" value={newExam.subjectId}>

              <option value="666c5b40b7d9b9d0b5e2ec47">toan</option>
              <option value="666c5b52b7d9b9d0b5e2ec4a">hh</option>

            </select>
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="" name="name" value={newExam.name} onChange={onExamFieldChange} />
          </div>
          <div>
            <label htmlFor="topicName">TopicName:</label>
            <select disabled={mode == "edit"} onChange={(event: any) => onTopicSelectionName(event)} id="topicName" value={newExam.topicSlug}>


              {topics.filter((el: any) => el.subjectId == newExam.subjectId ).map((el: any) =>
                <option value={el.slug}>{el.name}</option>
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>   <Link href={"/admin/questions"} ><span style={{ color: "blue", padding: "12px", background: "cyan" }}>To Question</span></Link></div>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>ID</th>
              <th style={{ textAlign: "left" }}>name</th>
              <th style={{ textAlign: "left" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {exams && exams.length && exams.map((item: any, index: number) => (
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
    </div>}
    </>)
};
export default page;

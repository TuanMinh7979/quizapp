import React from 'react';
const QuestionTableItem = (props:any) => {
    const { question, deleteQuestion, setSelectedQuestion } = props
    const handleClickEdit = () => {
        setSelectedQuestion(question); // Cập nhật state khi click "Sửa"
    };
    return (
        <tr>
            <td>{question._id}</td>
            <td>{question.rightLbl}</td>
            <td>{question.examId}</td>
            <td>
                <button onClick={handleClickEdit}>Sửa</button>
                <button disabled onClick={() => deleteQuestion(question._id)}>Xóa</button>
            </td>
        </tr>
    );
};
export default QuestionTableItem;
import React from 'react';
const ExamTableItem = (props: any) => {
    const { exam, deleteExam, setSelectedExam } = props
    const handleClickEdit = () => {
        setSelectedExam(exam); // Cập nhật state khi click "Sửa"
    };
    return (
        <tr>
            <td>{exam._id}</td>
            <td>{exam.name}</td>
            <td>{exam.description}</td>
            <td>
                <button onClick={handleClickEdit}>Sửa</button>
                <button disabled onClick={() => deleteExam(exam._id)}>Xóa</button>
            </td>
        </tr>
    );
};
export default ExamTableItem;
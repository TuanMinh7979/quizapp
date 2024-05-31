import React from 'react';

const QuestionTable = (props:any) => {
    const { student, deleteStudent, setSelectedStudent } = props
    const handleClickEdit = () => {
        setSelectedStudent(student); // Cập nhật state khi click "Sửa"
    };

    return (
        <tr>
            <td>{student._id}</td>
            <td>{student.rightLbl}</td>
            <td>{student.examId}</td>
            <td>
                <button onClick={handleClickEdit}>Sửa</button>
                <button onClick={() => deleteStudent(student.id)}>Xóa</button>
            </td>
        </tr>
    );
};

export default QuestionTable;
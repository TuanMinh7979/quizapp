import { Modal } from 'antd'
import React from 'react'
const NoteModal = (props: any) => {
    return (
        <Modal width="660px" title="Note" open={props.isNoteModalOpen} onOk={props.handleModalBtns} onCancel={props.handleModalBtns}>
            <div style={{
                color: "black", whiteSpace: "wrap",

            }}>
                {props.noteModalData}
            </div>


        </Modal>
    )
}
export default NoteModal

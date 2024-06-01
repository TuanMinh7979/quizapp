import { Modal } from 'antd'
import React from 'react'

const AnswerModal = (props: any) => {

    return (

        <Modal width="1260px" title="Solution" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <h5>{props.modalData}</h5>


            <iframe width="1200px" height="600px" src={`${props.modalData}`} title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

            ></iframe>


        </Modal>


    )
}

export default AnswerModal

"use client";
import React, { useEffect, useState } from 'react'
export function readAsBase64(file: any) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
        reader.addEventListener('error', (event) => {
            reject(event);
        });
        reader.readAsDataURL(file);
    });
    return fileValue;
}



const ImagePreview = (props: any) => {
    const [avatar, setAvatar] = useState<any>(props.imgLinkToShow)
    const hdlChangeFile = async (e: any) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        if (files) {
            const file = files[0];
            if (file) {
                setAvatar(window.URL.createObjectURL(file));
                props.changeBase64ToUp(await readAsBase64(file))
            }
        }
    };
    useEffect(() => {
        setAvatar(props.imgLinkToShow)
    }, [props.imgLinkToShow])

    const [isDragging, setIsDragging] = useState(false)
    const onDragOverhdl = (e: any) => {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = "copy";
    
      }
      const onDragLeavehdl = (e: any) => {
        e.preventDefault();
        setIsDragging(false)
    
      }
      const onDragDrophdl = async(e:any) => {
        e.preventDefault();
        setIsDragging(false)
        const files= e.dataTransfer.files
        if (files.length == 0) return

        if (files) {
            const file = files[0];
            if (file) {
                setAvatar(window.URL.createObjectURL(file));
                props.changeBase64ToUp(await readAsBase64(file))
            }
        }
    
      }

    return (
        <div className="info_avatar"  style={{ background: "blue" , width:"100%", height:"300px"}} onDragOver={onDragOverhdl} onDragLeave={onDragLeavehdl} onDrop={onDragDrophdl}>
            <img
                src={
                    avatar
                }
                alt="avatar"
            />
            <span>
                <i className="fas fa-camera" />
                <p>change</p>
                <input
            
                    disabled={props.mode == "edit" ? true : false}
                    type="file"
                    accept="image/*"
                    name="file"
                    id="file_up"
                    onChange={hdlChangeFile}
                />
            </span>
        </div>
    )
}
export default ImagePreview

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
const ImageUpload = (props: any) => {
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
    return (
        <div className="info_avatar">
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
export default ImageUpload

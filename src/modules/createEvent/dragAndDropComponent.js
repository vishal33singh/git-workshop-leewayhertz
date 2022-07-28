import React, { useState } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "./cropImage";

function DragAndDropComponent(props) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]?.size < 80000000) {
        if (props.uploadEventImage) {
          props.uploadEventImage(acceptedFiles);
        } else if (props.uploadImageToIPFS) {
          props.uploadImageToIPFS(acceptedFiles, props.imageFor);
        }
          setFiles(acceptedFiles);
        // setInterval(() => {
        // }, 1000);
      } else {
        alert("Please Upload less than 10mb file");
      }
    },
  });


  // const deleteImageHandler = (date) => {
  //   const newFiles = files.filter(file => file.lastModified !== date)
  //   setFiles(newFiles)
  //  }

  useEffect(() => {
    if (props.chosenFile && props.chosenFile.hasOwnProperty("path")) {
      setFiles([props.chosenFile]);
    }
  }, []);

  return (
    <>
      {!files?.length ? (
        <div
          {...getRootProps({
            className:
              "bg-Slate-50 h-62.5 w-183.25 mt-10  items-center text-center mb-7 cursor-pointer ",
          })}
        >
          <img
            className="m-auto pt-18.5 cursor-pointer"
            src="/images/ic-imageplaceholder.svg"
            alt=""
          ></img>
          <input type="file" className="hidden" {...getInputProps()} />
          <h1 className="font-OpenSansSemiBold text-ft6 text-black-50 mt-5">
            Drag & drop or click to add event image
          </h1>
          <p className="font-OpenSansRegular text-ft3 text-darkGrey-50 mt-2.5">
            JPEG or PNG, no larger than 10mb
          </p>
        </div>
      ) : (
        
        <>
          <div className="h-62.5 w-183.25 mt-10 mb-7 flex">
            <img
              className="h-full w-full"
              src={files?.length ? URL.createObjectURL(files[0]) : ""}
              alt=""
              
            />
            {/* <img
              onClick={() => {
                if (props.deleteEventImage) {
                  props.deleteEventImage();
                }
                setFiles([]);
              }}
              alt=""
              src="/images/ic-delete.svg"
              className="w-6 mt-auto ml-2"
            /> */}
            <input type="file" id="editImage" className="hidden" {...getInputProps()} /> 
            <label className="mt-auto" htmlFor="editImage"><img
              alt=""
              src="/images/image-edit.svg"
              className="w-6 mt-auto ml-2"
            /></label>
          </div>
        </>
      )}

      {/* {files?.map((imageData, index) => (
        <div key={index} className="flex items-center pb-3  ">
          <img
            alt=""
            className="w-10 mr-5 rounded-md"
            src={URL.createObjectURL(imageData)}
          />
          <div className="w-45 overflow-hidden text-ft3">
            {" "}
            {imageData?.name}
          </div>
          <div className="flex items-center w-92 h-11.25 border border-grey-400 rounded-md ml-4 pl-4">
            # 00{index + 1}
          </div>
          <div>
           {" "}
           <img onClick={() => deleteImageHandler(image.lastModified)} alt="" src="/images/ic-delete.svg" className="pl-6" />{" "}
          </div>
        </div>
      ))} */}
    </>
  );
}

export default DragAndDropComponent;

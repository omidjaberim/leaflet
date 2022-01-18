import React, {useCallback, useMemo, useState,useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from 'react-toastify';
import imageAvata from '../assets/images/imageAvata.png'
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgb(96,125,139)',
    borderStyle: 'dashed',
    backgroundColor: 'white',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height:'inherit'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const getBase64  = (file:any,cb:any)=> {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error:any) {
        toast.error('Error: ', error);
    };
}


function Dropzone(prop:any) {
    const {setPicture, initialImg, hasText=true} = prop
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
      } = useDropzone({
        accept: 'image/jpeg, image/png,image/jpg',
        maxFiles:1,         
        onDrop: async(acceptedFiles:any) => {
            getBase64(acceptedFiles[0],setPicture)
   
      }});
    

    return (
        <div className="container" style={{height:'inherit'}} >
        <div {...getRootProps(useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ])  )}>
          <input {...getInputProps()} />
          {hasText && (
          <> 
            <p>
                Drag and drop here, or click
                <span style={{fontSize:'10px'}} >(Only *.jpeg,*.png and *.jpg images will be accepted)</span>
            </p>          
            <p  ><UploadIcon /></p>
          </>
          )}
          <aside style={{    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
}}>
            <div style={{    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 120,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
}}>
              <div style={thumbInner}>            
                <img
                  src={initialImg? initialImg:imageAvata }
                  style={img}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>  
    )
  }
  export default Dropzone
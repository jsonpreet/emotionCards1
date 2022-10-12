import React from "react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import DropZone from "@components/Dropzone"
import { vectors } from "@app/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import { useUser, useSessionContext } from '@supabase/auth-helpers-react';
import { supabaseUrl } from "@app/lib/supabaseClient"
import {Loader }  from '@components/Loading'
import { nanoid } from "nanoid"
import { useEffect } from "react"

const Graphics = () => {
  const inputFileRef = React.useRef(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(true)
  const [allGraphics, setAllImages] = React.useState([])
  const user = useUser();
  const { supabaseClient } = useSessionContext();

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const uploadDir = 'graphics';

  useEffect(() => {
    if (user) {
      setIsFetching(true)
      fetchImages()
    }
  }, [user])

  const fetchImages = async () => {
    const { status, statusText, data, error } = await supabaseClient.from("graphics").select().eq("user_id", user.id);
    if (status === 200) {
      setAllImages(data)
      setIsFetching(false)
    }
    else {
      console.log(error)
    }
  }

  const handleDropFiles = async (files) => {
    setIsUploading(true)
    const file = files[0]
    const fileName = file.name
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const url = URL.createObjectURL(file)
    const newFileName = nanoid() + '.' + extension;
    const { data, error } = await supabaseClient
      .storage
      .from('uploads')
      .upload(uploadDir+'/'+newFileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    if (data) {
      const image = newFileName;
      const url = data.path;
      const user_id = user?.id;
      insertRecord(image, url, user_id);
    } else if (error) {
      console.log(error);
    }
  }

  const insertRecord = async (image, url, user_id) => {
    const { status, statusText, data, error } = await supabaseClient.from("graphics").insert([{ image, url, user_id }]).select();
    if (status === 201) {
      console.log("Record inserted successfully");
      setAllImages([...allGraphics, data[0]])
      console.log(statusText);
      //setUploads([...uploads, data[0]])
      setIsUploading(false)
    } else if (error) {
      console.log(error);
      setIsUploading(false)
    }
  }

  // const handleDropFiles = (files) => {
  //   const file = files[0]
  //   const url = URL.createObjectURL(file)
  //   editor.objects.add({
  //     src: url,
  //     type: "StaticVector",
  //   })
  // }

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }
  const addObject = (url) => {
    const options = {
      type: "StaticVector",
      src: url,
    }
    editor.objects.add(options)
  }

  // const addObject = React.useCallback(
  //   (url) => {
  //     if (editor) {
  //       const options = {
  //         type: "StaticVector",
  //         src: url,
  //       }
  //       editor.objects.add(options)
  //     }
  //   },
  //   [editor]
  // )

  return (
    <div className="flex flex-col w-full">
      <DropZone handleDropFiles={handleDropFiles}>
        <div className="flex flex-col w-full flex-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem",
            }}
          >
            <div className="font-semibold text-lg">Graphics</div>

            <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
              <AngleDoubleLeft size={18} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center px-6">
            <button onClick={handleInputFileRefClick} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
              Computer
            </button>
            <input onChange={handleFileInput} type="file" accept="image/*" id="file" ref={inputFileRef} style={{ display: "none" }} />
            <div className="w-full flex flex-wrap items-center justify-center">
              {(isFetching || isUploading) ? <Loader className={`relative z-10 w-8 h-8 mt-5 text-black`} />  : null}
            </div>
          </div>
          <Scrollable>
            <div className="w-full flex flex-col px-6 items-center justify-center">
              <div className="grid w-full grid-cols-2 gap-4 mt-3">
                {vectors.map((vector, index) => (
                  <GraphicItem onClick={() => addObject(vector)} key={index} preview={vector} />
                ))}
              </div>
              <div className="grid w-full grid-cols-2 gap-4 mt-3">
                {allGraphics?.length > 0 && allGraphics.map((image) => {
                  const { data } = supabaseClient.storage.from('uploads').getPublicUrl(image.url)
                  const url = data.publicUrl
                  return (
                    <GraphicItem onClick={() => addObject(url)} key={image.id} preview={url} />
                  )
                })}
              </div>
            </div>
          </Scrollable>
        </div>
      </DropZone>
    </div>
  )
}

const GraphicItem = ({ preview, onClick }) => {
  return (
    <div
      onClick={onClick}
      // onClick={() => onClick(component.layers[0])}
      style={{
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
        }}
      />
      <img
        src={preview}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        }}
      />
    </div>
  )
}

export default Graphics

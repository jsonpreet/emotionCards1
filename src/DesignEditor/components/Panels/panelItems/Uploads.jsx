import React from "react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import DropZone from "@components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"
import { useUser, useSessionContext } from '@supabase/auth-helpers-react';
import { supabaseUrl } from "@app/lib/supabaseClient"
import {Loader }  from '@components/Loading'
import { useEffect } from "react"

const Uploads = () => {
  const inputFileRef = React.useRef()
  const [uploads, setUploads] = React.useState([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(true)
  const [allImages, setAllImages] = React.useState([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const user = useUser();
  const { supabaseClient } = useSessionContext();
  //console.log(user)
  const uploadDir = 'images';

  useEffect(() => {
    if (user) {
      setIsFetching(true)
      fetchImages()
    }
  }, [user])
  
  const fetchImages = async () => {
    const { status, statusText, data, error } = await supabaseClient.from("uploads").select().eq("user_id", user.id);
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
    const { status, statusText, data, error } = await supabaseClient.from("uploads").insert([{ image, url, user_id }]).select();
    if (status === 201) {
      console.log("Record inserted successfully");
      setAllImages([...allImages, data[0]])
      console.log(statusText);
      //setUploads([...uploads, data[0]])
      setIsUploading(false)
    } else if (error) {
      console.log(error);
      setIsUploading(false)
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files)
  }

  const addImageToCanvas = (url) => {
    const options = {
      type: "StaticImage",
      src: url,
    }
    editor.objects.add(options)
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <div className="font-semibold text-lg">Uploads</div>

          <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </div>
        </div>
        <Scrollable>
          <div className="w-full flex flex-col items-center justify-center px-6">
            <button onClick={handleInputFileRefClick} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
              Computer
            </button>
            <input onChange={handleFileInput} accept="image/*" type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
            <div className="w-full flex flex-wrap items-center justify-center">
              {(isFetching || isUploading) ? <Loader className={`relative z-10 w-8 h-8 mt-5 text-black`} />  : null}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {allImages.map((image) => {
                const { data } = supabaseClient.storage.from('uploads').getPublicUrl(image.url)
                const url = data.publicUrl
                return (
                  <div className="flex flex-row items-center" key={image.id} style={{ cursor: "pointer", }} onClick={() => addImageToCanvas(url)}>
                    <div className="flex flex-col relative items-center justify-center overflow-hidden w-full">
                      <img width="100%" src={url} alt="preview" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Scrollable>
      </div>
    </DropZone>
  )
}

export default Uploads

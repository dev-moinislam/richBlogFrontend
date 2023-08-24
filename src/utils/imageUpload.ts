export const checkImage=(file)=>{
    let error='';
    // if(!file){
    //     error="Please Select a new image also"
    // }
    if(file.size > 1024*1024){
        error="Image is more than 1 mb"
    }
    return error
}

export const ImageUplode=async (file)=>{
    const formData=new FormData()
    formData.append('file',file)
    formData.append('upload_preset','he7mmloo' )
    formData.append('cloud_name','richblogcloud' )

    const res = await fetch("https://api.cloudinary.com/v1_1/richblogcloud/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      return { public_id: data.public_id, url: data.secure_url };
}
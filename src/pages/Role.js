import { useHistory } from "react-router-dom";
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useRef, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Role() {
  const { ...state } = useAuthContext()
  const [role, setRole] = useState();
  const history = useHistory();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [clicked, setClicked] = useState({Coach: false, Learner: false, Teammate: false});
  

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image])

  const fileInputRef = useRef();

  const handleImage = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0,5) === "image") {
      setImage(file);
    } else {
      setImage(null)
    }
  }
  const handleClick = (e) => {
      e.preventDefault()
      console.log(e.target.value)
      setRole(e.target.value)
      let dict = clicked
      for(const [key] of Object.entries(dict)){
        if(key === e.target.value){
          dict[key] = true
        } else {
          dict[key] = false
        }
      }
      setClicked(dict)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userRef = doc(db, "users", state.user.uid)
    const fileRef = ref(storage, state.user.uid + '.png')
    uploadBytes(fileRef, image)
    getDownloadURL(fileRef).then(url =>{
      updateDoc(userRef,{
        role: role,
        imgSrc: url
     })
    }).catch(function(e){
      console.log(e.message)
    })
    console.log(image, preview)
    history.push('/')
  }

  // let imgSrc = getDownloadURL(ref(storage, userKey + '.png'))
  // .then((url) =>{
  //   imgSrc = url
  //   console.log(imgSrc)
  // }).catch(function(e){
  //   console.log(e.message)
  //   imgSrc = 'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png'
  // })

  return (
    <div className="role-container">
        <h2>You are a...</h2>
        <form onSubmit={handleSubmit}>
            <div className="role-button-container">

              <div className="coach-button-container">
                {preview && clicked['Coach']? (
                <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                ) : (
                <button className="role-button coach" value="Coach" onClick={handleClick}>Coach</button>
                )}
                {clicked['Coach'] && <button onClick={handleImage}className="role-picture">Add Profile Image</button>}
                <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>

              <div className="coach-button-container">
                {preview && clicked['Learner']? (
                  <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                  ) : (
                  <button className="role-button learner" value="Learner" onClick={handleClick}>Learner</button>
                  )}
                  {clicked['Learner'] && <button onClick={handleImage} className="role-picture">Add Profile Image</button>}
                  <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>

              <div className="coach-button-container">
                {preview && clicked['Teammate'] ? (
                  <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                  ) : (
                  <button className="role-button teammate" value="Teammate" onClick={handleClick}>Teammate</button>
                )}
                  {clicked['Teammate'] && <button onClick={handleImage} className="role-picture">Add Profile Image</button>}
                  <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>
            </div>
            <button className="role-submit" type="submit">next</button>
        </form>
    </div>
  )
}
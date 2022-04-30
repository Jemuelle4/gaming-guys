import { useHistory } from "react-router-dom";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useRef, useEffect } from "react";

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
    const ref = doc(db, "users", state.user.uid)
    updateDoc(ref,{
       role: role
    })
    console.log(image, preview)
    //history.push('/')
  }

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
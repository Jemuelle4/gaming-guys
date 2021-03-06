import { useHistory } from "react-router-dom";
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useRef, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../css/login-creation.css";

export default function Role(props) {
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
    console.log(file.type)
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

  const metadata = {
    contentType: 'image/jpeg'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userRef = doc(db, "users", state.user.uid)
    const fileRef = ref(storage, state.user.uid + '.png')
    console.log(fileRef)
    uploadBytes(fileRef, image, metadata).then(() =>{
      getDownloadURL(fileRef).then((url) =>{
        updateDoc(userRef,{
          role: role,
          imgSrc: url
        })
    }).catch(function(e){
      console.log(e.message)
    })
    })
    if(props.mode == 'page'){
      history.push('/')
   }
  }
  //style={{['background-image']: 'none'}}
  return (
    <div className={`${props.mode==="page" ? "role-container" : 'edit-role-container'}`}> 
      <div className="role-header">
        {props.mode==="page" ? <h2>You are a...</h2> : ''}
      </div>
      <div>
      <form id='role-form' onSubmit={handleSubmit}>
            <div className={`${props.mode==="page" ? "role-button-container" : 'edit-role-button-container'}`}>
              <div className={`${props.mode==="page" ? "button-container" : 'edit-button-container'}`}>
                {preview && clicked['Coach']? (
                <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                ) : (
                <button style={{}} className="role-button coach" value="Coach" onClick={handleClick}>Coach</button>
                )}
                {clicked['Coach'] && <button onClick={handleImage}className="role-picture">Add Profile Image</button>}
                <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>

              <div className={`${props.mode==="page" ? "button-container" : 'edit-button-container'}`}>
                {preview && clicked['Learner']? (
                  <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                  ) : (
                  <button className="role-button learner" value="Learner" onClick={handleClick}>Learner</button>
                  )}
                  {clicked['Learner'] && <button onClick={handleImage} className="role-picture">Add Profile Image</button>}
                  <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>

              <div className={`${props.mode==="page" ? "button-container" : 'edit-button-container'}`}>
                {preview && clicked['Teammate'] ? (
                  <img alt="preview" src={preview} style={{objectFit: 'cover'}}/>
                  ) : (
                  <button className="role-button teammate" value="Teammate" onClick={handleClick}>Teammate</button>
                )}
                  {clicked['Teammate'] && <button onClick={handleImage} className="button-picture">Add Profile Image</button>}
                  <input type="file" style={{display: "none"}} ref={fileInputRef} accept="image/*"
                onChange={handleChange}/>
              </div>
            </div>
            {props.mode === "page"? (
            <div id="creation-button" className="mt-5">
                <button className="role-submit button button-primary" type="submit">Submit</button>
            </div>
            ):(
            <div id="creation-button">
                <button form='role-form' className="button button-primary form-margin" 
                type="submit">Edit Profile</button>
            </div>
            )}
           
        </form>
      </div>
        
    </div>
  )
}
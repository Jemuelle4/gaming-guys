import CommunicationComponent from '../components/CommunicationComponent'

export default function InGameInfo() {
  return (
    <div>
        <CommunicationComponent/>
        <div className="form-margin creation-button">
              <button form='communication-form' type="submit" className="button button-primary form-margin">
                Create Profile</button>
        </div>
    </div>
  )
}

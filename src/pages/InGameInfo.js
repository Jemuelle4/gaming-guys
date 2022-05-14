import InGameComponent from '../components/InGameComponent'

export default function InGameInfo() {
  return (
    <div>
        <InGameComponent/>
        <div id="creation-button">
          <button form='ingame-form' className="button button-primary form-margin" type="submit">Next</button>
        </div>
    </div>
  )
}

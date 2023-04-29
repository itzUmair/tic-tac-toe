import "../styles/LandingComponent.css";

function LandingComponent() {
  return (
    <div className="landingComponentContainer">
      <h1 className="gameTitle">tic tac toe</h1>
      <div className="buttonContainer">
        <button>new game (vs player)</button>
        <button>new game (vs CPU)</button>
        <button>new game (online)</button>
      </div>
    </div>
  );
}

export default LandingComponent;

import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage({ messageError, paraError, children }) {
  return (
    <>
      <div className="divErrorPage">
        <h2 className="titleErrorPage">Errore: {messageError}</h2>
        <p>{paraError}</p>
        {children}
      </div>
    </>
  );
}

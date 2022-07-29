import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageLoader from "./PageLoader"
import { StoreContext } from "../../store/context"

const TemplateFullHeight = props => {
  const { state } = useContext(StoreContext);
  const { isLoading } = state.generalStates;

  return (
    <div className="page">
      {isLoading && <PageLoader />}
      <Header />
      <div className="page-container-full-height">
        {props.children}
      </div>
      <Footer steps={props.step} />
    </div>
  );
};

export default TemplateFullHeight;



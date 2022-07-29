import React, {useContext} from "react";
import Header from "./CustomHeader";
import Footer from "./Footer";
import PageLoader from "./CustomLoader";
import {StoreContext} from '../../store/context';

const CustomTemplate = props => {
  const {state} = useContext(StoreContext);
  const {isLoading} = state.generalStates;

  return (
    <div className="page">
      {isLoading && <PageLoader/>}
      <Header />
        {/* <div className="page-container"> */}
        <div>
          {props.children}
        </div>
      {/* <Footer steps={props.step} /> */}
    </div>
  );
};

export default CustomTemplate;




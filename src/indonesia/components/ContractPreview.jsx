import React, { useContext } from 'react';
import { StoreContext } from '../../store/context';
import '../sass/contact.scss';

const ContractPreview = ({ html}) => {
  const { state } = useContext(StoreContext);

  return (
    <>
      {
        state.generalStates.contractPreview && <div dangerouslySetInnerHTML={{ __html: state.generalStates.contractPreview }}></div>
      }   
    </>
  );
}

export default ContractPreview;

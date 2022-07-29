import React, { useContext } from 'react';
import _ from 'lodash';
import { getDurationUnit } from '../../utils';
import { StoreContext } from '../../store/context';

const formatter = new Intl.NumberFormat("en-ID", {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

const reg = new RegExp(',', 'g');

const AgreementTerm = ({ duration }) => {
  const { state } = useContext(StoreContext);
  const { financingOption } = state.generalStates;
  const { repayment: { totalRepaymentAmount, netFinancingAmount, serviceFee, insurancePremium, monthlyInterestPercentage, monthlyRepayment} } = state.financialStates;
  const selectedDuration = _.find(financingOption, { 'tenure': parseInt(duration) });

  return (
    <div className="agreement-label">
      <p><b>Period pembayaran:</b> {`${selectedDuration?.tenure || 0} ${getDurationUnit(selectedDuration?.timeUnit || 0)}`} </p>
      <p><b>Jumlah pembayaran:</b> {(formatter.format(totalRepaymentAmount)).replace(reg, ".")}</p>
      <p><b>Dari Boost:</b>{(formatter.format(netFinancingAmount)).replace(reg, ".")}</p>
      <p><b>Pengembalian:</b> “Modal Boost” akan mulai dihitung setelah barang dikirim oleh distributor.</p>
      <p><b>Biaya Pengolahan:</b> {(formatter.format(serviceFee)).replace(reg, ".")}</p>
      {
        monthlyInterestPercentage == 0 || monthlyRepayment == 0 || monthlyRepayment == null || monthlyInterestPercentage == null? null:
        <>
      <p><b>Cicilan Bulanan:</b> {(formatter.format(monthlyRepayment)).replace(reg, ".")}</p>
      <p><b>Bunga Perbulan:</b> {monthlyInterestPercentage}%</p>
      </>
      }
      {(state.generalStates.isInsuranceProduct) && (<p><b>Biaya asuransi:</b> {(formatter.format(insurancePremium)).replace(reg, ".")}</p>)}
    </div>
  );

};
export default AgreementTerm;
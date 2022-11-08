type Patient = {
  patient_id: number;
  reference: string;
  patient_name: string;
  solicitor: string;
};

const PatientCard: React.FunctionComponent<{ patient: Patient }> = ({
  patient,
}) => {
  return (
    <li key={patient.patient_id} className="patient-card">
      <p>{patient.reference}</p>
      <p>{patient.patient_name}</p>
      <p>{patient.solicitor}</p>
    </li>
  );
};

export default PatientCard;

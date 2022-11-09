import { Link } from "react-router-dom";

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
      <Link to={`/patients/${patient.patient_id}`}>
        <p>{patient.reference}</p>
        <p>{patient.patient_name}</p>
        <p>{patient.solicitor}</p>
      </Link>
    </li>
  );
};

export default PatientCard;

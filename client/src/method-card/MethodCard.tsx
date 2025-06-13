import './MethodCard.css';
import type {MethodStep } from '../types/method';


type MethodCardProps = {
  step: MethodStep;
};

function MethodCard({ step }: MethodCardProps) {
  return (
    <div className="method-card-container">
      <h6>{step.heading}</h6>
      <p>{step.body}</p>
    </div>
  );
}

export default MethodCard;
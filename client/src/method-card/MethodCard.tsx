import './MethodCard.css';

type MethodStep = {
  heading: string;
  body: string;
};

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
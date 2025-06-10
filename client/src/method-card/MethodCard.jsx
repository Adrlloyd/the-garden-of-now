import './MethodCard.css';

function MethodCard({step}) {

  return (
    <div className="method-card-container">
        <h6>{step.heading}</h6>
        <p>{step.body}</p>
    </div>
  )
}

export default MethodCard
import Button from 'react-bootstrap/Button';

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="t-large mb-4">Not Found</h2>
      <p className="b-large">Seems that the page you are looking for doesn't exist</p>
      <Button href="/" variant="primary">Return Home</Button>
    </div>
  );
}

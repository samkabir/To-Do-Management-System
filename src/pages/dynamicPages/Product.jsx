import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Product ID: {id}</h1>;
}
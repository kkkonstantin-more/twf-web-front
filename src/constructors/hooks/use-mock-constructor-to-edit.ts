import { useParams } from "react-router-dom";

const useMockConstructorToEdit = <T>(mockData: {
  [key: string]: T;
}): T | undefined => {
  const { code } = useParams();
  return mockData[code];
};

export default useMockConstructorToEdit;

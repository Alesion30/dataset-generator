import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useMutation } from "react-query";
import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";

export const RegisterPersonPage = () => {
  const mutation = useMutation({
    mutationFn: async (data: Person) => {
      await addDoc(collection(db, "people"), data);
    },
  });

  const onSubmit = (data: Person) => {
    mutation.mutate(data);
  };

  return <PersonForm onSubmit={onSubmit} disabled={mutation.isLoading} />;
};

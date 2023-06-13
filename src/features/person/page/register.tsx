import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useMutation } from "react-query";
import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";
import { useRouter } from "next/router";

export const RegisterPersonPage = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Person) => {
      await addDoc(collection(db, "people"), data);
    },
    onSuccess: () => {
      router.push("/person");
    },
  });

  const onSubmit = (data: Person) => {
    mutation.mutate(data);
  };

  return <PersonForm onSubmit={onSubmit} disabled={mutation.isLoading} />;
};

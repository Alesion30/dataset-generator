import { db } from "@/lib/firebase";
import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { Person, personSchema } from "../schemas";
import { PersonForm } from "../components/PersonForm";

type UpdatePersonPageProps = {
  id: string;
};

export const UpdatePersonPage = ({ id }: UpdatePersonPageProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const snap = await getDoc(doc(collection(db, "people"), id));
      const person = personSchema.parse(snap.data());
      return person;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Person) => {
      await updateDoc(doc(collection(db, "people"), id), data);
    },
  });

  const onSubmit = (data: Person) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <PersonForm
      isUpdate={true}
      defaultValue={data}
      onSubmit={onSubmit}
      disabled={mutation.isLoading}
    />
  );
};

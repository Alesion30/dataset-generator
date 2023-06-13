import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Person, personSchema } from "../schemas";

const peopleCollection = collection(db, "people");

export const personApi = {
  fetchAll: async () => {
    const snap = await getDocs(peopleCollection);
    const people = snap.docs.map((doc) => ({
      id: doc.id,
      ...personSchema.parse(doc.data()),
    }));
    return people;
  },
  fetchById: async (id: string) => {
    const snap = await getDoc(doc(peopleCollection, id));
    const person = personSchema.parse(snap.data());
    return person;
  },
  create: async (person: Person) => {
    const ref = await addDoc(peopleCollection, person);
    return {
      id: ref.id,
      ...person,
    };
  },
  update: async (id: string, person: Person) => {
    await updateDoc(doc(peopleCollection, id), person);
    return {
      id,
      ...person,
    };
  },
  delete: async (id: string) => {
    await deleteDoc(doc(peopleCollection, id));
    return;
  },
};

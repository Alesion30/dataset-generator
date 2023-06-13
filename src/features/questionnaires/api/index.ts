import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Questionnaire, questionnaireSchema } from "../schemas";

const questionnairesCollection = collection(db, "questionnaires");

export const questionnaireApi = {
  fetchAll: async () => {
    const snap = await getDocs(questionnairesCollection);
    const people = snap.docs.map((doc) => ({
      id: doc.id,
      ...questionnaireSchema.parse(doc.data()),
    }));
    return people;
  },
  fetchById: async (id: string) => {
    const snap = await getDoc(doc(questionnairesCollection, id));
    const person = questionnaireSchema.parse(snap.data());
    return person;
  },
  create: async (questionnaire: Questionnaire) => {
    const ref = await addDoc(questionnairesCollection, questionnaire);
    return {
      id: ref.id,
      ...questionnaire,
    };
  },
  update: async (id: string, questionnaire: Questionnaire) => {
    await updateDoc(doc(questionnairesCollection, id), questionnaire);
    return {
      id,
      ...questionnaire,
    };
  },
};

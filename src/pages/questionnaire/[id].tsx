import { UpdateQuestionnairePage } from "@/features/questionnaire/page/update";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return <UpdateQuestionnairePage id={router.query.id as string} />;
};
export default Page;

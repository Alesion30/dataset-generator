import { UpdatePersonPage } from "@/features/person/page/update";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return <UpdatePersonPage id={router.query.id as string} />;
};
export default Page;

import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR<{ message: string }, any, string>(
    "/api/hello",
    async (key) => {
      const res = await fetch(key);
      return await res.json();
    }
  );

  if (isLoading) return <p>Loading...</p>;
  return <p>{data?.message}</p>;
}

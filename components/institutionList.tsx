import { Institution } from "@/utils/db/types";
import useDebounce from "@/utils/hooks/use-debounce";
import { useEffect, useState } from "react";
import useSWR from "swr";
import InstitutionCard, { LoadingCard } from "./institutionCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InstitutionList = ({ searchContent }: { searchContent: string }) => {
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const debounce = useDebounce(searchContent, 500);

  const { data, isLoading, error } = useSWR(
    searchContent && debounce
      ? `/api/academics/search?page=${page}&pageSize=10&search=${searchContent}`
      : null,
    fetcher
  );

  useEffect(() => {
    console.log(data);
    if (!data || (data as any).error || error) {
      console.log(data);
      return;
    }

    if (page === 1) {
      setInstitutions(data);
    } else {
      setInstitutions([...institutions, ...data]);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [searchContent]);

  const handleScroll = (e: any) => {
    const bottom =
      Math.round(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (
      bottom &&
      !(data as any).error &&
      (!data || (data as Institution[]).length !== 0) &&
      !isLoading
    ) {
      setPage(page + 1);
    }
  };
  return (
    <div
      className={`overflow-y-scroll scrollbar-none transition-[height] duration-500 ease-in-out w-full${
        searchContent ? " h-[80vh]" : " h-0"
      }`}
      onScroll={(e) => handleScroll(e)}
    >
      {institutions.map((institution) => (
        <InstitutionCard institution={institution} key={institution.id} />
      ))}
      {isLoading && <LoadingCard />}
    </div>
  );
};

export default InstitutionList;

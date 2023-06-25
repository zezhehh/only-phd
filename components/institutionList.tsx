import { Institution } from "@/utils/db/types";
import useDebounce from "@/utils/hooks/use-debounce";
import { useEffect, useState } from "react";
import useSWR from "swr";
import InstitutionCard, { LoadingCard } from "./institutionCard";

const fetcher = (
  search: string,
  countries: string[],
  page: number,
  pageSize: number = 10
) =>
  fetch("/api/academics/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page,
      pageSize,
      search,
      countries,
    }),
  })
    .then((res) => res.json())
    .catch((e) => []);

const InstitutionList = ({
  searchContent,
  filterCountries,
}: {
  searchContent: string;
  filterCountries: string[];
}) => {
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const debounce = useDebounce(searchContent, 500);

  const { data, isLoading, error } = useSWR(
    filterCountries.length !== 0 || (searchContent && debounce)
      ? [searchContent, filterCountries, page]
      : null,
    ([search, countries, page]) => fetcher(search, countries, page)
  );

  useEffect(() => {
    if (!data || (data as any).error || error) {
      return;
    }

    console.log(data);

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
        institutions.length !== 0 ? " h-[80vh]" : " h-0"
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

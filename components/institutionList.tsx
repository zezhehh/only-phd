import React, { useEffect, useRef, useState } from "react";
import InstitutionCard, { LoadingCard } from "./institutionCard";
import { Institution } from "@/utils/db/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InstitutionList = ({ searchContent }: { searchContent: string }) => {
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const { data, error, isLoading } = useSWR(
    `/api/academics?page=${page}&pageSize=10&search=${searchContent}`,
    fetcher
  );
  useEffect(() => {
    if (!data) {
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
    if (bottom && (!data || data.length !== 0) && !isLoading) {
      setPage(page + 1);
    }
  };
  return (
    <div
      className="h-[80vh] overflow-y-scroll scrollbar-none transition ease-in-out w-full"
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

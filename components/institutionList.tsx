import React, { useEffect, useRef, useState } from "react";
import InstitutionCard from "./institutionCard";
import { Institution } from "@/utils/db/types";
const InstitutionList = ({ searchContent }: { searchContent: string }) => {
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const fetchData = async () => {
    const response = await fetch(
      `/api/academics?page=${page}&pageSize=10&search=${searchContent}`
    );
    const responseJson = await response.json();
    setInstitutions([...institutions, ...responseJson]);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setInstitutions([]);
  }, [searchContent]);

  useEffect(() => {
    if (institutions.length !== 0) return;
    fetchData();
    if (page === 1) {
      fetchData();
    } else {
      setPage(1);
    }
  }, [institutions]);

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
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
    </div>
  );
};

export default InstitutionList;

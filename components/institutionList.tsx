import React, { useEffect, useRef } from "react";

const InstitutionList = () => {
  const [page, setPage] = React.useState(1);
  const [institutions, setInstitutions] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/academics/?page=${page}`);
      const responseJson = await response.json();
      setInstitutions(responseJson);
      console.log(responseJson)
    }
    fetchData();

  }, [])
  return <div>Institution list: {JSON.stringify(institutions)}</div>;
};

export default InstitutionList;

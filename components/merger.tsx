import { Institution } from "@/utils/db/types";
import { tokenAtom } from "@/utils/states";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SuccessAlert } from "./alerts";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data: Institution[]) => (data.length == 1 ? data[0] : null));

const Merger = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [token] = useAtom(tokenAtom);
  const [merged, setMerged] = useState(false);

  const { data: institution1 } = useSWR<Institution | null>(
    `/api/academics?page=1&&name=${name1}`,
    fetcher
  );
  const { data: institution2 } = useSWR<Institution | null>(
    `/api/academics?page=1&&name=${name2}`,
    fetcher
  );

  const onMerge = async () => {
    if (!institution1 || !institution2) return;
    const resp = await fetch(
      `/api/academics/merge?id1=${institution1.id}&id2=${institution2.id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    if (resp.status === 200) {
      setMerged(true);
    }
  };

  useEffect(() => {
    setMerged(false);
  }, [name1, name2]);

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <p>Input the full names of two institutions you wanna merge.</p>
      <input
        type="text"
        placeholder="Full name of the first institution"
        className="input input-bordered w-full max-w-xs mt-5"
        onChange={(e) => setName1(e.target.value)}
        value={name1}
      />
      <input
        type="text"
        placeholder="Full name of the second institution"
        className="input input-bordered w-full max-w-xs mt-5"
        onChange={(e) => setName2(e.target.value)}
        value={name2}
      />
      <button
        className={`btn w-full max-w-xs my-5${
          !institution1 || !institution2 || institution1.id === institution2.id
            ? " btn-disabled"
            : ""
        }`}
        onClick={onMerge}
      >
        Merge
      </button>

      {institution1 && (
        <div>
          ID found: {institution1.id}, {institution1.name}
        </div>
      )}
      {institution2 && (
        <div>
          ID found: {institution2.id}, {institution2.name}
        </div>
      )}
      {institution1 && institution2 && institution1.id === institution2.id && (
        <div>Make sure they are not the same institution</div>
      )}
      {merged && <SuccessAlert info="Successfully merged!" />}
    </div>
  );
};

export default Merger;

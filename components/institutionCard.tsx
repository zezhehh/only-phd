import React, { useEffect, useRef, useState } from "react";
import { Institution } from "@/utils/db/types";
import { useAtom } from "jotai";
import { curPlaceAtom, isAdminAtom } from "@/utils/states";
import { useHoverDirty } from "react-use";

export const LoadingCard = () => {
  return (
    <div className="card w-full glass mb-5">
      <div className="card-body flex justify-around items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </div>
  );
};

const ErrorAlert = ({ err }: { err: string }) => (
  <div className="alert alert-error w-4/5 mt-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{err}</span>
  </div>
);

const InstitutionCard = ({ institution }: { institution: Institution }) => {
  const [, setPlaceName] = useAtom(curPlaceAtom);
  const [isAdmin] = useAtom(isAdminAtom);
  const [website, setWebsite] = useState("");
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [err, setErr] = useState("");

  const self = useRef<HTMLDivElement>(null);

  const isHovered = useHoverDirty(self);
  useEffect(() => {
    if (isHovered) {
      // setPlaceName(institution.name);
    }
  }, [isHovered]);

  useEffect(() => {
    setWebsite(institution.website);
  }, []);

  const onUpdate = async () => {
    setUpdating(true);
    try {
      const resp = await fetch(`/api/academics/${institution.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website,
        }),
      });
      if (resp.status === 200) {
        setOpen(false);
        setErr("");
        setUpdating(false);
        setUpdated(true);
        return;
      }
      const err = await resp.json();
      setErr(err.error);
    } catch {
      setErr("Something went wrong");
    }
    setUpdating(false);
  };

  if (!institution) return null;

  return (
    <div className="card w-full glass mb-5" ref={self}>
      <div className="card-body">
        <h2 className="card-title mb-3">{institution.name}</h2>
        <div className="flex justify-around	 items-center mb-3">
          <div className="tooltip" data-tip="QS Score">
            <div
              className="radial-progress  bg-secondary text-primary border-4 border-secondary"
              // @ts-ignore
              style={{ "--value": institution.qsScore }}
            >
              {institution.qsScore}
            </div>
          </div>
          <div className="tooltip" data-tip="Times Score">
            <div
              className="radial-progress bg-secondary text-primary border-4 border-secondary"
              // @ts-ignore
              style={{ "--value": institution.timesScore }}
            >
              {institution.timesScore}
            </div>
          </div>
        </div>
        <div className="card-actions justify-end">
          {isAdmin && (
            <button
              className="btn btn-warning w-full"
              onClick={() => setOpen(true)}
            >
              Edit (Admin only)
            </button>
          )}
          <div className="flex flex-row justify-between items-stretch w-full">
            <a
              href={updated ? website : institution.website}
              target="_blank"
              className="btn btn-accent w-[calc(50%_-_1.25rem/2)]"
            >
              Go to the site!
            </a>
            <button
              className="btn btn-accent w-[calc(50%_-_1.25rem/2)]"
              onClick={() => setPlaceName(institution.name)}
            >
              Fly to
            </button>
          </div>
        </div>
      </div>

      <dialog className={`card modal${open ? " modal-open" : ""}`}>
        <div className="modal-box flex flex-col justify-center items-center">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Institution website"
            className="input input-bordered w-4/5"
          />
          <button
            className={`btn btn-accent w-4/5 mt-5${
              updating ? " btn-disabled" : ""
            }`}
            onClick={onUpdate}
          >
            {updating && <span className="loading loading-spinner"></span>}
            Update
          </button>
          {err && <ErrorAlert err={err} />}
        </div>
      </dialog>
    </div>
  );
};

export default InstitutionCard;

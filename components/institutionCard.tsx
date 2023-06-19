import React from "react";
import { Institution } from "@/utils/db/types";

const InstitutionCard = ({ institution }: { institution: Institution }) => {
  if (!institution) return null;
  return (
    <div className="card w-full glass mb-5">
      <div className="card-body">
        <h2 className="card-title mb-3">{institution.name}</h2>
        <div className="flex justify-around	 items-center mb-3">
          <div className="tooltip" data-tip="QS Score">
            <div
              className="radial-progress  bg-secondary text-primary border-4 border-secondary"
              style={{ "--value": institution.qsScore }}
            >
              {institution.qsScore}
            </div>
          </div>
          <div className="tooltip" data-tip="Times Score">
            <div
              className="radial-progress bg-secondary text-primary border-4 border-secondary"
              style={{ "--value": institution.timesScore }}
            >
              {institution.timesScore}
            </div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full">Go to the site!</button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;

import { SuccessSVG } from "./svgs";

export const SuccessAlert = ({ info }: { info: string }) => (
  <div className="alert alert-success w-full max-w-xs mt-5">
    <SuccessSVG />
    <span>{info}</span>
  </div>
);

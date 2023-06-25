"use client";

import { isAdminAtom, tokenAtom } from "@/utils/states";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";
import { adminFetcher } from "./admin";
import Map from "./map";
import countryMapping from "@/utils/countries";

import InstitutionList from "./institutionList";
import { CloseSVG } from "./svgs";

const TIPS = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="alert alert-accent mb-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {children}
    </div>
  );
};

const Panel = () => {
  const [searchContent, setSearchContent] = useState("");
  const [, setIsAdmin] = useAtom(isAdminAtom);
  const [token] = useAtom(tokenAtom);
  const { data } = useSWR(token, adminFetcher);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [data]);

  const onClickCountry = useCallback(
    (countryCode: string, ctrlKey: boolean) => {
      const country = countryCode.toUpperCase();
      if (badges.includes(country)) {
        return;
      }
      if (ctrlKey) {
        setBadges((prevBadges) => [...prevBadges, country]);
        console.log(`added country ${country}`);
      } else {
        setBadges([country]);
        console.log(`clicked country ${country}`);
      }
    },
    [badges]
  );

  return (
    <div className="relative w-screen h-screen snap-center">
      <div className="absolute w-1/3 h-screen overflow-hidden p-16 pr-3 flex flex-col justify-center items-center invisilbe xl:visible">
        <div className="w-full">
          {searchContent && (
            <TIPS>
              <span>TIPS: Scroll down to load more</span>
            </TIPS>
          )}
          {badges.length !== 0 && (
            <TIPS>
              <span>
                TIPS: Click with <kbd className="kbd">ctrl</kbd> to add
                countries
              </span>
            </TIPS>
          )}
          <div className="mb-2">
            {badges.map((badge, index) => (
              <div key={index} className="badge badge-info gap-2 mr-2">
                <button
                  onClick={() => {
                    setBadges((prevBadges) =>
                      prevBadges.filter((b) => b !== badge)
                    );
                  }}
                >
                  <CloseSVG />
                </button>
                {badge} {countryMapping.get(badge)}
              </div>
            ))}
          </div>
          <input
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            type="text"
            placeholder="Search with institution names and/or subjects"
            className="input input-bordered input-primary w-full mb-5"
          />
        </div>
        <InstitutionList
          searchContent={searchContent}
          filterCountries={badges}
        />
      </div>
      <Map onClickCountry={onClickCountry} />
    </div>
  );
};

export default Panel;

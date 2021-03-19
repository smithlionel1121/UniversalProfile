import React from "react";

import LSP3ProfileCard from "./LSP3ProfileCard";
import ERC725Account from "../ERC725Account";

export function ProfileFilter({ profileData, blockie, filterAnon }) {
  const profile = !profileData?.anon ? (
    <LSP3ProfileCard LSP3Profile={profileData} blockie={blockie} />
  ) : filterAnon ? null : (
    <LSP3ProfileCard LSP3Profile={profileData} blockie={blockie} />
  );
  return profile;
}

const FilteredLSP3Profiles = ERC725Account(ProfileFilter);

export default FilteredLSP3Profiles;

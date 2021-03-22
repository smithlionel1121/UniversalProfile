import React from "react";

import LSP3ProfileCard from "./LSP3ProfileCard";
import useLSP3Profile from "../../Hooks/useLSP3Profile";
import makeBlockie from "ethereum-blockies-base64";

export function ProfileFilter({ address, filterAnon }) {
  const [account, contractFound, profileData] = useLSP3Profile(address);
  const blockie = makeBlockie(address);

  const profile = !profileData?.anon ? (
    <LSP3ProfileCard LSP3Profile={profileData} blockie={blockie} />
  ) : filterAnon ? null : (
    <LSP3ProfileCard LSP3Profile={profileData} blockie={blockie} />
  );
  return profile;
}

export default ProfileFilter;

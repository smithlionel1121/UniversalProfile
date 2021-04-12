import makeBlockie from "ethereum-blockies-base64";
import React from "react";

import useLSP3Profile from "../../Hooks/useLSP3Profile";
import LSP3ProfileCard from "./LSP3ProfileCard";

export function ProfileFilter({ address, filterAnon }) {
  const [, , profileData] = useLSP3Profile(address);
  const blockie = makeBlockie(address);

  if (!filterAnon || !profileData?.anon)
    return <LSP3ProfileCard LSP3Profile={profileData} blockie={blockie} />;

  return null;
}

export default ProfileFilter;

import { RESTDataSource } from "apollo-datasource-rest";

export class ProfileProvider extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://universal-profile-relayer-dot-universal-profiles.ey.r.appspot.com";
  }

  profileReducer(profile) {
    return {
      id: `${profile.username}${profile.address}`,
      username: profile.username,
      address: profile.address,
      timestamp: profile.timestamp,
    };
  }

  async getAllDesigners() {
    const res = await this.get("/profile-index-designers");
    return Array.isArray(res)
      ? res.map(profile => this.profileReducer(profile))
      : [];
  }

  async getAllProfiles() {
    const res = await this.get("/profile-index");
    return Array.isArray(res)
      ? res.map(profile => this.profileReducer(profile))
      : [];
  }
}
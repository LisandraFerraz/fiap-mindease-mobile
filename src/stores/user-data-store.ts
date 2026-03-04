import { create } from "zustand";
import { IaccessTokens, UserData } from "../utils/models/user-model";

interface IUserDataStore {
  tokens: IaccessTokens;
  userInfo: UserData;
}

interface UserDataStore extends IUserDataStore {
  setUserData: (userData: IUserDataStore) => void;
}

const UserDataStore = create<UserDataStore>((set) => ({
  tokens: {
    accessToken: "",
    platToolsId: "",
    usuarioId: "",
  },
  userInfo: {
    nome: "",
  },
  setUserData: (userData) =>
    set(() => ({ tokens: userData.tokens, userInfo: userData.userInfo })),
}));

export default UserDataStore;

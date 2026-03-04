import { create } from "zustand";
import { IaccessTokens, UserData } from "../utils/models/user-model";
import { persist } from "zustand/middleware";

interface IUserDataStore {
  tokens: IaccessTokens;
  userInfo: UserData;
}

type UserDataStore = {
  userData: IUserDataStore;
  setUserData: (userData: IUserDataStore) => void;
};

const UserDataStore = create<UserDataStore>((set) => ({
  userData: {
    tokens: {
      accessToken: "",
      platToolsId: "",
      usuarioId: "",
    },
    userInfo: {
      nome: "",
    },
  },
  setUserData: (userData: IUserDataStore) => set(() => ({ userData })),
}));

// const UserDataStore = create<UserDataStore>()(
//   persist(
//     (set, get) => ({
//       userData: {
//         tokens: {
//           accessToken: "",
//           platToolsId: "",
//           usuarioId: "",
//         },
//         userInfo: {
//           nome: "",
//         },
//       },
//       setUserData: (userData: IUserDataStore) => set(() => ({ userData })),
//     }),
//     {
//       name: "user-data-store",
//     },
//   ),
// );

export default UserDataStore;

import { createSelector } from "reselect";
import { UsersState } from "./reactiveVar";

const getUsersState = (state: UsersState) => state.users;

export const selectFirstName = createSelector(
  getUsersState,
  (users) => users.byId["user1"].name
);

export const selectSurname = createSelector(
  getUsersState,
  (users) => users.byId["user2"].name
);

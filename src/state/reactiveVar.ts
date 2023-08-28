import { makeVar, useReactiveVar } from "@apollo/client";
import { produce } from "immer";

export function updateUserName(userId: string, newName: string) {
  const currentState = testVar();

  const newState = produce(currentState, (draft) => {
    if (draft.users.byId[userId]) {
      draft.users.byId[userId].name = newName;
    }
  });

  testVar(newState);
}

export type User = {
  id: string;
  name: string;
  profile: {
    age: number;
    location: {
      city: string;
      state: string;
    };
    interests: string[];
  };
};

export type UsersState = {
  users: {
    byId: Record<string, User>;
    allIds: string[];
  };
};

const testVar = makeVar<UsersState>({
  users: {
    byId: {
      user1: {
        id: "user1",
        name: "Alice",
        profile: {
          age: 25,
          location: {
            city: "New York",
            state: "NY",
          },
          interests: ["reading", "hiking"],
        },
      },
      user2: {
        id: "user2",
        name: "Bob",
        profile: {
          age: 30,
          location: {
            city: "Los Angeles",
            state: "CA",
          },
          interests: ["cycling", "photography"],
        },
      },
    },
    allIds: ["user1", "user2"],
  },
});

export function useSelectedData<T>(selector: (data: UsersState) => T): T {
  const fullData = useReactiveVar(testVar);
  return selector(fullData);
}

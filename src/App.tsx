import { updateUserName, useSelectedData } from "./state/reactiveVar";
import { selectFirstName } from "./state/selectors";

const TestVarComp: React.FC = () => {
  const firstName = useSelectedData(selectFirstName);

  console.log("TestVarComp rendered");

  return <div>First Name: {firstName}</div>;
};

const TestVarComp2: React.FC = () => {
  const surname = useSelectedData((state) => state.users.byId["user2"].name);
  const handleUpdate = () => {
    updateUserName("user2", "NewName");
  };
  return (
    <div>
      <button onClick={handleUpdate}>Update Name</button>
      <div>Surname: {surname}</div>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Hello, Apollo!</h1>
      <TestVarComp />
      <TestVarComp2 />
    </div>
  );
}

export default App;

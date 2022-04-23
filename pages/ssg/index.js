import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useFromApi from "../../hooks/useFromApi";
import useResourceMapper from "../../hooks/useResourceMapper";
import fromApi from "../../store/actions/fromApi";

const SsgPage = ({ users, error }) => {
  const globalState = useSelector((state) => state.counter.counter);

  const dispatch = useDispatch();

  return (
    <>
      <h1>SSG</h1>
      <h4>global counter {globalState}</h4>
      <button
        onClick={() =>
          dispatch({
            type: "counter/increment",
            payload: globalState,
          })
        }
      >
        incr
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "counter/decrement",
            payload: globalState,
          })
        }
      >
        decr
      </button>
      {error && <div>error occurred</div>}
      {!error && users && (
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>email</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={idx}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const fetchData = async () =>
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => ({
      error: false,
      users: res.data,
    }))
    .catch(() => ({
      error: true,
      users: null,
    }));

const FetchDataThunk = async () => {
  const usersApi = await useFromApi(fromApi.getUsers(), []);
  return await useResourceMapper("users", usersApi.sortOrder);
};

export const getStaticProps = async () => {
  // using axios
  const users = await fetchData();
  // somehow still not working
  // const users = await fetchDataThunk();
  return {
    props: users,
  };
};
export default SsgPage;

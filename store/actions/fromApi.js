import buildQueryStr from "../../utils/buildQueryStr";
import {
  ACTION_TYPES,
  HTTP_METHODS,
  makeApiRequestThunk,
} from "./makeApiRequest";

class ApiCallActionCreator {
  login(emailOrUsername, password) {
    return makeApiRequestThunk(
      HTTP_METHODS.POST,
      `/auth/login`,
      {
        username: emailOrUsername,
        password,
      },
      ACTION_TYPES.MERGE
    );
  }

  getSomething(query) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      buildQueryStr(`/something`, query),
      null,
      ACTION_TYPES.MERGE
    );
  }

  getUsers(query) {
    return makeApiRequestThunk(
      HTTP_METHODS.GET,
      buildQueryStr("https://jsonplaceholder.typicode.com/users", query),
      null,
      ACTION_TYPES.MERGE
    );
  }
}

const fromApi = new ApiCallActionCreator();

export default fromApi;

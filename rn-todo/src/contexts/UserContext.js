import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// UserContext.Consumer
const UserContext = createContext();

// UserContext.Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

// 커스텀 HOOK
// useContext()를 사용할떄마다 파라미터 UserContext를 계속 보내야 한다는것이 마음에 안듦
// => 따라서 커스텀 훅을 만들어서 따로 사용한다.
export const useUserContext = () => useContext(UserContext);

export default UserContext;

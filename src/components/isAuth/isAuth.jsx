import { Navigate, Route } from "react-router-dom";

function PrivateRoute({ path, element , ...rest }) {
  let hasToken = true; // Здесь должна быть логика проверки наличия токена

  if (hasToken) {
    return <Route path={path} element={element} />;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;
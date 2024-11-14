// ProtectedRoute.tsx
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Ajustez en fonction de votre structure de store

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  requiredRoles: string[];
  path: string;
}

function ProtectedRoute({
  component: Component,
  requiredRoles,
  path,
  ...rest
}: ProtectedRouteProps) {
  // Typage du sélecteur pour récupérer les informations d'authentification de l'utilisateur
  const { isAuthenticated, user } = useSelector(
    (state: typeof RootState) => state.auth,
  );

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!requiredRoles.includes(user.role)) {
    navigate('/unauthorized');
    return null;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route path={path} element={<Component {...rest} />} />;
}

export default ProtectedRoute;

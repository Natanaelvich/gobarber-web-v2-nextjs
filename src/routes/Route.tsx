import React from 'react';
import {
  Route as RouteReactRouter,
  RouteProps as RoutePropsReactRouter,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/modules/AuthContext';

interface RouteProps extends RoutePropsReactRouter {
  component: React.ComponentType;
  isPrivate?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <RouteReactRouter
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

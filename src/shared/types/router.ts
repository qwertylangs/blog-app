import { RouteProps } from 'react-router-dom';

// eslint-disable-next-line qwerty-path-plugin/layer-fsd-imports
import { UserRole } from '@/entities/User';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

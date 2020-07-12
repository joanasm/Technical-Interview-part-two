import { createSelector } from 'reselect';

export const getUserByIdSelector = createSelector(
  (state, props) => props.userId,
  (state) => state.users,
  (userId, users) => users[userId]
);

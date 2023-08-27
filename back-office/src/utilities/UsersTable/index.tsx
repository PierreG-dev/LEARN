import React, { useCallback, useState } from 'react';
import { ActiveUserData, User } from '../../types';
import './index.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import iconGenerator from '../iconGenerator';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts';
import { BsDot } from 'react-icons/bs';

type ISortType = 'name' | 'roles' | 'status' | 'timestamp';

type IProps = {
  users?: User[];
  avatar?: boolean;
  name?: boolean;
  roles?: boolean;
  status?: boolean;
  timestamp?: boolean;
  actions?: boolean;
};

const UsersTable: React.FC<IProps> = ({
  users = [],
  avatar = false,
  name = false,
  roles = false,
  status = false,
  timestamp = false,
  actions = false,
}) => {
  const [sortType, setSortType] = useState<ISortType>('status');
  const activeUsers = useSelector((state: RootState) => state.data.activeUsers);

  const usersSorter = useCallback(
    (sortType: ISortType) => {
      return (userA: User, userB: User) => {
        switch (sortType) {
          case 'name':
            if (userA.username > userB.username) return 1;
            else if (userA.username === userB.username) return 0;
            else return -1;
            break;

          case 'roles':
            if (userA.roles?.includes('admin')) return 0;
            else if (userA.roles?.includes('teacher')) return 1;
            else if (userA.roles?.includes('delegate')) return 2;
            else if (userA.roles?.includes('student')) return 3;
            else return -1;
            break;

          case 'status':
            // Si les 2 utilisateurs sont connectés (on fait en fonction du role)
            if (
              activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userA._id
              ) &&
              activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userB._id
              )
            ) {
              if (userA.roles?.includes('admin')) return 0;
              else if (userA.roles?.includes('teacher')) return 1;
              else if (userA.roles?.includes('delegate')) return 2;
              else if (userA.roles?.includes('student')) return 3;
            }
            // Si le 1er utilisateur est connecté
            else if (
              !activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userA._id
              ) &&
              activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userB._id
              )
            )
              return 1;
            // Si le 2e utilisateur est connecté
            else if (
              activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userA._id
              ) &&
              !activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userB._id
              )
            )
              return -1;
            // Si les deux utilisateurs sont déconnectés (on fait en fonction de la date d'activité)
            else if (
              !activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userA._id
              ) &&
              !activeUsers?.some(
                (userItem: ActiveUserData) => userItem.id === userB._id
              )
            )
              return userA.lastActivity && userB.lastActivity
                ? userA.lastActivity >= userB.lastActivity
                  ? 0
                  : 1
                : 1;
            else return 0;
            break;

          case 'timestamp':
            if (userA.timestamp > userB.timestamp) return 1;
            else if (userA.timestamp < userB.timestamp) return -1;
            else return 0;
            break;

          default:
            return 0;
            break;
        }
      };
    },
    [activeUsers]
  );

  const avatarPicker = useCallback(
    (user: User) => <img src={`${user.avatarUrl}`} alt={user.login} />,
    []
  );

  const rolePicker = useCallback((user: User) => {
    if (user.roles?.includes('admin')) return 'Administrateur';
    else if (user.roles?.includes('teacher')) return 'Enseignant';
    else if (user.roles?.includes('delegate')) return 'Délégué';
    else if (user.roles?.includes('student')) return 'Étudiant';
  }, []);

  // ---
  const statusPicker = useCallback(
    (user: User) => {
      if (
        activeUsers?.some(
          (userItem: ActiveUserData) => user._id === userItem.id
        )
      )
        return (
          <>
            <div className="row">
              <BsDot style={{ color: 'green', opacity: 0.6 }} />
              {' Connecté'}
            </div>
          </>
        );
      else
        return (
          <>
            <div className="row">
              <BsDot style={{ color: 'orangered', opacity: 0.6 }} />
              {' Déconnecté'}
            </div>
            <em className="learn-note">
              Dernière connection {moment(user.lastActivity).fromNow()}{' '}
            </em>
          </>
        );
      return;
    },
    [activeUsers]
  );

  const signupDatePicker = useCallback((user: User) => {
    return (
      <>
        {new Date(user.timestamp).toLocaleDateString('fr')}
        <br />
        <em className="learn-note">{moment(user.timestamp).fromNow()}</em>
      </>
    );
  }, []);

  return (
    <table id="users_table">
      <thead>
        <tr>
          {avatar && <th className="avatar">Avatar</th>}
          {name && <th className="name">Nom</th>}
          {roles && <th className="role">Rôles</th>}
          {status && <th className="status">Statut</th>}
          {timestamp && <th className="signup">Date d'inscription</th>}
          {actions && <th className="actions">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 ? (
          users
            ?.slice()
            .sort(usersSorter(sortType))
            .map((user: User) => (
              <>
                <tr key={user._id}>
                  {avatar && <td className="avatar">{avatarPicker(user)}</td>}
                  {name && (
                    <td className="name">
                      {user.login}
                      <br />
                      <em className="learn-note">{user.username}</em>
                    </td>
                  )}
                  {roles && <td className="role">{rolePicker(user)}</td>}
                  {status && <td className="status">{statusPicker(user)}</td>}
                  {timestamp && (
                    <td className="signup">{signupDatePicker(user)}</td>
                  )}
                  {actions && (
                    <td className="actions">
                      <div className="row">
                        <Link to={`/users/${user._id}`}>
                          {iconGenerator('AiFillEye')}
                        </Link>
                      </div>
                    </td>
                  )}
                </tr>
              </>
            ))
        ) : (
          <tr>
            <td>
              {' '}
              <em className="learn-note">La classe est vide</em>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import { RootState } from '../store/index.ts';
import { useSelector } from 'react-redux';
import useError from './useError.ts';

const useRequests = () => {
  const [pendingRequest, setPendingRequest] = useState<boolean>(false);
  const [data, setData] = useState<any>('');
  const connectionToken = useSelector((state: RootState) => state.auth.token);
  const errorHandler = useError();

  const enablePending = useCallback(() => setPendingRequest(true), []);
  const disablePending = useCallback(() => setPendingRequest(false), []);

  const statusIcon = useMemo(() => {
    if (pendingRequest)
      return (
        <StatusIcon>
          <AiOutlineReload
            style={{ animation: '0.3s rotate linear infinite' }}
          />
        </StatusIcon>
      );
    else if (data === '') return <StatusIcon />;
    else if (data === 'Error')
      return (
        <StatusIcon>
          <FaTimes style={{ color: 'orangered', opacity: 0.7 }} />
        </StatusIcon>
      );
    else
      return (
        <StatusIcon>
          <FaCheck style={{ color: 'green', opacity: 0.7 }} />
        </StatusIcon>
      );
  }, [data, pendingRequest]);

  const fetchToAPI = useCallback(
    (endpoint: string, method: 'POST' | 'PUT' | 'DELETE', body: object) => {
      errorHandler.disableError();
      enablePending();
      setData('fetching...');
      fetch(`${import.meta.env.VITE_APP_API_URL}${endpoint}`, {
        method: method,
        headers: {
          'content-type': 'application/json',
          Authorization: `${connectionToken}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.code !== 200) {
            errorHandler.changeErrorMsg(data.msg);
            throw new Error(data.msg);
          }
          setTimeout(() => {
            disablePending();
            setData(data);
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            disablePending();
            errorHandler.enableError();
            setData('Error');
          }, 1000);
        });
    },
    [disablePending, enablePending, connectionToken, errorHandler]
  );

  const fetchFromAPI = useCallback(
    (endpoint: string) => {
      errorHandler.disableError();
      enablePending();
      fetch(`${import.meta.env.VITE_APP_API_URL}${endpoint}`, {
        headers: {
          Authorization: `${connectionToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.code !== 200) {
            errorHandler.changeErrorMsg(data.msg);
            throw new Error(data.msg);
          }
          setTimeout(() => {
            disablePending();
            errorHandler.enableError();
            setData(data);
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            disablePending();
            setData('Error');
          }, 1000);
        });
    },
    [disablePending, enablePending, connectionToken, errorHandler]
  );

  return {
    pendingRequest,
    statusIcon,
    data,
    fetchFromAPI,
    fetchToAPI,
    errorHandler,
  };
};

const StatusIcon = styled.div`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default useRequests;

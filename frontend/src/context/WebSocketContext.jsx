import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);
  const [toasts, setToasts] = useState([]);
  const stompClientRef = useRef(null);
  const eventListenersRef = useRef([]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (stompClientRef.current) {
        try { stompClientRef.current.disconnect(); } catch(e){}
        stompClientRef.current = null;
      }
      setConnected(false);
      return;
    }

    const socket = new SockJS('/ws-taskmanager');
    const client = Stomp.over(socket);
    client.debug = null; // Disable noisy console logs

    client.connect(
      {},
      () => {
        setConnected(true);
        stompClientRef.current = client;

        client.subscribe('/topic/tasks', (message) => {
          try {
            const event = JSON.parse(message.body);
            
            // Trigger custom listener callbacks
            eventListenersRef.current.forEach((cb) => cb(event));

            // Show real-time toast notification
            if (event.message) {
              addToast({
                id: Date.now() + Math.random(),
                type: event.eventType,
                message: event.message,
                user: event.triggeredBy,
              });
            }
          } catch (e) {
            console.error('Error handling websocket payload', e);
          }
        });
      },
      (error) => {
        console.warn('WebSocket connection failed, retrying...', error);
        setConnected(false);
      }
    );

    return () => {
      if (client && client.connected) {
        try { client.disconnect(); } catch (e) {}
      }
      setConnected(false);
    };
  }, [isAuthenticated]);

  const addToast = (toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const subscribeToTaskEvents = (callback) => {
    eventListenersRef.current.push(callback);
    return () => {
      eventListenersRef.current = eventListenersRef.current.filter((cb) => cb !== callback);
    };
  };

  return (
    <WebSocketContext.Provider value={{ connected, toasts, removeToast, subscribeToTaskEvents }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

import { renderHook, act } from '@testing-library/react';
import { useNotification } from './useNotification';

describe('useNotification Hook', () => {
  const originalNotification = window.Notification;

  beforeAll(() => {
    // Mock de la API de Notificaciones
    const mockNotification = jest.fn();
    Object.defineProperty(mockNotification, 'permission', {
      writable: true,
      value: 'default',
    });
    (mockNotification as any).requestPermission = jest.fn().mockResolvedValue('granted');
    
    window.Notification = mockNotification as any;
  });

  afterAll(() => {
    window.Notification = originalNotification;
  });

  beforeEach(() => {
    (window.Notification as any).permission = 'default';
    (window.Notification.requestPermission as jest.Mock).mockClear();
    (window.Notification as unknown as jest.Mock).mockClear();
  });

  test('requests permission on mount if permission is default', () => {
    renderHook(() => useNotification());
    expect(window.Notification.requestPermission).toHaveBeenCalledTimes(1);
  });

  test('does not request permission on mount if already granted', () => {
    (window.Notification as any).permission = 'granted';
    renderHook(() => useNotification());
    expect(window.Notification.requestPermission).not.toHaveBeenCalled();
  });

  test('sendNotification creates a new Notification if permission is granted', () => {
    (window.Notification as any).permission = 'granted';
    const { result } = renderHook(() => useNotification());
    
    result.current.sendNotification('Test Alert', { body: 'Test Body' });
    
    expect(window.Notification).toHaveBeenCalledWith('Test Alert', { body: 'Test Body' });
  });

  test('sendNotification requests permission and then sends if permission was default', async () => {
    (window.Notification as any).permission = 'default';
    
    const { result } = renderHook(() => useNotification());
    // Limpiar la llamada del useEffect
    (window.Notification.requestPermission as jest.Mock).mockClear();

    await act(async () => {
      result.current.sendNotification('Test Alert');
    });

    expect(window.Notification.requestPermission).toHaveBeenCalled();
    expect(window.Notification).toHaveBeenCalledWith('Test Alert', undefined);
  });
});
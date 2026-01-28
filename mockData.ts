export interface EventData {
  id: number;
  location: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  lat: number;
  lng: number;
  date: string;
}

export const MOCK_EVENTS: EventData[] = [
  { id: 1, location: 'Sector Riberas V', type: 'critical', title: 'Alerta Analítica', description: 'Alarma activada en sensor 04. Brigada en camino.', lat: 31.65, lng: -106.40, date: '2023-10-25' },
  { id: 2, location: 'Sector Riberas III', type: 'warning', title: 'Evento Reportado', description: 'Reporte de columna de humo visible. Verificando.', lat: 31.66, lng: -106.38, date: '2023-10-25' },
  { id: 3, location: 'Sector Riberas II', type: 'info', title: 'Evento Controlado', description: 'Conato de incendio controlado por residentes.', lat: 31.67, lng: -106.39, date: '2023-10-24' },
  { id: 4, location: 'Sector Riberas I', type: 'critical', title: 'Alerta Analítica', description: 'Temperatura anómala detectada en zona industrial.', lat: 31.64, lng: -106.39, date: '2023-10-24' },
  { id: 5, location: 'Sector Valle del Sol', type: 'warning', title: 'Evento Reportado', description: 'Posible quema de basura reportada por vecinos.', lat: 31.72, lng: -106.41, date: '2023-10-23' },
  { id: 6, location: 'Sector Sendero', type: 'info', title: 'Evento Controlado', description: 'Falsa alarma verificada por unidad 02.', lat: 31.70, lng: -106.45, date: '2023-10-23' },
  { id: 7, location: 'Sector Anapra', type: 'warning', title: 'Evento Reportado', description: 'Aumento de temperatura en sensores perimetrales.', lat: 31.78, lng: -106.52, date: '2023-10-22' },
  { id: 8, location: 'Sector Centro', type: 'critical', title: 'Alerta Analítica', description: 'Fuego detectado en edificio abandonado.', lat: 31.74, lng: -106.48, date: '2023-10-22' },
  { id: 9, location: 'Sector Aeropuerto', type: 'info', title: 'Mantenimiento', description: 'Pruebas rutinarias de sensores de humo.', lat: 31.63, lng: -106.43, date: '2023-10-21' },
  { id: 10, location: 'Sector Riberas IV', type: 'warning', title: 'Evento Reportado', description: 'Humo negro reportado cerca del canal.', lat: 31.655, lng: -106.395, date: '2023-10-21' },
  { id: 11, location: 'Sector Sur', type: 'info', title: 'Evento Controlado', description: 'Quema controlada supervisada por bomberos.', lat: 31.60, lng: -106.40, date: '2023-10-20' },
  { id: 12, location: 'Sector Norte', type: 'critical', title: 'Alerta Analítica', description: 'Sensores térmicos indican fuego activo en pastizal.', lat: 31.75, lng: -106.44, date: '2023-10-20' },
  { id: 13, location: 'Sector Tecnológico', type: 'warning', title: 'Evento Reportado', description: 'Olor a quemado reportado en zona residencial.', lat: 31.68, lng: -106.43, date: '2023-10-19' },
  { id: 14, location: 'Sector Satélite', type: 'info', title: 'Evento Controlado', description: 'Incendio de vehículo extinguido.', lat: 31.69, lng: -106.35, date: '2023-10-19' },
  { id: 15, location: 'Sector Riberas VI', type: 'critical', title: 'Alerta Analítica', description: 'Múltiples alertas de sensores en zona de riesgo.', lat: 31.63, lng: -106.37, date: '2023-10-18' },
  { id: 16, location: 'Sector Centro II', type: 'warning', title: 'Evento Reportado', description: 'Obstrucción de vía pública reportada.', lat: 31.73, lng: -106.49, date: '2023-10-17' },
  { id: 17, location: 'Sector Valle', type: 'info', title: 'Mantenimiento', description: 'Limpieza y calibración de sensores.', lat: 31.71, lng: -106.42, date: '2023-10-17' },
  { id: 18, location: 'Sector Norte II', type: 'critical', title: 'Alerta Analítica', description: 'Fuego estructural confirmado.', lat: 31.76, lng: -106.45, date: '2023-10-16' },
  { id: 19, location: 'Sector Sur II', type: 'warning', title: 'Evento Reportado', description: 'Columna de humo blanco visible.', lat: 31.61, lng: -106.41, date: '2023-10-16' },
  { id: 20, location: 'Sector Oeste', type: 'info', title: 'Evento Controlado', description: 'Simulacro de evacuación.', lat: 31.70, lng: -106.50, date: '2023-10-15' }
];

export const WEEKLY_STATS = [
  { label: 'Lun', count: 2, fullLabel: 'Lunes' },
  { label: 'Mar', count: 4, fullLabel: 'Martes' },
  { label: 'Mié', count: 1, fullLabel: 'Miércoles' },
  { label: 'Jue', count: 5, fullLabel: 'Jueves' },
  { label: 'Vie', count: 3, fullLabel: 'Viernes' },
  { label: 'Sáb', count: 6, fullLabel: 'Sábado' },
  { label: 'Dom', count: 2, fullLabel: 'Domingo' },
];

export const MONTHLY_STATS = [
  { label: 'Ene', count: 12, fullLabel: 'Enero' },
  { label: 'Feb', count: 19, fullLabel: 'Febrero' },
  { label: 'Mar', count: 15, fullLabel: 'Marzo' },
  { label: 'Abr', count: 22, fullLabel: 'Abril' },
  { label: 'May', count: 28, fullLabel: 'Mayo' },
  { label: 'Jun', count: 24, fullLabel: 'Junio' },
];
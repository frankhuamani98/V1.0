import React, { useState } from 'react';
import {
  Search,
  FileText,
  Download,
  Filter,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  MoreVertical
} from 'lucide-react';

interface FacturaHistorial {
  id: string;
  numero: string;
  cliente: string;
  monto: number;
  fechaEmision: string;
  fechaPago: string;
  metodoPago: string;
  estado: 'pagada' | 'anulada';
}

const historialMock: FacturaHistorial[] = [
  {
    id: '1',
    numero: 'FAC-001',
    cliente: 'Empresa ABC',
    monto: 1500.00,
    fechaEmision: '2024-01-15',
    fechaPago: '2024-01-20',
    metodoPago: 'Transferencia',
    estado: 'pagada'
  },
  {
    id: '2',
    numero: 'FAC-002',
    cliente: 'Corporación XYZ',
    monto: 2300.00,
    fechaEmision: '2024-01-10',
    fechaPago: '2024-01-12',
    metodoPago: 'Tarjeta',
    estado: 'pagada'
  },
];

const HistorialFacturas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [facturas] = useState<FacturaHistorial[]>(historialMock);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showActions, setShowActions] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleActions = (id: string) => {
    setShowActions(showActions === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
          Historial de Facturas
        </h1>
        <p className="text-gray-600">
          Consulta el historial completo de facturas y sus estados
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar facturas..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                placeholder="Fecha inicio"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                placeholder="Fecha fin"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Filter size={20} />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              <button
                onClick={handleRefresh}
                className={`flex items-center gap-2 px-1 py-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg hover:from-blue-900 hover:to-blue-950 transition-all shadow-lg hover:shadow-xl ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              >
                <RefreshCw size={18} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {facturas.map((factura) => (
              <div key={factura.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-400 mr-2" />
                    <span className="font-medium">{factura.numero}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => toggleActions(factura.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {showActions === factura.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                          <Download size={16} />
                          Descargar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">{factura.cliente}</p>
                  <p className="text-lg font-semibold">${factura.monto.toFixed(2)}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div>
                      <p className="text-gray-500">Fecha Pago:</p>
                      <p>{factura.fechaPago}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Método:</p>
                      <p>{factura.metodoPago}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      factura.estado === 'pagada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-teal-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                      Nº Factura
                      <ArrowUpDown size={16} />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Emisión</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Pago</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método Pago</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facturas.map((factura) => (
                  <tr key={factura.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText size={20} className="text-gray-400 mr-2" />
                        {factura.numero}

                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{factura.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${factura.monto.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{factura.fechaEmision}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{factura.fechaPago}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{factura.metodoPago}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        factura.estado === 'pagada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-lg hover:bg-green-100 transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">2</span> de <span className="font-medium">2</span> resultados
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialFacturas;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ChevronDown, ChevronUp, Plus, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Checkbox } from "@/Components/ui/checkbox";
import { Toaster, toast } from "sonner";

const Administradores = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@example.com",
      phone: "123456789",
      status: "active",
    },
    {
      id: 2,
      first_name: "María",
      last_name: "Gómez",
      email: "maria.gomez@example.com",
      phone: "987654321",
      status: "inactive",
    },
    {
      id: 3,
      first_name: "Carlos",
      last_name: "López",
      email: "carlos.lopez@example.com",
      phone: "555555555",
      status: "pending",
    },
  ]);

  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dni: "",
    sexo: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleRemoveAdmin = (id: number) => {
    console.log(`Quitar rol de administrador al usuario con ID: ${id}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      dni: "",
      sexo: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      password_confirmation: "",
      terms: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      terms: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    closeModal();
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <Card className="border-0 sm:border">
        <CardHeader className="px-2 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Administradores</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Aquí puedes ver la lista de administradores.
              </CardDescription>
            </div>
            <Button onClick={openModal} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              <span className="text-sm sm:text-base">Agregar Administrador</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="hidden sm:table-header-group">
                <TableRow>
                  <TableHead className="px-2 py-3">Nombre</TableHead>
                  <TableHead className="px-2 py-3">Apellido</TableHead>
                  <TableHead className="px-2 py-3">Email</TableHead>
                  <TableHead className="px-2 py-3">Teléfono</TableHead>
                  <TableHead className="px-2 py-3">Estado</TableHead>
                  <TableHead className="px-2 py-3">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <React.Fragment key={admin.id}>
                    {/* Diseño de tabla en escritorio */}
                    <TableRow className="hidden sm:table-row">
                      <TableCell className="px-2 py-3">{admin.first_name}</TableCell>
                      <TableCell className="px-2 py-3">{admin.last_name}</TableCell>
                      <TableCell className="px-2 py-3">{admin.email}</TableCell>
                      <TableCell className="px-2 py-3">{admin.phone}</TableCell>
                      <TableCell className="px-2 py-3">
                        <Badge
                          variant={
                            admin.status === "active"
                              ? "default"
                              : admin.status === "inactive"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs sm:text-sm"
                        >
                          {admin.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="text-xs sm:text-sm"
                        >
                          Quitar Admin
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Diseño de tarjeta en móvil */}
                    <div className="sm:hidden bg-white rounded-lg shadow-sm p-3 mb-2 border">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {admin.first_name} {admin.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {admin.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <Badge
                            variant={
                              admin.status === "active"
                                ? "default"
                                : admin.status === "inactive"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {admin.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleRow(admin.id)}
                            aria-label="Ver detalles"
                          >
                            {expandedRows.includes(admin.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      {expandedRows.includes(admin.id) && (
                        <div className="mt-2 space-y-2 pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Teléfono:</span>
                            <span>{admin.phone}</span>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full mt-2 text-xs"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            Quitar Rol de Administrador
                          </Button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal para agregar administrador */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Agregar Administrador</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Campo: Usuario */}
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm sm:text-base">Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="usuario123"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: Nombres */}
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-sm sm:text-base">Nombres</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Juan"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: Apellidos */}
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-sm sm:text-base">Apellidos</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Pérez"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: DNI */}
            <div className="space-y-1">
              <Label htmlFor="dni" className="text-sm sm:text-base">DNI</Label>
              <div className="relative">
                <Input
                  id="dni"
                  name="dni"
                  type="text"
                  placeholder="12345678"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.dni}
                  onChange={handleInputChange}
                  maxLength={8}
                />
              </div>
            </div>

            {/* Campo: Sexo */}
            <div className="space-y-1">
              <Label htmlFor="sexo" className="text-sm sm:text-base">Sexo</Label>
              <select
                id="sexo"
                name="sexo"
                className="w-full pl-3 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                value={formData.sexo}
                onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
              >
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>

            {/* Campo: Correo electrónico */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm sm:text-base">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="juan.perez@ejemplo.com"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: Celular */}
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm sm:text-base">Celular</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="987654321"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: Dirección (opcional) */}
            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm sm:text-base">Dirección (opcional)</Label>
              <div className="relative">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Av. Ejemplo 123"
                  className="pl-10 text-sm sm:text-base"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm sm:text-base">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 text-sm sm:text-base"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Campo: Confirmar Contraseña */}
            <div className="space-y-1">
              <Label htmlFor="password_confirmation" className="text-sm sm:text-base">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 text-sm sm:text-base"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Campo: Términos y condiciones */}
            <div className="md:col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 border">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={handleCheckboxChange}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="terms" className="text-sm sm:text-base">Aceptar términos y condiciones</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Usted acepta nuestros Términos de Servicio y Política de Privacidad.
                </p>
              </div>
            </div>

            {/* Botón de envío */}
            <Button type="submit" className="md:col-span-2 w-full text-sm sm:text-base">
              Registrar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default Administradores;

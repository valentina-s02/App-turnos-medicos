import User from './users-model';
import Location from './location-model';
import Medico from './medicos-model';
import Paciente from './pacientes-model';
import EstadoTurno from './estado-turnos-model';
import Turno from './turnos-model';

// Asociación User-Location
User.belongsTo(Location, {
  foreignKey: 'location',
  as: 'ubicacion'
});

Location.hasMany(User, {
  foreignKey: 'location',
  as: 'usuarios'
});

// Asociación User-Medico (herencia)
User.hasOne(Medico, {
  foreignKey: 'user_id',
  as: 'medico'
});

Medico.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'usuario'
});

// Asociación User-Paciente (herencia)
User.hasOne(Paciente, {
  foreignKey: 'user_id',
  as: 'paciente'
});

Paciente.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'usuario'
});

// Asociación Turno-Paciente
Paciente.hasMany(Turno, {
  foreignKey: 'id_paciente',
  as: 'turnos'
});

Turno.belongsTo(Paciente, {
  foreignKey: 'id_paciente',
  as: 'paciente'
});

// Asociación Turno-Medico
Medico.hasMany(Turno, {
  foreignKey: 'id_medico',
  as: 'turnos'
});

Turno.belongsTo(Medico, {
  foreignKey: 'id_medico',
  as: 'medico'
});

// Asociación Turno-EstadoTurno
EstadoTurno.hasMany(Turno, {
  foreignKey: 'estado',
  as: 'turnos'
});

Turno.belongsTo(EstadoTurno, {
  foreignKey: 'estado',
  as: 'estadoTurno'
});

export { User, Location, Medico, Paciente, EstadoTurno, Turno };
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';

// Interfaz para los atributos de ubicación
export interface LocationAttributes {
  location_id: number;
  ciudad: string;
  provincia: string;
  pais: string;
}

// Interfaz para la creación de ubicación
export interface LocationCreationAttributes extends Optional<LocationAttributes, 'location_id'> {}

// Clase del modelo Location
class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
  public location_id!: number;
  public ciudad!: string;
  public provincia!: string;
  public pais!: string;
}

// Inicialización del modelo
Location.init({
  location_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  provincia: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  pais: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'location',
  sequelize,
  timestamps: false
});

export default Location;
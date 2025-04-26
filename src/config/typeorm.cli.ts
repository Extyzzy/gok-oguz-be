import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm.common';

export const connectionSource = new DataSource(dataSourceOptions);

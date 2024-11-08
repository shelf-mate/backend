import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P1000':
        throw new ServiceUnavailableException(
          'Authentication failed. Ensure that the database credentials are correct.'
        );
      case 'P1001':
        throw new ServiceUnavailableException(
          'Database server was unreachable. Ensure that the database server is running and accessible.'
        );
      case 'P1002':
        throw new ServiceUnavailableException(
          'Database connection timed out. Please check the database server and network connection.'
        );
      case 'P1003':
        throw new InternalServerErrorException(
          'Database does not exist. Please create the database or update the configuration.'
        );
      case 'P1008':
        throw new ServiceUnavailableException(
          'Operation was cancelled due to a timeout. Please check your database connection settings.'
        );
      case 'P1010':
        throw new ServiceUnavailableException(
          'Database access denied. Ensure the database user has the required permissions.'
        );
      case 'P1011':
        throw new ServiceUnavailableException(
          'Database initialization error. The database is either not available or misconfigured.'
        );
      case 'P1012':
        throw new ServiceUnavailableException(
          'Database file is not found. Ensure that the path to the database file is correct.'
        );
      case 'P1013':
        throw new InternalServerErrorException(
          'Prisma migration error. Ensure that the database schema is up-to-date with migrations.'
        );
      case 'P1014':
        throw new InternalServerErrorException(
          'Prisma failed to start. Please ensure the query engine binary is available and correct.'
        );
      case 'P2000':
        throw new BadRequestException(
          `Value is too long for field: ${error.meta?.target}`
        );
      case 'P2001':
        throw new NotFoundException(`Record not found for query`);
      case 'P2002':
        throw new BadRequestException(
          `Unique constraint failed on the field: ${error.meta?.target}`
        );
      case 'P2003':
        throw new ForbiddenException(
          `Foreign key constraint failed on the field: ${error.meta?.field_name}`
        );
      case 'P2004':
        throw new BadRequestException(
          `A constraint failed on the database: ${error.meta?.constraint}`
        );
      case 'P2005':
        throw new BadRequestException(
          `Invalid value for field type: ${error.meta?.field_name}`
        );
      case 'P2006':
        throw new BadRequestException(
          `Invalid data type for field: ${error.meta?.field_name}`
        );
      case 'P2007':
        throw new BadRequestException(`Data validation error`);
      case 'P2008':
        throw new InternalServerErrorException(`Failed to parse query`);
      case 'P2009':
        throw new InternalServerErrorException(`Failed to validate query`);
      case 'P2010':
        throw new BadRequestException(`Raw query execution error`);
      case 'P2011':
        throw new BadRequestException(
          `Null constraint violation on the field: ${error.meta?.constraint}`
        );
      case 'P2012':
        throw new BadRequestException(
          `Missing required value: ${error.meta?.field_name}`
        );
      case 'P2013':
        throw new BadRequestException(`Missing required argument in query`);
      case 'P2014':
        throw new BadRequestException(
          `Relation violation: ${error.meta?.relation_name} between ${error.meta?.model_a_name} and ${error.meta?.model_b_name}`
        );
      case 'P2015':
        throw new NotFoundException(`Related record not found`);
      case 'P2016':
        throw new InternalServerErrorException(`Query interpretation error`);
      case 'P2017':
        throw new InternalServerErrorException(`Records to delete not found`);
      case 'P2018':
        throw new InternalServerErrorException(`Required connection not found`);
      case 'P2019':
        throw new InternalServerErrorException(`Input error`);
      case 'P2020':
        throw new NotFoundException(`Value out of range for the field`);
      case 'P2021':
        throw new NotFoundException(`Table not found in database`);
      case 'P2022':
        throw new NotFoundException(`Column not found in database`);
      case 'P2023':
        throw new InternalServerErrorException(
          `Inconsistent database structure`
        );
      case 'P2024':
        throw new ServiceUnavailableException(
          `Timeout error during database operation`
        );
      case 'P2025':
        throw new NotFoundException(`Record not found`);
      case 'P2026':
        throw new InternalServerErrorException(
          `Invalid Prisma query engine binary`
        );
      case 'P2027':
        throw new InternalServerErrorException(
          `Operation failed due to database schema inconsistency`
        );
      case 'P2030':
        throw new InternalServerErrorException(`Cannot find a full-text index`);
      case 'P2031':
        throw new InternalServerErrorException(
          `Prisma failed to start. Please ensure the query engine binary is available`
        );
      default:
        throw new InternalServerErrorException('Database request error');
    }
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new ServiceUnavailableException('Failed to connect to the database');
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new InternalServerErrorException('Unexpected Prisma database error');
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException('Prisma validation error');
  } else {
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}

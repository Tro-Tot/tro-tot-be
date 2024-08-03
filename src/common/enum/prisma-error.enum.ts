//https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
export enum PrismaErrorEnum {
  //P2025:An operation failed because it depends on one or more records that were required but not found.
  //Explanation: When you try to update or delete a record that does not exist.
  RecordDoesNotExist = 'P2025',

  //P2002: A unique constraint was violated on a record.
  UniqueConstraintFailed = 'P2002',
}
